from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Configura la URL de la base de datos aquí. 
# Deberías extraer la URL de la base de datos y otros valores sensibles en variables de entorno o un archivo de configuración.
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:dani1234@188.127.169.12:5432/postgres"

# Crea el motor de la base de datos con la URL proporcionada.
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Cada instancia de la clase SessionLocal será una sesión de base de datos independiente.
# La sesión es la que realmente conversa con la base de datos, así que la necesitas para todas las operaciones CRUD.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# La clase Base se usará como base para los modelos declarativos, una instancia de la clase declarativa de SQLAlchemy.
Base = declarative_base()
