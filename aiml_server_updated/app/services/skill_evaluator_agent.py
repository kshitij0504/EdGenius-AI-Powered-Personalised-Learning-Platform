from app.services.quiz_generator import generate_quiz
from app.services.db_service import SessionLocal, Quiz

class SkillEvaluatorAgent:
    def __init__(self):
        self.db = SessionLocal()

    def create_diagnostic_quiz(self, user_id: int, topic: str, difficulty: str = "medium"):
        # Step 1: Generate quiz using Quiz Generator
        quiz_questions = generate_quiz(topic=topic, difficulty=difficulty)

        # Step 2: Save quiz in DB
        new_quiz = Quiz(
            user_id=user_id,
            topic=topic,
            difficulty=difficulty,
            questions=quiz_questions
        )
        self.db.add(new_quiz)
        self.db.commit()
        self.db.refresh(new_quiz)

        # Step 3: Return quiz
        return {
            "quiz_id": new_quiz.id,
            "topic": topic,
            "difficulty": difficulty,
            "questions": quiz_questions
        }
