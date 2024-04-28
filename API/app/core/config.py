from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .database import Base

DATABASE_URL = "postgresql://postgres:dani1234@188.127.169.12:5432/postgres"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_tables():
    Base.metadata.create_all(bind=engine)
