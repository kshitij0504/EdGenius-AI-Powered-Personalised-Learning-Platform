from app.services.quiz_analysis import analyze_quiz
from app.services.progress_analyst import ProgressAnalyst

class EvaluatorAgent:
    def __init__(self):
        self.progress_analyst = ProgressAnalyst()

    def evaluate(self, user_id: int, quiz: list, user_answers: list):
        """
        Evaluates answers, identifies weak areas,
        and updates user profile via Progress Analyst.
        """
        # Step 1 – Evaluate correctness
        result = analyze_quiz(user_answers=user_answers, quiz=quiz)

        # Step 2 – Extract weak areas (e.g., topics where score < threshold)
        weak_areas = []
        for q, ans in zip(quiz, user_answers):
            if ans["answer"] != q["correct_answer"]:
                weak_areas.append(q["topic"])

        # Step 3 – Call Progress Analyst
        profile_update = self.progress_analyst.update_user_progress(
            user_id=user_id,
            weak_areas=weak_areas,
            score=result.get("score", 0),
        )

        return {
            "evaluation": result,
            "weak_areas": weak_areas,
            "profile_update": profile_update
        }
