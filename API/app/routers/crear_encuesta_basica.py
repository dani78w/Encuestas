from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.config import SessionLocal
from app.models.encuesta import Encuesta
from app.schemas.encuesta import EncuestaCreate  # Asumiendo que tienes un Pydantic schema
from fastapi import APIRouter, HTTPException
from datetime import datetime
import psycopg2



# Configuración de la conexión a la base de datos PostgreSQL
DATABASE_URL = "postgresql://postgres:dani1234@danielarribas.work:5432/postgres"
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

# Definición del router
router = APIRouter()
from pydantic import BaseModel

class EncuestaBase(BaseModel):
    titulo: str
    dueno: int

class EncuestaCreate(EncuestaBase):
    pass

class Encuesta(EncuestaBase):
    id: int
    fecha: str

# Función para manejar las peticiones POST a /encuestas/
@router.post("/encuestas/")
async def crear_encuesta(encuesta: EncuestaCreate):
    fecha_actual = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    # Consulta SQL para insertar la encuesta en la base de datos
    sql = "INSERT INTO encuesta (titulo, dueno, fecha) VALUES (%s, %s, %s) RETURNING id"
    values = (encuesta.titulo, encuesta.dueno, fecha_actual)
    
    try:
        cursor.execute(sql, values)
        # Obtener el ID de la encuesta recién insertada
        encuesta_id = cursor.fetchone()[0]
        # Confirmar la transacción
        conn.commit()
        return {"mensaje": "Encuesta creada exitosamente", "id_encuesta": encuesta_id}
    except Exception as e:
        # Si ocurre algún error, revertir la transacción
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Error al crear la encuesta: {str(e)}")