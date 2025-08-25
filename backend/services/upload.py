from fastapi import FastAPI, UploadFile, File
import shutil
import mysql.connector

app = FastAPI()

# Conexión MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="detector_ia"
)
cursor = conn.cursor()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Guardar archivo en uploads/
    ruta = f"../uploads/{file.filename}"
    with open(ruta, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Guardar metadata en MySQL
    cursor.execute("""
        INSERT INTO archivos (nombre, ruta_local, tipo)
        VALUES (%s, %s, %s)
    """, (file.filename, ruta, file.content_type))
    conn.commit()

    return {"mensaje": "Archivo subido con éxito", "ruta": ruta}
