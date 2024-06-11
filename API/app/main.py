from fastapi import FastAPI
from .routers.crear_encuesta_basica import router as encuesta_router
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from psycopg2.extras import RealDictCursor


# Configurar CORS para permitir solicitudes desde http://localhost:3000
app = FastAPI()

# Configurar CORS para permitir todas las conexiones desde cualquier origen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*","192.168.1.134","192.168.1.186","188.127.169.12:3000","188.127.169.12:3000","danielarribas.work","danielarribas.work:3000"],  # Permitir todas las conexiones desde cualquier origen
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


# Define tus rutas y demás configuración de la aplicación aquí
@app.get("/")
def read_root():
    return {"Hello": "World"}

app.include_router(encuesta_router)


def get_db_connection():
    conn = psycopg2.connect(
        host="danielarribas.work",
        port="5432",
        database="Encuestas",
        user="dani",
        password="dani1234"
    )
    return conn

@app.get("/encuestas/")
async def read_encuestas():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM encuesta")
    encuestas = cursor.fetchall()
    cursor.close()
    conn.close()
    return encuestas

@app.get("/encuesta/{id}")
async def read_encuestas(id: int):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute("SELECT * FROM encuesta WHERE id = %s", (id,))
        encuestas = cursor.fetchall()
        if not encuestas:
            raise HTTPException(status_code=404, detail="Encuesta not founddd")
        return encuestas
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()