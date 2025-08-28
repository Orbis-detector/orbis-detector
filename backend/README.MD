## Instala dependencias:

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

--create tables submissions,Analysis,Feedbacks
CREATE TABLE Submissions (
    submission_id INT PRIMARY KEY AUTO_INCREMENT,
    name_coder VARCHAR(100) NOT NULL,
    name_training VARCHAR(100) NOT NULL,
    file_url VARCHAR(255) NOT NULL
);

CREATE TABLE Analysis (
    analysis_id INT PRIMARY KEY AUTO_INCREMENT,
    submission_id INT NOT NULL,
    ia_percentage DECIMAL(3,0) NOT NULL,
    ia_detected BOOLEAN NOT NULL, -- 1=SÃ­, 0=No
    explanation TEXT,
    FOREIGN KEY (submission_id) REFERENCES Submissions(submission_id)
);

CREATE TABLE Feedbacks (
    feedback_id INT PRIMARY KEY AUTO_INCREMENT,
    analysis_id INT NOT NULL,
    comment TEXT,
    FOREIGN KEY (analysis_id) REFERENCES Analysis(analysis_id)
);