from app.services.resource_generator import ResourceGenerator
import json
from typing import List, Dict, Any
import uuid
from datetime import datetime

class LessonGeneratorAgent:
    def __init__(self, db_client=None, vector_client=None, llm=None):
        self.db = db_client
        self.vector = vector_client
        self.llm = llm
        self.resource_generator = ResourceGenerator()

    def generate_lessons(self, weak_areas: List[str], skill_level: str, user_id: int, topic: str) -> Dict[str, Any]:
        lesson_modules = []
        
        for i, concept in enumerate(weak_areas, 1):
            lesson_content = self._generate_comprehensive_lesson(
                concept=concept,
                skill_level=skill_level,
                topic=topic,
                lesson_number=i,
                total_lessons=len(weak_areas),
                is_weak_area=True
            )
            lesson_modules.append(lesson_content)

        complementary_concepts = self._get_complementary_concepts(weak_areas, topic, skill_level)
        
        for j, concept in enumerate(complementary_concepts, len(weak_areas) + 1):
            lesson_content = self._generate_comprehensive_lesson(
                concept=concept,
                skill_level=skill_level,
                topic=topic,
                lesson_number=j,
                total_lessons=len(weak_areas) + len(complementary_concepts),
                is_weak_area=False
            )
            lesson_modules.append(lesson_content)

        resources = self.resource_generator.create_resources(lesson_modules, user_id)
        
        return {
            "user_id": user_id,
            "topic": topic,
            "skill_level": skill_level,
            "total_lessons": len(lesson_modules),
            "weak_areas_lessons": len(weak_areas),
            "complementary_lessons": len(complementary_concepts),
            "generated_at": self._get_timestamp(),
            "lesson_modules": lesson_modules,
            "resources": resources,
            "completion_tracking": {
                "lessons_completed": 0,
                "total_lessons": len(lesson_modules),
                "progress_percentage": 0,
                "weak_areas_completed": 0,
                "complementary_completed": 0
            },
            "learning_path": self._generate_learning_path(lesson_modules),
            "topic_overview": self._generate_topic_overview(topic, skill_level)
        }

    def _generate_comprehensive_lesson(self, concept: str, skill_level: str, topic: str, lesson_number: int, total_lessons: int, is_weak_area: bool = True) -> Dict[str, Any]:
        """
        Generates a single comprehensive lesson optimized for React frontend
        """
        # Fetch related content from vector database
        related_content = self._fetch_related_content(concept, topic)
        
        # Generate structured lesson content for React
        lesson_content = self._create_structured_lesson_content(
            concept=concept,
            skill_level=skill_level,
            topic=topic,
            related_content=related_content,
            lesson_number=lesson_number,
            is_weak_area=is_weak_area
        )
        
        return {
            "lesson_id": str(uuid.uuid4()),
            "lesson_number": lesson_number,
            "concept": concept,
            "topic": topic,
            "skill_level": skill_level,
            "is_weak_area": is_weak_area,
            "priority": "high" if is_weak_area else "medium",
            "estimated_duration": self._calculate_duration(skill_level, is_weak_area),
            "difficulty_score": self._calculate_difficulty(concept, skill_level),
            "content": lesson_content,
            "learning_objectives": self._extract_learning_objectives(concept, skill_level),
            "prerequisites": self._get_prerequisites(concept, topic),
            "next_steps": self._get_next_steps(concept, lesson_number, total_lessons),
            "tags": self._generate_lesson_tags(concept, topic, skill_level),
            "interactive_elements": self._generate_interactive_elements(concept, skill_level)
        }

    def _create_structured_lesson_content(self, concept: str, skill_level: str, topic: str, related_content: str, lesson_number: int, is_weak_area: bool) -> Dict[str, Any]:
        """
        Creates structured lesson content optimized for React components
        """
        return {
            "introduction": {
                "title": f"Understanding {concept}",
                "overview": f"Master {concept} in {topic} - a {'critical weak area' if is_weak_area else 'important concept'} for {skill_level} level learners.",
                "importance": self._explain_importance(concept, topic, is_weak_area),
                "real_world_applications": self._get_real_world_applications(concept, topic)
            },
            "theory": {
                "definition": self._generate_definition(concept, topic),
                "key_concepts": self._generate_key_concepts(concept, skill_level),
                "visual_aids": self._generate_visual_descriptions(concept),
                "terminology": self._generate_terminology(concept, topic)
            },
            "implementation": {
                "syntax": self._generate_syntax_guide(concept, topic, skill_level),
                "step_by_step": self._generate_step_by_step_guide(concept, skill_level),
                "code_patterns": self._generate_code_patterns(concept, topic, skill_level)
            },
            "examples": {
                "basic": self._generate_basic_examples(concept, topic, skill_level),
                "intermediate": self._generate_intermediate_examples(concept, topic, skill_level),
                "advanced": self._generate_advanced_examples(concept, topic, skill_level) if skill_level != "beginner" else []
            },
            "common_mistakes": {
                "errors": self._generate_common_errors(concept, skill_level),
                "debugging_tips": self._generate_debugging_tips(concept, topic),
                "best_practices": self._generate_best_practices(concept, topic)
            },
            "exercises": {
                "practice_problems": self._generate_practice_problems(concept, skill_level),
                "mini_projects": self._generate_mini_projects(concept, topic, skill_level),
                "challenges": self._generate_challenges(concept, skill_level)
            },
            "summary": {
                "key_takeaways": self._generate_key_takeaways(concept, topic),
                "quick_reference": self._generate_quick_reference(concept, topic),
                "further_reading": self._generate_further_reading(concept, topic)
            }
        }

    def _get_complementary_concepts(self, weak_areas: List[str], topic: str, skill_level: str) -> List[str]:
        """
        Suggests complementary concepts to provide comprehensive topic coverage
        """
        concept_map = {
            "Python": {
                "beginner": ["Basic Syntax", "Print Statements", "Comments", "Indentation"],
                "intermediate": ["File Handling", "Exception Handling", "Modules", "Packages"],
                "advanced": ["Decorators", "Context Managers", "Metaclasses", "Async Programming"]
            },
            "JavaScript": {
                "beginner": ["Basic Syntax", "DOM Manipulation", "Event Handling", "Basic Functions"],
                "intermediate": ["Promises", "Async/Await", "ES6 Features", "Error Handling"],
                "advanced": ["Closures", "Prototypes", "Design Patterns", "Performance Optimization"]
            },
            "Data Structures": {
                "beginner": ["Arrays", "Strings", "Basic Sorting", "Linear Search"],
                "intermediate": ["Trees", "Graphs", "Hash Tables", "Dynamic Programming"],
                "advanced": ["Advanced Trees", "Graph Algorithms", "Complex Data Structures", "Algorithm Optimization"]
            },
            "Web Development": {
                "beginner": ["HTML Structure", "CSS Basics", "Responsive Design", "Basic JavaScript"],
                "intermediate": ["API Integration", "State Management", "Component Architecture", "Testing"],
                "advanced": ["Performance Optimization", "Security", "PWA", "Advanced Patterns"]
            }
        }
        
        # Get complementary concepts not already in weak areas
        all_concepts = concept_map.get(topic, {}).get(skill_level, [])
        complementary = [concept for concept in all_concepts if concept not in weak_areas]
        
        # Limit to 2-3 complementary concepts to avoid overwhelming
        return complementary[:3]

    def _explain_importance(self, concept: str, topic: str, is_weak_area: bool) -> str:
        """
        Explains why this concept is important
        """
        importance_prefix = "This is a critical concept you need to master" if is_weak_area else "This concept complements your learning"
        return f"{importance_prefix} because {concept} is fundamental to understanding {topic} and will help you build stronger programming skills."

    def _generate_definition(self, concept: str, topic: str) -> str:
        """
        Generates a clear, concise definition
        """
        return f"{concept} in {topic} refers to [detailed definition would be generated here based on the specific concept and topic]."

    def _generate_key_concepts(self, concept: str, skill_level: str) -> List[Dict[str, str]]:
        """
        Generates key concepts as structured data for React components
        """
        return [
            {
                "title": "Core Principle",
                "description": f"The fundamental principle behind {concept}",
                "importance": "Essential for understanding"
            },
            {
                "title": "Implementation Details",
                "description": f"How {concept} works in practice",
                "importance": "Critical for application"
            },
            {
                "title": "Use Cases",
                "description": f"When and where to use {concept}",
                "importance": "Practical application"
            }
        ]

    def _generate_visual_descriptions(self, concept: str) -> List[Dict[str, str]]:
        """
        Generates descriptions for visual aids (for React components to render)
        """
        return [
            {
                "type": "diagram",
                "title": f"{concept} Flow Diagram",
                "description": f"Visual representation of how {concept} works step by step"
            },
            {
                "type": "comparison",
                "title": f"{concept} vs Alternatives",
                "description": f"Compare {concept} with similar concepts or approaches"
            }
        ]

    def _generate_terminology(self, concept: str, topic: str) -> List[Dict[str, str]]:
        """
        Generates terminology as structured data
        """
        return [
            {
                "term": f"{concept} Term 1",
                "definition": "Definition of the first key term",
                "example": "Usage example"
            },
            {
                "term": f"{concept} Term 2",
                "definition": "Definition of the second key term",
                "example": "Usage example"
            }
        ]

    def _generate_syntax_guide(self, concept: str, topic: str, skill_level: str) -> Dict[str, Any]:
        """
        Generates syntax guide as structured data
        """
        return {
            "basic_syntax": {
                "code": f"// Basic {concept} syntax example",
                "explanation": f"This is the basic way to implement {concept}",
                "parameters": ["param1: description", "param2: description"]
            },
            "advanced_syntax": {
                "code": f"// Advanced {concept} usage",
                "explanation": f"More complex implementation of {concept}",
                "parameters": ["advanced_param1: description"]
            } if skill_level != "beginner" else None
        }

    def _generate_step_by_step_guide(self, concept: str, skill_level: str) -> List[Dict[str, str]]:
        """
        Generates step-by-step implementation guide
        """
        return [
            {
                "step": 1,
                "title": f"Initialize {concept}",
                "description": f"First step in implementing {concept}",
                "code": f"// Step 1 code example",
                "tips": "Pro tip for this step"
            },
            {
                "step": 2,
                "title": f"Configure {concept}",
                "description": f"Configure the {concept} for your use case",
                "code": f"// Step 2 code example",
                "tips": "Important configuration details"
            },
            {
                "step": 3,
                "title": f"Execute {concept}",
                "description": f"Run the {concept} implementation",
                "code": f"// Step 3 code example",
                "tips": "Common execution patterns"
            }
        ]

    def _generate_code_patterns(self, concept: str, topic: str, skill_level: str) -> List[Dict[str, Any]]:
        """
        Generates common code patterns
        """
        return [
            {
                "pattern_name": f"Basic {concept} Pattern",
                "description": f"The most common way to use {concept}",
                "code": f"// Basic pattern code",
                "use_case": "When to use this pattern",
                "pros": ["Advantage 1", "Advantage 2"],
                "cons": ["Limitation 1"] if skill_level != "beginner" else []
            }
        ]

    def _generate_basic_examples(self, concept: str, topic: str, skill_level: str) -> List[Dict[str, Any]]:
        """
        Generates basic examples as structured data
        """
        return [
            {
                "title": f"Simple {concept} Example",
                "description": f"A basic implementation of {concept}",
                "code": f"// Simple {concept} example\nconsole.log('Learning {concept}');",
                "output": f"Expected output from the {concept} example",
                "explanation": f"This example demonstrates the basic usage of {concept}"
            }
        ]

    def _generate_intermediate_examples(self, concept: str, topic: str, skill_level: str) -> List[Dict[str, Any]]:
        """
        Generates intermediate examples
        """
        if skill_level == "beginner":
            return []
        
        return [
            {
                "title": f"Practical {concept} Example",
                "description": f"A real-world application of {concept}",
                "code": f"// Intermediate {concept} example",
                "output": f"Expected output",
                "explanation": f"This example shows {concept} in a practical scenario"
            }
        ]

    def _generate_advanced_examples(self, concept: str, topic: str, skill_level: str) -> List[Dict[str, Any]]:
        """
        Generates advanced examples
        """
        return [
            {
                "title": f"Advanced {concept} Implementation",
                "description": f"A complex, production-ready example of {concept}",
                "code": f"// Advanced {concept} example",
                "output": f"Expected output",
                "explanation": f"This example demonstrates advanced {concept} techniques"
            }
        ]

    def _generate_common_errors(self, concept: str, skill_level: str) -> List[Dict[str, str]]:
        return [
            {
                "error": f"Common {concept} Error 1",
                "description": "Description of what causes this error",
                "solution": "How to fix this error",
                "prevention": "How to prevent this error in the future"
            }
        ]

    def _generate_debugging_tips(self, concept: str, topic: str) -> List[str]:
        return [
            f"Use console.log() to debug {concept} issues",
            f"Check the {topic} documentation for {concept}",
            f"Use debugging tools specific to {concept}"
        ]

    def _generate_best_practices(self, concept: str, topic: str) -> List[Dict[str, str]]:
        return [
            {
                "practice": f"Always validate inputs when using {concept}",
                "reason": "Prevents runtime errors and improves code reliability",
                "example": f"// Example of input validation for {concept}"
            }
        ]

    def _generate_practice_problems(self, concept: str, skill_level: str) -> List[Dict[str, Any]]:
        return [
            {
                "problem_id": str(uuid.uuid4()),
                "title": f"Basic {concept} Challenge",
                "difficulty": "easy" if skill_level == "beginner" else "medium",
                "description": f"Create a simple implementation of {concept}",
                "starter_code": f"// Write your {concept} implementation here",
                "solution": f"// Solution for {concept} challenge",
                "hints": [f"Remember to {concept} properly", "Don't forget error handling"],
                "test_cases": [
                    {"input": "example input", "expected_output": "example output"}
                ]
            }
        ]

    def _generate_mini_projects(self, concept: str, topic: str, skill_level: str) -> List[Dict[str, Any]]:
        """
        Generates mini projects
        """
        return [
            {
                "project_id": str(uuid.uuid4()),
                "title": f"{concept} Mini Project",
                "description": f"Build a small application using {concept}",
                "requirements": [f"Use {concept} effectively", "Include error handling"],
                "estimated_time": "30-45 minutes",
                "technologies": [topic],
                "learning_goals": [f"Master {concept} implementation", "Apply best practices"]
            }
        ]

    def _generate_challenges(self, concept: str, skill_level: str) -> List[Dict[str, Any]]:
        """
        Generates coding challenges
        """
        return [
            {
                "challenge_id": str(uuid.uuid4()),
                "title": f"Advanced {concept} Challenge",
                "difficulty": "hard" if skill_level == "advanced" else "medium",
                "description": f"Solve this complex problem using {concept}",
                "points": 100,
                "time_limit": "60 minutes"
            }
        ]

    def _generate_key_takeaways(self, concept: str, topic: str) -> List[str]:
        """
        Generates key takeaways
        """
        return [
            f"{concept} is essential for {topic} development",
            f"Understanding {concept} improves code quality",
            f"Practice {concept} regularly to master it"
        ]

    def _generate_quick_reference(self, concept: str, topic: str) -> Dict[str, str]:
        """
        Generates quick reference guide
        """
        return {
            "syntax": f"Basic {concept} syntax",
            "common_methods": f"Frequently used {concept} methods",
            "gotchas": f"Things to watch out for with {concept}"
        }

    def _generate_further_reading(self, concept: str, topic: str) -> List[Dict[str, str]]:
        return [
            {
                "title": f"Advanced {concept} Techniques",
                "type": "article",
                "description": f"Deep dive into {concept} advanced features"
            },
            {
                "title": f"{concept} in Production",
                "type": "case study",
                "description": f"How companies use {concept} in real applications"
            }
        ]

    def _generate_lesson_tags(self, concept: str, topic: str, skill_level: str) -> List[str]:
        return [topic.lower(), concept.lower().replace(" ", "-"), skill_level, "interactive"]

    def _generate_interactive_elements(self, concept: str, skill_level: str) -> Dict[str, Any]:
        return {
            "code_playground": {
                "available": True,
                "language": "javascript",  # or based on topic
                "starter_code": f"// Try {concept} here"
            },
            "quiz": {
                "questions_count": 5,
                "difficulty": skill_level,
                "topics": [concept]
            },
            "live_examples": {
                "count": 3,
                "interactive": True
            }
        }

    def _generate_learning_path(self, lesson_modules: List[Dict]) -> Dict[str, Any]:
        """
        Generates a structured learning path
        """
        return {
            "recommended_order": [lesson["lesson_id"] for lesson in lesson_modules],
            "estimated_total_time": f"{len(lesson_modules) * 45} minutes",
            "milestones": [
                {
                    "lesson_numbers": list(range(1, len([l for l in lesson_modules if l["is_weak_area"]]) + 1)),
                    "title": "Master Your Weak Areas",
                    "description": "Focus on concepts you need to strengthen"
                },
                {
                    "lesson_numbers": list(range(len([l for l in lesson_modules if l["is_weak_area"]]) + 1, len(lesson_modules) + 1)),
                    "title": "Expand Your Knowledge",
                    "description": "Learn complementary concepts for comprehensive understanding"
                }
            ]
        }

    def _generate_topic_overview(self, topic: str, skill_level: str) -> Dict[str, Any]:
        return {
            "title": f"{topic} Learning Journey",
            "description": f"Comprehensive {skill_level}-level course in {topic}",
            "key_areas": [
                "Fundamental concepts",
                "Practical implementation",
                "Best practices",
                "Real-world applications"
            ],
            "learning_outcomes": [
                f"Master core {topic} concepts",
                f"Apply {topic} in practical projects",
                f"Follow {topic} best practices",
                f"Solve real-world problems with {topic}"
            ]
        }

    def _calculate_duration(self, skill_level: str, is_weak_area: bool = False) -> str:
        base_duration_map = {
            "beginner": 60,
            "intermediate": 45, 
            "advanced": 30
        }
        
        base_duration = base_duration_map.get(skill_level, 45)

        if is_weak_area:
            base_duration += 15
        
        return f"{base_duration} minutes"

    def _fetch_related_content(self, concept: str, topic: str) -> str:
        if self.vector:
            query_embedding = f"{concept} {topic} tutorial explanation examples"
            return f"Related content for {concept} in {topic} context retrieved from knowledge base."
        elif self.db:
            return f"Database content related to {concept} in {topic}"
        else:
            return f"Comprehensive educational content covering {concept} fundamentals, applications, and best practices in {topic}."

    def _extract_lesson_structure(self, html_content: str) -> Dict[str, List[str]]:
        return {
            "sections": ["Introduction", "Theory", "Implementation", "Examples", "Exercises", "Summary"],
            "subsections": [],
            "interactive_elements": 5,
            "code_examples": 3,
            "exercises": 4
        }

    def _extract_learning_objectives(self, concept: str, skill_level: str) -> List[str]:
        base_objectives = [
            f"Understand the fundamental principles of {concept}",
            f"Apply {concept} in practical scenarios",
            f"Identify common use cases and applications",
            f"Implement best practices and avoid pitfalls"
        ]
        
        if skill_level == "advanced":
            base_objectives.extend([
                f"Optimize {concept} implementations for performance",
                f"Integrate {concept} with complex systems"
            ])
        
        return base_objectives

    def _get_prerequisites(self, concept: str, topic: str) -> List[str]:
        return [
            f"Basic understanding of {topic}",
            "Programming fundamentals",
            "Development environment setup"
        ]

    def _get_next_steps(self, concept: str, lesson_number: int, total_lessons: int) -> List[str]:
        next_steps = [
            "Complete the practice exercises",
            "Try the mini project",
            "Apply the concept in your own code"
        ]
        
        if lesson_number < total_lessons:
            next_steps.append("Continue to the next lesson")
        else:
            next_steps.append("Explore advanced topics and build larger projects")
            
        return next_steps

    def _calculate_difficulty(self, concept: str, skill_level: str) -> int:
        base_difficulty = 5
        
        if skill_level == "beginner":
            return max(1, base_difficulty - 2)
        elif skill_level == "advanced":
            return min(10, base_difficulty + 2)
        
        return base_difficulty

    def _get_timestamp(self) -> str:
        return datetime.now().isoformat()

    def update_progress(self, user_id: int, lesson_id: str, completed: bool) -> Dict[str, Any]:
        return {
            "user_id": user_id,
            "lesson_id": lesson_id,
            "completed": completed,
            "completed_at": self._get_timestamp() if completed else None
        }

    def get_lesson_analytics(self, user_id: int) -> Dict[str, Any]:
        return {
            "total_lessons_generated": 0,
            "lessons_completed": 0,
            "average_completion_time": "0 minutes",
            "weak_areas_improvement": {},
            "recommended_next_topics": []
        }
    def _get_real_world_applications(self, concept: str, topic: str) -> List[Dict[str, str]]:
        applications_map = {
            "Python": {
                "Variables and Data Types": [
                    {"application": "Data Analysis", "description": "Store and manipulate datasets"},
                    {"application": "Web Development", "description": "Handle user input and API responses"},
                    {"application": "Machine Learning", "description": "Store features and model parameters"}
                ],
                "Functions": [
                    {"application": "API Development", "description": "Create reusable endpoints"},
                    {"application": "Data Processing", "description": "Transform and clean data"},
                    {"application": "Automation Scripts", "description": "Automate repetitive tasks"}
                ],
                "Control Flow": [
                    {"application": "Game Development", "description": "Control game logic and player actions"},
                    {"application": "Business Logic", "description": "Implement conditional business rules"},
                    {"application": "Data Validation", "description": "Validate user input and data integrity"}
                ]
            },
            "JavaScript": {
                "DOM Manipulation": [
                    {"application": "Interactive Websites", "description": "Create dynamic user interfaces"},
                    {"application": "Form Validation", "description": "Validate user input in real-time"},
                    {"application": "Single Page Applications", "description": "Update content without page refresh"}
                ],
                "Async Programming": [
                    {"application": "API Integration", "description": "Fetch data from external services"},
                    {"application": "Real-time Applications", "description": "Handle live data updates"},
                    {"application": "File Processing", "description": "Handle large file uploads"}
                ]
            },
            "Data Structures": {
                "Arrays": [
                    {"application": "Image Processing", "description": "Store pixel data for manipulation"},
                    {"application": "Database Records", "description": "Store collections of data records"},
                    {"application": "Algorithm Implementation", "description": "Implement sorting and searching"}
                ],
                "Linked Lists": [
                    {"application": "Browser History", "description": "Navigate back and forward through pages"},
                    {"application": "Music Playlists", "description": "Queue and manage song sequences"},
                    {"application": "Undo Functionality", "description": "Track and reverse user actions"}
                ]
            }
        }
    
        topic_apps = applications_map.get(topic, {})
        concept_apps = topic_apps.get(concept, [
            {"application": "Software Development", "description": f"Use {concept} in building applications"},
            {"application": "Problem Solving", "description": f"Apply {concept} to solve complex problems"},
            {"application": "System Design", "description": f"Incorporate {concept} in system architecture"}
        ])
        
        return concept_apps

