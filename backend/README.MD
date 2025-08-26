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

Crea un archivo .env en la raíz con:

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