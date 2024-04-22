from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.config import SessionLocal
from app.models.encuesta import Encuesta
from app.schemas.encuesta import EncuestaCreate  # Asumiendo que tienes un Pydantic schema
from fastapi import APIRouter, HTTPException
from datetime import datetime
import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="tu_base_de_datos",
        user="tu_usuario",
        password="tu_contraseña"
    )
    return conn

@app.get("/encuestas/", response_model=List[dict])
async def read_encuestas():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM encuesta")
    encuestas = cursor.fetchall()
    cursor.close()
    conn.close()
    return encuestas