def _generate_definition(self, concept: str, topic: str) -> str:
    definitions = {
        "Variables and Data Types": f"Variables are named containers that store data values, while data types define what kind of data can be stored and how it behaves in {topic}.",
        "Functions": f"Functions are reusable blocks of code that perform specific tasks and can accept inputs (parameters) and return outputs in {topic}.",
        "Control Flow": f"Control flow statements determine the order in which code executes, allowing programs to make decisions and repeat actions in {topic}.",
        "Arrays": f"Arrays are ordered collections of elements that can be accessed by their position (index) in {topic}.",
        "Loops": f"Loops are programming constructs that repeat a block of code multiple times until a specific condition is met in {topic}.",
        "DOM Manipulation": f"DOM Manipulation refers to the process of dynamically changing the structure, style, or content of web pages using {topic}.",
        "Async Programming": f"Asynchronous programming allows code to run without blocking other operations, enabling better performance in {topic} applications."
    }
    
    return definitions.get(concept, f"{concept} is a fundamental concept in {topic} that enables developers to build more effective and efficient applications.")

def _generate_key_concepts(self, concept: str, skill_level: str) -> List[Dict[str, str]]:
    key_concepts_map = {
        "Variables and Data Types": [
            {"title": "Variable Declaration", "description": "How to create and name variables properly", "importance": "Essential for storing data"},
            {"title": "Data Type Classification", "description": "Understanding different types like strings, numbers, booleans", "importance": "Critical for data manipulation"},
            {"title": "Type Conversion", "description": "Converting between different data types", "importance": "Important for data processing"}
        ],
        "Functions": [
            {"title": "Function Definition", "description": "Creating reusable blocks of code", "importance": "Essential for code organization"},
            {"title": "Parameters and Arguments", "description": "Passing data into functions", "importance": "Critical for function flexibility"},
            {"title": "Return Values", "description": "Getting results back from functions", "importance": "Important for data flow"}
        ],
        "Control Flow": [
            {"title": "Conditional Statements", "description": "Making decisions in code with if/else", "importance": "Essential for program logic"},
            {"title": "Loops", "description": "Repeating code execution", "importance": "Critical for automation"},
            {"title": "Break and Continue", "description": "Controlling loop execution", "importance": "Important for precise control"}
        ]
    }
    
    default_concepts = [
        {"title": "Core Principle", "description": f"The fundamental principle behind {concept}", "importance": "Essential for understanding"},
        {"title": "Implementation Details", "description": f"How {concept} works in practice", "importance": "Critical for application"},
        {"title": "Use Cases", "description": f"When and where to use {concept}", "importance": "Practical application"}
    ]
    
    return key_concepts_map.get(concept, default_concepts)

