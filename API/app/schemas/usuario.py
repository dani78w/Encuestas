
from pydantic import BaseModel

# Esquema para cuando se crea un nuevo usuario
class UsuarioCreate(BaseModel):
    nombre: str
    # Aquí también incluirías cualquier otro campo relevante como email, password, etc.

# Esquema para cuando se lee la información de un usuario
class UsuarioRead(BaseModel):
    id: int
    nombre: str

    class Config:
        orm_mode = True
