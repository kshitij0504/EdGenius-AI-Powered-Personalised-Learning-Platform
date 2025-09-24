import json
import re
from app.utils.gemini import model
from app.prompts.quiz_analysis_prompt import QUIZ_ANALYSIS_PROMPT_TEMPLATE

def analyze_quiz(user_answers: list, quiz: list) -> dict:
    input_data = {
        "quiz": quiz,
        "user_answers": user_answers
    }

    full_prompt = QUIZ_ANALYSIS_PROMPT_TEMPLATE + "\n\nDATA:\n" + json.dumps(input_data)
    response = model.generate_content(full_prompt)
    raw_text = response.text.strip()
    print(f"Gemini Analysis Raw Response: {raw_text}")

    # ✅ 1. Remove Markdown fences like ```json ... ```
    cleaned = re.sub(r"^```json|^```|```$", "", raw_text, flags=re.MULTILINE).strip()

    # ✅ 2. Extract JSON object in case extra junk remains
    match = re.search(r"\{.*\}", cleaned, re.DOTALL)
    if not match:
        raise ValueError(f"No JSON object found in Gemini response.\nRaw: {raw_text}")

    json_str = match.group(0)

    try:
        parsed = json.loads(json_str)
        print(f"Parsed Analysis Result: {parsed}")
        return parsed
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON returned from Gemini: {e}\nRaw cleaned response: {cleaned}")