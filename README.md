# Plagiarism & AI Content Detector - MVP

## Description

This project is an MVP to detect plagiarism and AI-generated content in coders' texts.  
It allows users to submit text and receive an analysis report showing the plagiarism percentage, AI detection status, and source references.

## Features

- Upload text for plagiarism and AI content analysis.
- Instant results displayed on the frontend.
- Mock or real API integration for detection.
- Simple, clean UI for usability.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, API
- **Other Tools:** Bootstrap for styling, VSCode for development

## Project Structure

    plagiarism-detector/
    ├─ frontend/
    │  ├─ index.html       # Página principal con textarea y botón
    │  ├─ style.css        # Estilos del MVP
    │  └─ script.js        # Lógica JS para enviar texto al backend y mostrar resultados
    ├─ backend/
    │  ├─ app.py           # Servidor Python (FastAPI) con endpoint /analyze
    │  └─ requirements.txt # Dependencias Python (FastAPI, pydantic, requests si necesitas API externa)
    ├─ README.md           # Descripción del proyecto, cómo ejecutar, stack, créditos
    ├─ DocumentoTecnico.pdf # Documento técnico con objetivos, alcance, historias, diagramas
    └─ wireframe.png        # Prototipo visual del MVP

## Getting Started

### Prerequisites

`PENDIENTE`

### Installation

1. Clone the repository:
    git clone [https://github.com/Moren0k/plagiarism-detector.git](https://github.com/Moren0k/plagiarism-detector.git)
    cd plagiarism-detector

2. Install backend dependencies:
`PENDIENTE`

3. Run the backend server:
`PENDIENTE`

4. Open `frontend/index.html` in your browser.

## Usage

1. Enter or paste text in the textarea.
2. Click **Analyze**.
3. View the results: plagiarism percentage, AI detection, and source links.

## Team

- Kevin Moreno
- Javier Narvaez
- Jonathan
- Samuel
- Vanessa

## Credits

This project is part of the Riwi CodeUp Basic Route Integrator Project.
