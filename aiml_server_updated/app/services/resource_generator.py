import os
from datetime import datetime

class ResourceGenerator:
    def __init__(self):
        # Create a resources directory if it doesn't exist
        self.resources_dir = "generated_resources"
        if not os.path.exists(self.resources_dir):
            os.makedirs(self.resources_dir)

    def create_resources(self, lesson_modules: list, user_id: int):
        """
        Converts lessons into multiple formats.
        
        Args:
            lesson_modules: List of lesson dictionaries from LessonGeneratorAgent
            user_id: User identifier
        """
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Generate file paths
        markdown_file = os.path.join(self.resources_dir, f"user_{user_id}_lessons_{timestamp}.md")
        pdf_file = os.path.join(self.resources_dir, f"user_{user_id}_lessons_{timestamp}.pdf")
        flashcards_file = os.path.join(self.resources_dir, f"user_{user_id}_flashcards_{timestamp}.txt")
        
        # Create Markdown content
        markdown_content = self._generate_markdown_content(lesson_modules, user_id)
        
        # Write Markdown file
        try:
            with open(markdown_file, "w", encoding='utf-8') as f:
                f.write(markdown_content)
        except Exception as e:
            print(f"Error writing markdown file: {e}")
            return {"error": f"Failed to create markdown: {str(e)}"}
        
        # Generate flashcards
        flashcards_content = self._generate_flashcards(lesson_modules)
        
        try:
            with open(flashcards_file, "w", encoding='utf-8') as f:
                f.write(flashcards_content)
        except Exception as e:
            print(f"Error writing flashcards file: {e}")
        
        # TODO: Convert Markdown → PDF (using libraries like weasyprint or reportlab)
        
        return {
            "markdown": markdown_file,
            "pdf": pdf_file,  # Will be generated when PDF conversion is implemented
            "flashcards": flashcards_file,
            "files_created": {
                "markdown": os.path.exists(markdown_file),
                "flashcards": os.path.exists(flashcards_file),
                "pdf": False  # Set to True when PDF generation is implemented
            },
            "user_id": user_id,
            "generated_at": datetime.now().isoformat(),
            "total_lessons": len(lesson_modules)
        }
    
    def _generate_markdown_content(self, lesson_modules: list, user_id: int) -> str:
        """
        Generates markdown content from lesson modules
        """
        content = f"# Personalized Lessons for User {user_id}\n\n"
        content += f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
        content += f"Total Lessons: {len(lesson_modules)}\n\n"
        content += "---\n\n"
        
        for i, lesson in enumerate(lesson_modules, 1):
            content += f"## Lesson {i}: {lesson.get('concept', 'Unknown Concept')}\n\n"
            content += f"**Topic:** {lesson.get('topic', 'N/A')}\n\n"
            content += f"**Skill Level:** {lesson.get('skill_level', 'N/A')}\n\n"
            content += f"**Estimated Duration:** {lesson.get('estimated_duration', 'N/A')}\n\n"
            content += f"**Difficulty Score:** {lesson.get('difficulty_score', 'N/A')}/10\n\n"
            
            # Add learning objectives
            objectives = lesson.get('learning_objectives', [])
            if objectives:
                content += "### Learning Objectives:\n"
                for obj in objectives:
                    content += f"- {obj}\n"
                content += "\n"
            
            # Add prerequisites
            prerequisites = lesson.get('prerequisites', [])
            if prerequisites:
                content += "### Prerequisites:\n"
                for prereq in prerequisites:
                    content += f"- {prereq}\n"
                content += "\n"
            
            # Add lesson content (convert HTML to markdown-friendly format)
            lesson_content = lesson.get('content', {})
            html_content = lesson_content.get('html', '')
            
            if html_content:
                # Simple HTML to Markdown conversion (you can enhance this)
                markdown_content = self._html_to_markdown_simple(html_content)
                content += "### Lesson Content:\n\n"
                content += markdown_content + "\n\n"
            
            # Add next steps
            next_steps = lesson.get('next_steps', [])
            if next_steps:
                content += "### Next Steps:\n"
                for step in next_steps:
                    content += f"- {step}\n"
                content += "\n"
            
            content += "---\n\n"
        
        return content
    
    def _html_to_markdown_simple(self, html_content: str) -> str:
        """
        Simple HTML to Markdown conversion
        """
        # Basic HTML tag removal/conversion
        import re
        
        # Remove HTML tags and convert to plain text
        text = re.sub(r'<[^>]+>', '', html_content)
        
        # Clean up extra whitespace
        text = re.sub(r'\n\s*\n', '\n\n', text)
        text = text.strip()
        
        return text
    
    def _generate_flashcards(self, lesson_modules: list) -> str:
        """
        Generates flashcards from lesson content
        """
        flashcards = f"# Flashcards - Generated on {datetime.now().strftime('%Y-%m-%d')}\n\n"
        
        for lesson in lesson_modules:
            concept = lesson.get('concept', 'Unknown')
            topic = lesson.get('topic', 'Unknown')
            
            flashcards += f"## {concept} ({topic})\n\n"
            
            # Generate basic flashcards from learning objectives
            objectives = lesson.get('learning_objectives', [])
            for i, obj in enumerate(objectives, 1):
                flashcards += f"**Card {i}:**\n"
                flashcards += f"Q: What should you know about {concept}?\n"
                flashcards += f"A: {obj}\n\n"
            
            # Add concept-based questions
            flashcards += f"**Concept Card:**\n"
            flashcards += f"Q: What is {concept}?\n"
            flashcards += f"A: {concept} is a fundamental concept in {topic} that...\n\n"
            
            flashcards += "---\n\n"
        
        return flashcards
