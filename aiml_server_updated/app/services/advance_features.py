# advanced_features.py
import re
from textblob import TextBlob
import spacy
from datetime import datetime, timedelta

class AdvancedChatbotFeatures:
    def __init__(self):
        # Load spaCy model for NLP
        try:
            self.nlp = spacy.load("en_core_web_sm")
        except OSError:
            self.nlp = None
    
    def analyze_intent(self, message):
        """Analyze user intent from message"""
        intents = {
            'question': ['what', 'how', 'why', 'when', 'where', 'which', '?'],
            'help': ['help', 'assist', 'support', 'guide'],
            'explanation': ['explain', 'clarify', 'elaborate', 'describe'],
            'problem_solving': ['solve', 'calculate', 'find', 'determine'],
            'progress': ['progress', 'status', 'achievement', 'completed'],
            'feedback': ['feedback', 'review', 'evaluate', 'assessment']
        }
        
        message_lower = message.lower()
        detected_intents = []
        
        for intent, keywords in intents.items():
            if any(keyword in message_lower for keyword in keywords):
                detected_intents.append(intent)
        
        return detected_intents if detected_intents else ['general']
    
    def extract_entities(self, message):
        """Extract educational entities from message"""
        if not self.nlp:
            return {}
        
        doc = self.nlp(message)
        entities = {
            'topics': [],
            'subjects': [],
            'concepts': [],
            'numbers': []
        }
        
        # Educational keywords
        educational_terms = {
            'mathematics': ['math', 'algebra', 'calculus', 'geometry', 'statistics'],
            'science': ['physics', 'chemistry', 'biology', 'science'],
            'programming': ['python', 'javascript', 'coding', 'programming', 'algorithm'],
            'language': ['english', 'grammar', 'writing', 'literature']
        }
        
        message_lower = message.lower()
        
        for subject, terms in educational_terms.items():
            if any(term in message_lower for term in terms):
                entities['subjects'].append(subject)
        
        # Extract numbers and technical terms
        for token in doc:
            if token.like_num:
                entities['numbers'].append(token.text)
            elif token.pos_ in ['NOUN', 'PROPN'] and len(token.text) > 2:
                entities['concepts'].append(token.text)
        
        return entities
    
    def sentiment_analysis(self, message):
        """Analyze sentiment of user message"""
        blob = TextBlob(message)
        sentiment = blob.sentiment
        
        if sentiment.polarity > 0.1:
            return 'positive'
        elif sentiment.polarity < -0.1:
            return 'negative'
        else:
            return 'neutral'
    
    def generate_follow_up_questions(self, topic, user_level='beginner'):
        """Generate relevant follow-up questions"""
        follow_ups = {
            'beginner': [
                f"Would you like me to explain the basics of {topic}?",
                f"Do you need help with fundamental concepts related to {topic}?",
                f"Should we start with simple examples of {topic}?"
            ],
            'intermediate': [
                f"Would you like to explore more advanced aspects of {topic}?",
                f"Do you want to see practical applications of {topic}?",
                f"Should we discuss related concepts to {topic}?"
            ],
            'advanced': [
                f"Would you like to analyze complex scenarios involving {topic}?",
                f"Do you want to explore cutting-edge research in {topic}?",
                f"Should we discuss advanced problem-solving techniques for {topic}?"
            ]
        }
        
        return follow_ups.get(user_level, follow_ups['beginner'])

# Integration with main chatbot
def enhanced_process_message(self, user_id, message, user_context_data=None):
    """Enhanced message processing with advanced features"""
    features = AdvancedChatbotFeatures()
    
    # Analyze message
    intents = features.analyze_intent(message)
    entities = features.extract_entities(message)
    sentiment = features.sentiment_analysis(message)
    
    # Get user context
    user_context = self.get_user_context(user_id)
    user_level = user_context[2] if user_context and user_context[2] else 'beginner'
    
    # Enhanced system prompt
    enhanced_prompt = self.generate_system_prompt(user_context, self.get_conversation_history(user_id))
    
    # Add analysis context
    analysis_context = f"""
    **Message Analysis:**
    - Detected Intents: {', '.join(intents)}
    - Key Subjects: {', '.join(entities.get('subjects', []))}
    - User Sentiment: {sentiment}
    - User Level: {user_level}
    
    **Response Instructions:**
    - Tailor response to detected intents
    - Address identified subjects and concepts
    - Match user's emotional state
    - Provide level-appropriate explanations
    """
    
    full_prompt = enhanced_prompt + analysis_context + f"\n\nStudent Question: {message}\n\nTutor Response:"
    
    try:
        # Generate response
        response = self.model.generate_content(full_prompt)
        bot_response = response.text
        
        # Generate follow-up questions if appropriate
        if entities.get('subjects'):
            main_subject = entities['subjects'][0]
            follow_ups = features.generate_follow_up_questions(main_subject, user_level)
            if follow_ups and len(bot_response.split()) < 100:  # Add follow-ups for shorter responses
                bot_response += f"\n\n**Suggested next steps:**\n• {follow_ups[0]}"
        
        # Save enhanced conversation data
        enhanced_context = {
            'intents': intents,
            'entities': entities,
            'sentiment': sentiment,
            'user_level': user_level
        }
        
        self.save_conversation(user_id, message, bot_response, enhanced_context)
        
        return {
            'success': True,
            'response': bot_response,
            'analysis': {
                'intents': intents,
                'sentiment': sentiment,
                'entities': entities
            },
            'timestamp': datetime.now().isoformat()
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'response': 'I apologize, but I encountered an error. Please try again.'
        }
