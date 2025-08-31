# Backend

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root of the backend folder with the following content:

```env
# MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=analisis_ia
DB_PORT=3306

# OpenAI
OPENAI_API_KEY=your_api_key

# Server
PORT=4000
```

### 3. Run the Server

For development (with auto-reload):
```bash
npx nodemon server.js
```

For production:
```bash
node server.js
```

---

## 🗂️ Folder Structure

```
backend/
│
├── src/
│   ├── config/         # DB and API configuration
│   ├── controllers/    # API endpoints
│   ├── models/         # Sequelize/MySQL models
│   ├── services/       # Business logic
│   ├── routes/         # API routes
│   ├── middlewares/    # Validation, error handling, etc.
│   ├── utils/          # Helper functions
│   ├── uploads/        # Uploaded files
│   └── app.js          # Express configuration
│
├── tests/              # (Optional) Unit tests
├── .env                # Environment variables
├── package.json
└── README.md
```

---

## 🛠️ Useful Scripts

- `npm run lint` — Run ESLint for code quality.
- `npm run prettier` — Format code with Prettier.

---

## 🗄️ Database Tables (MVP)

```sql
CREATE TABLE Submissions (
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
    FOREIGN KEY (submission_id) REFERENCES Submissions(submission_id)
        ON DELETE CASCADE
);

CREATE TABLE Feedbacks (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    analysis_id INT NOT NULL UNIQUE,
    comment TEXT,
    FOREIGN KEY (analysis_id) REFERENCES Analysis(analysis_id)
        ON DELETE CASCADE
);
```

---

## 🧩 Dependencies

- express
- multer
- mysql2
- sequelize
- dotenv
- axios
- openai

### Dev Dependencies

- nodemon
- eslint
- prettier

---

## 💡 Notes

- Make sure your MySQL server is running and accessible.
- The OpenAI API key is required for AI analysis features.
- Uploaded files are stored in `src/uploads/`.

---

Let me know if you want to add instructions for the frontend or integration details!
