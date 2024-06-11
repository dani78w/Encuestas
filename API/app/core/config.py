from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .database import Base

DATABASE_URL = "postgresql://dani:dani1234@danielarribas.work:5432/Encuestas"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_tables():
    Base.metadata.create_all(bind=engine)
