from app.prompts.mentor_prompt import MENTOR_PROMPT_TEMPLATE
from app.utils.vectorstore import get_vectorstore
from app.utils.external_api import fallback_search
from langchain.chains import RetrievalQA
from langchain_google_genai import ChatGoogleGenerativeAI
import os

# Set up vectorstore and retriever
vectorstore = get_vectorstore()
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3})

# Use Gemini instead of OpenAI
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",  # or "gemini-1.5-flash" for faster responses
    temperature=0.3,
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

# Create QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="stuff"
)

def mentor_agent(query: str):
    try:
        # Use invoke instead of __call__
        result = qa_chain.invoke({"query": f"{MENTOR_PROMPT_TEMPLATE}\n\nQuestion: {query}"})
        answer = result["result"]
        
        # Fallback if weak response
        if "I don't know" in answer or len(answer) < 20:
            return fallback_search(query)
        
        return answer
    except Exception as e:
        print(f"Error in mentor_agent: {e}")
        # Fallback to external search if chain fails
        return fallback_search(query)
