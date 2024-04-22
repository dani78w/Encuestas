from fastapi import APIRouter, HTTPException, status
from app.schemas.encuesta import EncuestaCreate
from models.encuesta import Encuesta

router = APIRouter()

@router.post("/crearNota/", response_model=Encuesta, status_code=status.HTTP_201_CREATED)
def crear_encuesta(encuesta: EncuestaCreate):
    """
    Crea una nueva nota con el contenido proporcionado.
    """
    # Simulando una base de datos con un diccionario en memoria
    db = {}
    nota_id = 1  # Esto debería ser generado por la base de datos o algún sistema
    nueva_nota = {"id": nota_id, "contenido": encuesta.contenido}
    db[nota_id] = nueva_nota
    return nueva_nota