def _generate_visual_descriptions(self, concept: str) -> List[Dict[str, str]]:
    visual_map = {
        "Variables and Data Types": [
            {"type": "diagram", "title": "Variable Storage Model", "description": "Shows how variables store different types of data in memory"},
            {"type": "flowchart", "title": "Type Conversion Process", "description": "Visual flow of how data types are converted"}
        ],
        "Functions": [
            {"type": "flowchart", "title": "Function Execution Flow", "description": "Shows the process from function call to return value"},
            {"type": "diagram", "title": "Parameter Passing", "description": "Visualizes how arguments are passed to parameters"}
        ],
        "Control Flow": [
            {"type": "flowchart", "title": "Conditional Logic Flow", "description": "Shows decision paths in if/else statements"},
            {"type": "diagram", "title": "Loop Execution Cycle", "description": "Visualizes how loops iterate and terminate"}
        ]
    }
    
    default_visuals = [
        {"type": "diagram", "title": f"{concept} Structure", "description": f"Visual breakdown of {concept} components"},
        {"type": "flowchart", "title": f"{concept} Process Flow", "description": f"Step-by-step visual process of {concept}"}
    ]
    
    return visual_map.get(concept, default_visuals)

def _generate_terminology(self, concept: str, topic: str) -> List[Dict[str, str]]:
    terminology_map = {
        "Variables and Data Types": [
            {"term": "Variable", "definition": "A named storage location for data", "example": "let age = 25"},
            {"term": "Data Type", "definition": "Classification of data that determines operations", "example": "string, number, boolean"},
            {"term": "Assignment", "definition": "Process of giving a value to a variable", "example": "name = 'John'"}
        ],
        "Functions": [
            {"term": "Function", "definition": "A reusable block of code that performs a task", "example": "function greet() { ... }"},
            {"term": "Parameter", "definition": "A variable in function definition", "example": "function add(a, b)"},
            {"term": "Argument", "definition": "Actual value passed to function", "example": "add(5, 3)"}
        ],
        "Control Flow": [
            {"term": "Condition", "definition": "An expression that evaluates to true/false", "example": "age > 18"},
            {"term": "Loop", "definition": "A structure that repeats code", "example": "for (let i = 0; i < 10; i++)"},
            {"term": "Iteration", "definition": "One execution of a loop body", "example": "Each pass through the loop"}
        ]
    }
    
    default_terms = [
        {"term": f"{concept} Basics", "definition": f"Fundamental aspects of {concept}", "example": f"Basic {concept} usage"},
        {"term": f"{concept} Advanced", "definition": f"Complex features of {concept}", "example": f"Advanced {concept} techniques"}
    ]
    
    return terminology_map.get(concept, default_terms)
