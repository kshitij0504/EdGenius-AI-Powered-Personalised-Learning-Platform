import os
from pathlib import Path
from dotenv import load_dotenv
import logging
import json
import re
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate

BASE_DIR = Path(__file__).resolve().parent
env_path = str(Path(BASE_DIR, '.env.dev'))
load_dotenv(env_path)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

def init_gemini(temperature=1):
    gemini = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        temperature=temperature,
        api_key=GOOGLE_API_KEY,
        model_kwargs={"response_mime_type": "application/json"} 
    )
    return gemini


class LessonGenerator:
    def __init__(self):
        try:
            self.model = init_gemini(temperature=0.7)
            logging.info("Successfully initialized Gemini model")
        except Exception as e:
            logging.error(f"Failed to initialize Gemini model: {str(e)}")
            raise

    def clean_json_response(self, response_text):
        """
        Clean the response from Gemini API by removing markdown code fences
        and extracting valid JSON.
        """
        try:
            # Remove markdown code fences if present
            cleaned = response_text.strip()
            
            # Pattern to match ```json ... ``` or ``` ... ```
            if cleaned.startswith("```"):
                # Remove opening fence
                cleaned = re.sub(r'^```(?:json)?\s*\n?', '', cleaned)
                # Remove closing fence
                cleaned = re.sub(r'\n?```\s*$', '', cleaned)
            
            # Try to parse as JSON
            parsed_json = json.loads(cleaned)
            return parsed_json
            
        except json.JSONDecodeError as e:
            logging.error(f"JSON parsing error: {str(e)}")
            logging.error(f"Response text (first 500 chars): {response_text[:500]}")
            raise ValueError(f"Invalid JSON response from AI model: {str(e)}")

    def generate_lessons(self, weak_areas, skill_level, user_id, topic):
        if not user_id or not weak_areas or not topic:
            logging.error("Missing required inputs: user_id, weak_areas, or topic")
            return {"error": "user_id, weak_areas, and topic are required"}
        
        if not isinstance(weak_areas, list):
            logging.error("Invalid input: weak_areas must be a list of strings")
            return {"error": "weak_areas must be a list of strings"}
        
        if skill_level not in ["Beginner", "Intermediate", "Advanced"]:
            logging.error(f"Invalid skill_level: {skill_level}")
            return {"error": "skill_level must be one of: Beginner, Intermediate, Advanced"}

        
        template = """

        CRITICAL INSTRUCTION: RETURN ONLY VALID JSON. DO NOT USE MARKDOWN, CODE FENCES, OR ANY EXTRA TEXT. THE RESPONSE MUST BE PARSEABLE JSON.

        You are an expert AI educational content creator specializing in personalized, in-depth learning materials. Your goal is to generate comprehensive, engaging, and highly effective lesson documentation for a given topic, tailored to the user's skill level and focusing on their identified weak areas. This documentation should mimic the style of high-quality educational resources like W3Schools, MDN Web Docs, or official tutorials—clear, step-by-step, with examples, explanations, interactive elements (described), and progressive depth.

        Key Principles for Generation:
        - **Personalization**: Adapt the content to the user's skill level ({skill_level}). For Beginners: Use simple language, basic analogies, and foundational explanations. For Intermediate: Build on basics with practical applications and common pitfalls. For Advanced: Dive into optimizations, edge cases, real-world integrations, and advanced concepts.
        - **Focus on Weak Areas**: Prioritize and deeply cover the provided weak areas ({weak_areas}). Structure the lessons to address these first or integrate them prominently throughout, ensuring the user gains mastery over them.
        - **Comprehensiveness**: Cover the topic ({topic}) from fundamentals to advanced aspects, ensuring "each and everything" is included. Make it exhaustive yet digestible—break into modules, lessons, subtopics.
        - **Engagement and Effectiveness**: Include real-world examples, code snippets (if applicable, e.g., for programming topics), analogies, quizzes (embedded as self-assessment), tips, best practices, common mistakes, and exercises. Use markdown for formatting to make it readable (e.g., headings, lists, code blocks).
        - **Depth and Quality**: Aim for "game-changing" content that transforms the user's understanding. Provide in-depth explanations, historical context if relevant, comparisons to similar concepts, and forward-looking insights (e.g., future trends). Ensure it's accurate, up-to-date, and pedagogically sound.
        - **Structure**: Follow a logical progression: Start with overview, build concepts layer by layer, reinforce with practice, and end with advanced applications and resources.
        - **User-Centric**: Consider the user_id ({user_id}) for tracking purposes (not for content personalization). Make content motivational, encouraging progress.
        - **Output Format**: Return ONLY valid JSON without any markdown code fences, extra text, or formatting. The JSON should be ready to parse directly.

        Input Details:
        - Topic: {topic}
        - Skill Level: {skill_level}
        - Weak Areas: {weak_areas}
        - User ID: {user_id}

        Generated Response Structure (MUST follow exactly):
        {{
            "doc_name": "Personalized Lesson Documentation for {topic}",
            "doc_desc": "A comprehensive, AI-generated tutorial and lesson plan tailored to the user's skill level, focusing on weak areas, covering all aspects of the topic in depth.",
            "doc_body": [
                {{
                    "section": "1. Introduction",
                    "content": [
                        {{
                            "subsection": "1.1 Overview",
                            "content": "<Provide a high-level overview of the topic, its importance, real-world applications, and how this documentation will help the user, tailored to skill level. Mention how weak areas will be addressed. Use markdown for formatting.>"
                        }},
                        {{
                            "subsection": "1.2 Learning Objectives",
                            "content": "<List 5-10 specific, measurable objectives in markdown, focusing on weak areas and progressing from basic to advanced.>"
                        }},
                        {{
                            "subsection": "1.3 Prerequisites",
                            "content": "<Outline any assumed knowledge based on skill level in markdown; suggest resources if gaps exist.>"
                        }},
                        {{
                            "subsection": "1.4 How to Use This Documentation",
                            "content": "<Guide on navigating the lessons, completing exercises, and tracking progress in markdown.>"
                        }}
                    ]
                }},
                {{
                    "section": "2. Core Concepts",
                    "content": [
                        {{
                            "subsection": "2.1 [Core Subtopic 1]",
                            "content": "<In-depth explanation, examples, analogies in markdown. If it's a weak area, expand significantly with step-by-step breakdowns. Include code/examples if relevant.>"
                        }},
                        {{
                            "subsection": "2.X [Core Subtopic X]",
                            "content": "<Similar structure; ensure weak areas are integrated or have dedicated subsections. Use markdown.>"
                        }}
                    ]
                }},
                {{
                    "section": "3. Addressing Weak Areas",
                    "content": [
                        {{
                            "subsection": "3.1 [Weak Area 1]",
                            "content": "<Deep dive in markdown: Explain misconceptions, provide targeted examples, exercises to reinforce. Use skill-level appropriate depth.>"
                        }},
                        {{
                            "subsection": "3.X [Weak Area X]",
                            "content": "<Similar; make this the 'game-changing' part with transformative insights in markdown.>"
                        }}
                    ]
                }},
                {{
                    "section": "4. Advanced Topics",
                    "content": [
                        {{
                            "subsection": "4.1 [Advanced Subtopic 1]",
                            "content": "<In-depth coverage, integrations, optimizations in markdown. Link back to core concepts and weak areas.>"
                        }}
                    ]
                }},
                {{
                    "section": "5. Practical Exercises and Projects",
                    "content": [
                        {{
                            "subsection": "5.1 Exercises",
                            "content": "<List 5-10 exercises in markdown, starting simple and increasing complexity, focused on weak areas. Include solutions or hints.>"
                        }},
                        {{
                            "subsection": "5.2 Mini-Projects",
                            "content": "<2-5 project ideas with step-by-step guides in markdown, applying the topic holistically.>"
                        }},
                        {{
                            "subsection": "5.3 Self-Assessment Quizzes",
                            "content": "<Embed 3-5 quizzes with questions, answers, and explanations in markdown, targeting weak areas.>"
                        }}
                    ]
                }},
                {{
                    "section": "6. Best Practices and Tips",
                    "content": [
                        {{
                            "subsection": "6.1 Common Pitfalls",
                            "content": "<Highlight mistakes, especially in weak areas, with prevention strategies in markdown.>"
                        }},
                        {{
                            "subsection": "6.2 Optimization Techniques",
                            "content": "<For performance, efficiency, etc., tailored to topic in markdown.>"
                        }},
                        {{
                            "subsection": "6.3 Resources for Further Learning",
                            "content": "<Curated list of books, websites, videos, communities in markdown. Include W3Schools-like links if relevant.>"
                        }}
                    ]
                }},
                {{
                    "section": "7. Conclusion",
                    "content": [
                        {{
                            "subsection": "7.1 Summary",
                            "content": "<Recap key learnings, emphasizing mastery over weak areas in markdown.>"
                        }},
                        {{
                            "subsection": "7.2 Next Steps",
                            "content": "<Suggestions for advanced study, related topics, or real-world application in markdown.>"
                        }},
                        {{
                            "subsection": "7.3 Feedback and Iteration",
                            "content": "<Encourage user to retake quizzes or request updates based on progress in markdown.>"
                        }}
                    ]
                }},
                {{
                    "section": "Appendix A: Glossary",
                    "content": "<Define key terms used throughout the documentation in markdown.>"
                }},
                {{
                    "section": "Appendix B: References",
                    "content": "<List all sources, inspirations, or external references in markdown.>"
                }}
            ]
        }}

        CRITICAL: Return ONLY the JSON object. Do NOT wrap it in markdown code fences (```json). Do NOT add any explanatory text before or after the JSON. The response must be valid, parseable JSON that starts with {{ and ends with }}.
        """

        prompt = PromptTemplate(template=template, input_variables=["weak_areas", "skill_level", "user_id", "topic"])

        formatted_prompt = prompt.format(
            weak_areas=weak_areas,
            skill_level=skill_level,
            user_id=user_id,
            topic=topic
        )

        try:
            response = self.model.invoke(formatted_prompt)
            logging.info(f"Gemini API response received for topic: {topic}, user_id: {user_id}")
            cleaned_response = self.clean_json_response(response.content)
            logging.info(f"Successfully parsed JSON response for user_id: {user_id}")
            
            # Clean and parse the response            
            # Return as properly formatted JSON
            return cleaned_response
            
        except ValueError as e:
            logging.error(f"Failed to parse response: {str(e)}")
            return {"error": f"Failed to parse AI response: {str(e)}"}
        except Exception as e:
            logging.error(f"Failed to generate lessons: {str(e)}")
            return {"error": f"Failed to generate lessons: {str(e)}"}
