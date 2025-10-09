from app.services.quiz_generator import generate_quiz
from app.services.quiz_analysis import analyze_quiz
from app.services.mentor_agent import mentor_agent
from app.services.content_curator import ContentCuratorAgent
from app.services.skill_evaluator_agent import SkillEvaluatorAgent  # Add this import
from app.services.evaluator_agent import EvaluatorAgent            # Add this import
from app.services.lesson_generator import LessonGenerator          # Add this import


class OrchestratorAgent:
    def __init__(self):
        # Initialize all the agents that are used in the route method
        self.content_curator = ContentCuratorAgent()
        self.skill_evaluator = SkillEvaluatorAgent()  # Initialize skill evaluator
        self.evaluator = EvaluatorAgent()             # Initialize evaluator
        self.lesson_generator = LessonGenerator()     # Initialize lesson generator


    def route(self, action: str, payload: dict):
        """
        Routes user action to the correct agent.
        :param action: "generate_quiz" | "analyze_quiz" | "mentor" | "take_skill_test" | 
                      "evaluate_quiz" | "generate_lessons" | "curate_content"
        :param payload: dict containing required data
        """
        if action == "generate_quiz":
            topic = payload.get("topic")
            if not topic:
                return {"error": "Topic required"}
            return generate_quiz(topic)

        elif action == "analyze_quiz":
            quiz = payload.get("quiz")
            user_answers = payload.get("user_answers")
            if not quiz or not user_answers:
                return {"error": "Quiz and user_answers required"}
            return analyze_quiz(user_answers=user_answers, quiz=quiz)

        elif action == "mentor":
            query = payload.get("query")
            if not query:
                return {"error": "Query required"}
            return mentor_agent(query)

        elif action == "take_skill_test":
            user_id = payload.get("user_id")
            topic = payload.get("topic")
            difficulty = payload.get("difficulty", "medium")
            if not user_id or not topic:
                return {"error": "user_id and topic required"}
            return self.skill_evaluator.create_diagnostic_quiz(user_id, topic, difficulty)

        elif action == "evaluate_quiz":
            user_id = payload.get("user_id")
            quiz = payload.get("quiz")
            user_answers = payload.get("user_answers")
            if not user_id or not quiz or not user_answers:
                return {"error": "user_id, quiz, and user_answers required"}
            return self.evaluator.evaluate(user_id, quiz, user_answers)

        elif action == "generate_lessons":
            user_id = payload.get("user_id")
            weak_areas = payload.get("weak_areas")
            skill_level = payload.get("skill_level", "Beginner")
            topic = payload.get("topic")
        
            if not user_id or not weak_areas:
                return {"error": "user_id and weak_areas required"}
            return self.lesson_generator.generate_lessons(
                weak_areas=weak_areas,
                skill_level=skill_level,
                user_id=user_id,
                topic=topic
            )

        elif action == "curate_content":
            topics = payload.get("topics")
            if not topics:
                return {"error": "topics required"}
            return self.content_curator.fetch_videos(topics)

        else:
            return {"error": f"Unknown action '{action}'"}
