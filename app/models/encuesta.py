from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from ..core.database import Base  # Uso de dos puntos para subir un nivel en la estructura de directorios

class Encuesta(Base):
    __tablename__ = 'encuesta'
    
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    dueno = Column(Integer, ForeignKey('usuario.id'), nullable=False)
    fecha = Column(TIMESTAMP)
    
    # Relación con el modelo de Usuario, si es necesario
    usuario = relationship("Usuario", back_populates="encuestas")
