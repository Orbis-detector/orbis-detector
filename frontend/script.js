// =============================================================
// Configuración de la API
// =============================================================
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3002' 
  : 'https://tu-backend-en-render.com'; // Reemplaza con tu URL de producción

// =============================================================
// Capture form info and send it to the backend
// References to form elements
// =============================================================
const inputCoderName = document.getElementById("coderName");
const inputDeliveryName = document.getElementById("deliveryName");
const fileInput = document.getElementById("fileInput");
const submitBtn = document.querySelector(".primary-btn");

// Only if the button exists (avoids error in deliveryHistory.html)
if (submitBtn && inputCoderName && inputDeliveryName && fileInput) {
  submitBtn.addEventListener("click", async () => {
    // Validation
    if (!inputCoderName.value || !inputDeliveryName.value || !fileInput.files.length) {
      alert("Please fill in all fields and select a file");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("coderName", inputCoderName.value);
    formData.append("trainingName", inputDeliveryName.value);
    formData.append("file", fileInput.files[0]);

    try {
      // Send data to the backend
      const response = await fetch(`${API_BASE_URL}/api/files/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("File uploaded successfully");
        // Reset form
        inputCoderName.value = "";
        inputDeliveryName.value = "";
        fileInput.value = "";
      } else {
        alert("An error occurred: " + result.message);
      }
    } catch (error) {
      console.log("Error sending delivery:", error);
      alert("An error occurred while connecting to the server");
    }
  });
};

// =============================================================
// FETCH Y PINTADO DE LA TABLA (sin tocar endpoints existentes)
// =============================================================
const tableBody = document.getElementById("submissionBody");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close");

// Elementos del popup (ids según tu HTML)
const iaPercentageEl = document.getElementById("ia_percentage");
const aiCommentEl = document.getElementById("ai-comment");
const feedbackEl = document.getElementById("feedback");
const saveBtn = document.getElementById("save");   // botón Guardar
const deleteBtn = document.getElementById("delete"); // botón Borrar

// Guardamos el analysis_id actual para las operaciones de feedback
let currentAnalysisId = null;

// Escapa texto simple para evitar XSS si viene de DB (mejor práctica)
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// =============================================================
// CARGAR SUBMISSIONS EN LA TABLA (usa tu endpoint actual)
// =============================================================
async function loadSubmissions() {
  try {
    const res = await fetch(`${API_BASE_URL}/getAnalysis`);
    if (!res.ok) throw new Error("Error al cargar los datos");

    const data = await res.json();

    // Limpia la tabla
    tableBody.innerHTML = "";

    // Inserta cada fila (usamos submission_id como venías haciendo)
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.setAttribute("data-id", item.submission_id); // si necesitas más adelante

      row.innerHTML = `
        <td>${escapeHtml(item.name_coder)}</td>
        <td>${escapeHtml(item.name_training)}</td>
        <td>${item.ia_detected === 1 ? "Yes" : "No"}</td>
      `;

      // Evento click → abrir popup con más info
      row.addEventListener("click", () => openPopup(item.submission_id));

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al cargar submissions:", error);
    // no rompo la UX, solo aviso en consola y opcionalmente puedes alertar:
    // alert("No se pudieron cargar las entregas. Revisa el servidor.");
  }
}

// =============================================================
// POPUP: abrir con detalle (usa tu endpoint actual de detalle)
// =============================================================
async function openPopup(submissionId) {
  try {
    const res = await fetch(`${API_BASE_URL}/getAnalysis/${submissionId}`);
    if (!res.ok) throw new Error("Error al cargar análisis");

    const data = await res.json();

    // La API a veces devuelve array (rows) o un objeto. Normalizamos.
    const analysis = Array.isArray(data) ? data[0] : data;
    if (!analysis) throw new Error("No se encontró análisis");

    // Guardamos el analysis_id real si viene (necesario para feedback)
    // Si no viene, fallback al submissionId (si tu backend lo maneja)
    currentAnalysisId = analysis.analysis_id ?? submissionId;

    // Pintar en el popup (defensivo)
    iaPercentageEl.textContent = `${analysis.ia_percentage ?? 0}%`;
    aiCommentEl.textContent = analysis.explanation ?? "No explanation available";
    feedbackEl.value = analysis.comment ?? "";

    // Mostrar popup
    popup.style.display = "flex";
  } catch (error) {
    console.error("Error al abrir popup:", error);
    alert("No se pudo cargar el análisis");
  }
}

// Cerrar popup
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    currentAnalysisId = null;
  });
}

// =============================================================
// FEEDBACK: Guardar / Actualizar
// =============================================================
if (saveBtn) {
  saveBtn.addEventListener("click", async () => {
    if (!currentAnalysisId) return alert("No hay análisis seleccionado");

    const comment = feedbackEl.value.trim();

    // (opcional) Validación mínima
    // if (!comment) return alert("El feedback está vacío");

    try {
      const res = await fetch(
        `${API_BASE_URL}/feedback/${currentAnalysisId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || result.message || "Error");

      alert(result.message ?? "Feedback guardado correctamente");

      // refrescar tabla para reflejar cambios si aplica
      await loadSubmissions();
    } catch (err) {
      console.error("Error guardando feedback:", err);
      alert("Error al guardar feedback");
    }
  });
}

// =============================================================
// INICIO
// =============================================================
document.addEventListener("DOMContentLoaded", loadSubmissions);
