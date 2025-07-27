import json
from app.utils.gemini import model
from app.prompts.quiz_analysis_prompt import QUIZ_ANALYSIS_PROMPT_TEMPLATE

def analyze_quiz(user_answers: list, quiz: list) -> dict:
    input_data = {
        "quiz": quiz,
        "user_answers": user_answers
    }

    full_prompt = QUIZ_ANALYSIS_PROMPT_TEMPLATE + "\n\nDATA:\n" + json.dumps(input_data)
    response = model.generate_content(full_prompt)
    print(f"Gemini Analysis Response: {response.text}")

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        raise ValueError("❌ Invalid JSON returned from Gemini. Ensure the model follows strict format.")
