from fastapi import FastAPI, Query, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
from app.services.quiz_generator import generate_quiz
from app.services.quiz_analysis import analyze_quiz


app = FastAPI()

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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