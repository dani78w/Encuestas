from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Usuario(Base):
    __tablename__ = 'usuario'

    id = Column(Integer, primary_key=True)
    nombre = Column(String)

    # Relación para acceder a las encuestas desde el objeto usuario
    encuestas = relationship("Encuesta", back_populates="dueno_relacion")

    def __repr__(self):
        return f"<Usuario(id={self.id}, nombre={self.nombre})>"
