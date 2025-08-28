# Backend

## Instala dependencias

    npm init -y
    npm install express multer mysql2 sequelize dotenv axios openai
    npm install --save-dev nodemon eslint prettier

## 🗂️ Estructura de Carpetas

    project-root/
    │
    ├── src/
    │   ├── config/              # Configuración de DB y API
    │   ├── controllers/         # Controladores (endpoints)
    │   ├── models/              # Modelos Sequelize/MySQL
    │   ├── services/            # Lógica de negocio
    │   ├── routes/              # Rutas API
    │   ├── middlewares/         # Validaciones, errores, etc.
    │   ├── utils/               # Funciones de ayuda
    │   ├── uploads/             # Archivos subidos (system files)
    │   └── app.js               # Configuración Express
    │
    ├── tests/                   # (Opcional) Unit tests
    ├── .env                     # Variables de entorno
    ├── package.json
    └── README.md

## ⚙️ Configuración de entorno

Creado un archivo .env en la raíz con:

    # MySQL
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_password
    DB_NAME=analisis_ia
    DB_PORT=3306

    # OpenAI
    OPENAI_API_KEY=tu_api_key

    # Servidor
    PORT=4000

## Tabla usada para el MVP

    CREATE TABLE Submission (
        submission_id INT AUTO_INCREMENT PRIMARY KEY,
        name_coder VARCHAR(100) NOT NULL,
        name_training VARCHAR(100) NOT NULL,
        file_url VARCHAR(255) NOT NULL
    );

    CREATE TABLE Analysis (
        analysis_id INT AUTO_INCREMENT PRIMARY KEY,
        submission_id INT NOT NULL UNIQUE,
        ia_percentage DECIMAL(5,2) NOT NULL,
        ia_detected BOOLEAN DEFAULT 0,
        explanation TEXT,
        FOREIGN KEY (submission_id) REFERENCES Submission(submission_id)
            ON DELETE CASCADE
    );

    CREATE TABLE Feedback (
        feedback_id INT AUTO_INCREMENT PRIMARY KEY,
        analysis_id INT NOT NULL UNIQUE,
        comment TEXT,
        FOREIGN KEY (analysis_id) REFERENCES Analysis(analysis_id)
            ON DELETE CASCADE
    );
