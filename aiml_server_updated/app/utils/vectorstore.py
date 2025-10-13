from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
import os


def get_vectorstore():
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    
    if "edgenius-content" not in pc.list_indexes().names():
        pc.create_index(
            name="edgenius-content",
            dimension=1536,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1")
        )
    
    # Use pc.Index() instead of instantiating Index directly
    index = pc.Index("edgenius-content")
    
    embeddings = OpenAIEmbeddings(
        model="text-embedding-ada-002",
        client_kwargs={"api_key": os.getenv("OPENAI_API_KEY")}
    )
    
    return PineconeVectorStore(index=index, embedding=embeddings)
