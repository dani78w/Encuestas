from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EncuestaCreate(BaseModel):
    titulo: str
    dueno: int  # Este será el id del usuario que crea la encuesta.

# También querrás tener un esquema que incluya todos los campos cuando lees la encuesta,
# incluyendo aquellos que son automáticamente generados como 'id' y 'fecha'.
class EncuestaRead(BaseModel):
    id: int
    titulo: str
    dueno: int
    fecha: Optional[datetime] = None  # La fecha puede ser nula si la encuesta no ha sido cerrada.

    class Config:
        orm_mode = True  # Esto permite que el modelo Pydantic sea compatible con los ORM, como SQLAlchemy.
