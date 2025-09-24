from fastapi import FastAPI, Query, HTTPException, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
import sqlite3
import json
from datetime import datetime
import google.generativeai as genai
import os
from app.services.quiz_generator import generate_quiz
from app.services.quiz_analysis import analyze_quiz
from app.services.mentor_agent import mentor_agent
from app.services.orchestrator_agent import OrchestratorAgent

app = FastAPI()
orchestrator = OrchestratorAgent()

# Configure Gemini API
genai.configure(api_key=os.environ.get('GEMINI_API_KEY'))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Chatbot Models
class ChatMessage(BaseModel):
    user_id: str
    message: str
    context: Optional[Dict[str, Any]] = {}

class ContextUpdate(BaseModel):
    user_id: str
    context: Dict[str, Any]

class ChatResponse(BaseModel):
    success: bool
    response: str
    timestamp: str
    analysis: Optional[Dict[str, Any]] = None
    error: Optional[str] = None

# Chatbot Service Class
class EdgeniusChatbotService:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        self.init_database()
        
    def init_database(self):
        conn = sqlite3.connect('edgenius_chat.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS conversations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                message TEXT NOT NULL,
                response TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                context_data TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_contexts (
                user_id TEXT PRIMARY KEY,
                current_course TEXT,
                learning_level TEXT,
                learning_goals TEXT,
                recent_topics TEXT,
                preferences TEXT
            )
        ''')
        
        conn.commit()
        conn.close()

    def get_user_context(self, user_id: str):
        """Retrieve user's learning context"""
        conn = sqlite3.connect('edgenius_chat.db')
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM user_contexts WHERE user_id = ?', (user_id,))
        context = cursor.fetchone()
        
        conn.close()
        return context

    def update_user_context(self, user_id: str, context_data: Dict[str, Any]):
        """Update user's learning context"""
        conn = sqlite3.connect('edgenius_chat.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT OR REPLACE INTO user_contexts 
            (user_id, current_course, learning_level, learning_goals, recent_topics, preferences)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            user_id,
            context_data.get('current_course', ''),
            context_data.get('learning_level', ''),
            context_data.get('learning_goals', ''),
            context_data.get('recent_topics', ''),
            json.dumps(context_data.get('preferences', {}))
        ))
        
        conn.commit()
        conn.close()

    def save_conversation(self, user_id: str, message: str, response: str, context_data: Optional[Dict] = None):
        """Save conversation to database"""
        conn = sqlite3.connect('edgenius_chat.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO conversations (user_id, message, response, context_data)
            VALUES (?, ?, ?, ?)
        ''', (user_id, message, response, json.dumps(context_data) if context_data else None))
        
        conn.commit()
        conn.close()

    def get_conversation_history(self, user_id: str, limit: int = 5):
        """Get recent conversation history"""
        conn = sqlite3.connect('edgenius_chat.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT message, response FROM conversations 
            WHERE user_id = ? 
            ORDER BY timestamp DESC 
            LIMIT ?
        ''', (user_id, limit))
        
        history = cursor.fetchall()
        conn.close()
        
        return list(reversed(history))

    def analyze_intent(self, message: str):
        """Analyze user intent from message"""
        intents = {
            'question': ['what', 'how', 'why', 'when', 'where', 'which', '?'],
            'help': ['help', 'assist', 'support', 'guide'],
            'explanation': ['explain', 'clarify', 'elaborate', 'describe'],
            'problem_solving': ['solve', 'calculate', 'find', 'determine'],
            'progress': ['progress', 'status', 'achievement', 'completed'],
            'quiz': ['quiz', 'test', 'assessment', 'practice'],
            'feedback': ['feedback', 'review', 'evaluate', 'assessment']
        }
        
        message_lower = message.lower()
        detected_intents = []
        
        for intent, keywords in intents.items():
            if any(keyword in message_lower for keyword in keywords):
                detected_intents.append(intent)
        
        return detected_intents if detected_intents else ['general']

    def generate_system_prompt(self, user_context, conversation_history):
        """Generate dynamic system prompt based on user context"""
        
        base_prompt = """
        You are an intelligent AI tutor for Edgenius, a personalized learning platform. Your role is to:
        
        1. **Educational Support**: Answer questions about course content, provide explanations, and offer learning guidance
        2. **Doubt Resolution**: Help clarify concepts, solve problems, and provide step-by-step explanations
        3. **Learning Mentorship**: Motivate students, suggest study strategies, and track progress
        4. **Platform Assistance**: Guide users through platform features and functionality
        5. **Quiz Integration**: Help with quiz-related questions and learning reinforcement
        
        **Key Behaviors:**
        - Provide accurate, educational responses tailored to the user's level
        - Ask clarifying questions when needed
        - Encourage active learning and critical thinking
        - Offer multiple explanation approaches for complex topics
        - Maintain a supportive, patient, and encouraging tone
        - Reference relevant course materials when applicable
        - Suggest quizzes or practice when appropriate
        """
        
        if user_context:
            context_prompt = f"""
            **User Context:**
            - Current Course: {user_context[1] if user_context[1] else 'General'}
            - Learning Level: {user_context[2] if user_context[2] else 'Beginner'}
            - Learning Goals: {user_context[3] if user_context[3] else 'Not specified'}
            - Recent Topics: {user_context[4] if user_context[4] else 'None'}
            """
            base_prompt += context_prompt
        
        if conversation_history:
            history_prompt = "\n**Recent Conversation:**\n"
            for msg, resp in conversation_history[-3:]:
                history_prompt += f"Student: {msg}\nTutor: {resp}\n"
            base_prompt += history_prompt
        
        base_prompt += """
        
        **Response Guidelines:**
        - Keep responses concise but comprehensive
        - Use examples and analogies when helpful
        - Provide actionable next steps
        - Encourage questions and deeper exploration
        - Suggest relevant quizzes or practice exercises when appropriate
        """
        
        return base_prompt

    def process_message(self, user_id: str, message: str, user_context_data: Optional[Dict] = None):
        """Process user message and generate response"""
        try:
            # Get or update user context
            user_context = self.get_user_context(user_id)
            if user_context_data:
                self.update_user_context(user_id, user_context_data)
                user_context = self.get_user_context(user_id)
            
            # Get conversation history
            history = self.get_conversation_history(user_id)
            
            # Analyze intent
            intents = self.analyze_intent(message)
            
            # Generate system prompt
            system_prompt = self.generate_system_prompt(user_context, history)
            
            # Prepare conversation for Gemini
            conversation_text = f"{system_prompt}\n\nStudent Question: {message}\n\nTutor Response:"
            
            # Generate response using Gemini
            response = self.model.generate_content(conversation_text)
            bot_response = response.text
            
            # Save conversation
            analysis_data = {
                'intents': intents,
                'timestamp': datetime.now().isoformat()
            }
            self.save_conversation(user_id, message, bot_response, analysis_data)
            
            return {
                'success': True,
                'response': bot_response,
                'timestamp': datetime.now().isoformat(),
                'analysis': {
                    'intents': intents,
                    'user_level': user_context[2] if user_context and user_context[2] else 'beginner'
                }
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'response': 'I apologize, but I encountered an error. Please try again or contact support.',
                'timestamp': datetime.now().isoformat()
            }

# Initialize chatbot service
chatbot_service = EdgeniusChatbotService()

# Existing endpoints (unchanged)
@app.get("/generate-quiz")
def generate_quiz_endpoint(topic: str = Query(...)):
    return {
        "status": "success",
        "data": generate_quiz(topic)
    }

@app.post("/analyze-quiz")
def analyze_quiz_endpoint( 
    quiz: List[Dict[str, Any]] = Body(...),
    user_answers: List[Dict[str, Any]] = Body(...)
):
    try:
        result = analyze_quiz(user_answers=user_answers, quiz=quiz)
        return {
            "status": "success",
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class Question(BaseModel):
    query: str

@app.post("/mentor-agent")
def ask_mentor(q: Question):
    return {
        "status": "success", 
        "answer": mentor_agent(q.query)
    }

class OrchestratorRequest(BaseModel):
    action: str
    payload: Dict[str, Any]

@app.post("/orchestrate")
def orchestrate(req: OrchestratorRequest):
    try:
        print(f"Routing action: {req.action} with payload: {req.payload}")
        result = orchestrator.route(req.action, req.payload)
        print(result)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# New Chatbot Endpoints
@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(chat_message: ChatMessage):
    """Main chat endpoint for the AI tutor"""
    try:
        result = chatbot_service.process_message(
            chat_message.user_id, 
            chat_message.message, 
            chat_message.context
        )
        return ChatResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat/context")
def update_chat_context(context_update: ContextUpdate):
    """Update user learning context for personalized responses"""
    try:
        chatbot_service.update_user_context(context_update.user_id, context_update.context)
        return {"status": "success", "message": "Context updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/chat/history/{user_id}")
def get_chat_history(user_id: str, limit: int = Query(10, ge=1, le=50)):
    """Get conversation history for a user"""
    try:
        history = chatbot_service.get_conversation_history(user_id, limit)
        formatted_history = [
            {"message": msg, "response": resp, "type": "conversation"}
            for msg, resp in history
        ]
        return {
            "status": "success",
            "history": formatted_history
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/chat/history/{user_id}")
def clear_chat_history(user_id: str):
    """Clear conversation history for a user"""
    try:
        conn = sqlite3.connect('edgenius_chat.db')
        cursor = conn.cursor()
        cursor.execute('DELETE FROM conversations WHERE user_id = ?', (user_id,))
        conn.commit()
        conn.close()
        
        return {"status": "success", "message": "History cleared successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/chat/context/{user_id}")
def get_user_context_endpoint(user_id: str):
    """Get user's current learning context"""
    try:
        context = chatbot_service.get_user_context(user_id)
        if context:
            return {
                "status": "success",
                "context": {
                    "current_course": context[1],
                    "learning_level": context[2],
                    "learning_goals": context[3],
                    "recent_topics": context[4],
                    "preferences": json.loads(context[5]) if context[5] else {}
                }
            }
        else:
            return {
                "status": "success",
                "context": {
                    "current_course": "",
                    "learning_level": "beginner",
                    "learning_goals": "",
                    "recent_topics": "",
                    "preferences": {}
                }
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "chatbot": "active",
            "quiz_generator": "active",
            "mentor_agent": "active",
            "orchestrator": "active"
        }
    }

# Enhanced orchestrator integration for chatbot
@app.post("/orchestrate-chat")
def orchestrate_chat(req: OrchestratorRequest):
    """Enhanced orchestration that can handle chatbot actions"""
    try:
        print(f"Routing chat action: {req.action} with payload: {req.payload}")
        
        # Handle chatbot-specific actions through orchestrator
        if req.action == "chat_with_context":
            # Combine chatbot with other services
            chat_result = chatbot_service.process_message(
                req.payload.get("user_id"),
                req.payload.get("message"),
                req.payload.get("context")
            )
            
            # If the chat mentions quiz generation, trigger it
            if any(intent in ["quiz", "test", "practice"] for intent in chat_result.get("analysis", {}).get("intents", [])):
                topic = req.payload.get("context", {}).get("current_course", "general")
                quiz_data = generate_quiz(topic)
                chat_result["suggested_quiz"] = quiz_data
            
            return {"status": "success", "data": chat_result}
        
        # Default orchestrator behavior
        result = orchestrator.route(req.action, req.payload)
        print(result)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
