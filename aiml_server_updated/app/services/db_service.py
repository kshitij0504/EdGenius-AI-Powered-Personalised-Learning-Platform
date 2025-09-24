# app/services/db_service.py
from sqlalchemy import create_engine, Column, Integer, String, JSON, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:password@localhost:5432/edgenius"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    topic = Column(String, nullable=False)
    difficulty = Column(String, nullable=False)
    questions = Column(JSON, nullable=False)

def init_db():
    Base.metadata.create_all(bind=engine)
