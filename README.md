
# Orbis AI Detector – MVP

## 📝 Description

Orbis AI Detector is a **Minimum Viable Product (MVP)** designed to detect AI-generated content in coder submissions. It simulates integration with **Moodle** by allowing coders to upload assignments, automatically analyzing files with **OpenAI**, and providing a **Team Leader (TL) panel** to review results and give feedback.

The goal is to support academic evaluation by highlighting potential AI-assisted work and streamlining the review process for instructors.

---

## 🚩 Features

- **File Upload (Coder Simulation):** Submit a PDF file with coder name and training name.
- **Automatic AI Detection:** Backend sends the file to OpenAI with a custom prompt and returns:
  - `ia_percentage` (0–100)
  - `ia_detected` (true/false, based on >50%)
  - `explanation` (brief text ≤200 characters)
- **Database Storage:** All submissions, analyses, and feedback are stored in a relational database.
- **Team Leader Panel:**
  - Table with all analyzed submissions
  - Modal view with analysis details
  - Ability to add, update, or delete feedback
- **Simple Navigation:**
  - “Upload File” (Coder simulation)
  - “Show Analysis” (Team Leader view)

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript (vanilla + Fetch API)
- **Backend:** Node.js with Express
- **Database:** MySQL
- **External API:** OpenAI API (custom JSON prompt for AI detection)
- **Other Tools:** GitHub Projects (SCRUM board), VSCode

---

## 📁 Project Structure

```cd
orbis-detector/
│
├── Orbis_DocumentoTecnico.pdf
├── README.md
├── backend/
│   ├── package.json
│   ├── README.MD
│   ├── server.js
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── uploads/
│       └── app.js
├── frontend/
│   ├── historialEntregas.html
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── images/
│       ├── logo_riwi.png
│       └── riwi.png
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- MySQL
- OpenAI API Key

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Orbis-detector/orbis-detector.git
   cd orbis-detector
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in `/backend` with:

   ```ini
   OPENAI_API_KEY=your_api_key
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=analisis_ia
   DB_PORT=3306
   PORT=4000
   ```

4. **Run the backend server:**

   ```bash
   node server.js
   ```

5. **Open the frontend:**

   Open `frontend/index.html` in your browser.

---

## 📖 Usage

### Coder Simulation – Upload File

1. Enter **coder name** and **training name**.
2. Upload a **PDF file**.
3. Click **Submit** → file is stored and sent to **OpenAI** for analysis.

### Team Leader Panel – Show Analysis

1. View table of all submissions with **AI detection status (Yes/No)**.
2. Click **“View Detail”** to open a modal with:
   - AI percentage
   - Explanation
   - Feedback textarea (create / update)

---

## 👥 Team

- Jhos Kevin Agudelo Moreno
- Javier Andres Narvaez Galiano
- Jonathan Jesús Cardona Restrepo
- Samuel Santiago Rodríguez Quintero
- Ivana Vanessa Machado Usuga

---
