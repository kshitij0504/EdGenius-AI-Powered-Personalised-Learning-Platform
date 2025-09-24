import json
from app.utils.gemini import model
from app.prompts.quiz_prompt import QUIZ_PROMPT_TEMPLATE

def generate_quiz(topic: str) -> list:
    prompt = QUIZ_PROMPT_TEMPLATE.format(topic=topic)
    response = model.generate_content(prompt)
    print(f"Generated response: {response.text}")

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        raise ValueError("Invalid JSON returned from Gemini. Ensure the model follows strict format.")
