// =============================================================

// Configuración de la API
// =============================================================
// const API_BASE_URL = window.location.hostname === 'localhost' 
//   ? 'http://localhost:3002' 
//   : 'https://orbis-backend-1094944094478.us-central1.run.app'; // Reemplaza con tu URL de producción

const API_BASE_URL = 'https://orbis-backend-1094944094478.us-central1.run.app';

// =============================================================
// Capture form info and send it to the backend
// References to form elements
// =============================================================
const inputCoderName = document.getElementById("coderName");
const inputDeliveryName = document.getElementById("deliveryName");
const fileInput = document.getElementById("fileInput");
const submitBtn = document.querySelector(".primary-btn");

// Add event listener only if button and inputs exist
if (submitBtn && inputCoderName && inputDeliveryName && fileInput) {
  submitBtn.addEventListener("click", async () => {
    // Validate fields
    if (!inputCoderName.value || !inputDeliveryName.value || !fileInput.files.length) {
      alert("Please fill in all fields and select a file");
      return;
    }

    // Prepare FormData for upload
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
        // Reset inputs
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
// Table fetch and render logic
// =============================================================
const tableBody = document.getElementById("submissionBody");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close");

// Popup elements
const iaPercentageEl = document.getElementById("ia_percentage");
const aiCommentEl = document.getElementById("ai-comment");
const feedbackEl = document.getElementById("feedback");
const saveBtn = document.getElementById("save");
const deleteBtn = document.getElementById("delete");

let currentAnalysisId = null;

// Escape HTML to prevent XSS
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Load submissions into table
async function loadSubmissions() {
  try {
    const res = await fetch(`${API_BASE_URL}/getAnalysis`);
    if (!res.ok) throw new Error("Error al cargar los datos");

    const data = await res.json();
    tableBody.innerHTML = "";

    data.forEach((item) => {
      const row = document.createElement("tr");
      row.setAttribute("data-id", item.submission_id);

      row.innerHTML = `
        <td>${escapeHtml(item.name_coder)}</td>
        <td>${escapeHtml(item.name_training)}</td>
        <td>${item.ia_detected === 1 ? "Yes" : "No"}</td>
      `;

      // Click row to open popup with details
      row.addEventListener("click", () => openPopup(item.submission_id));
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading submissions:", error);
  }
}

// Open popup with analysis details
async function openPopup(submissionId) {
  try {
    const res = await fetch(`${API_BASE_URL}/getAnalysis/${submissionId}`);
    if (!res.ok) throw new Error("Error al cargar análisis");

    const data = await res.json();
    const analysis = Array.isArray(data) ? data[0] : data;
    if (!analysis) throw new Error("Analysis not found");

    currentAnalysisId = analysis.analysis_id ?? submissionId;

    // Populate popup fields
    iaPercentageEl.textContent = `${analysis.ia_percentage ?? 0}%`;
    aiCommentEl.textContent = analysis.explanation ?? "No explanation available";
    feedbackEl.value = analysis.comment ?? "";

    popup.style.display = "flex";
  } catch (error) {
    console.error("Error opening popup:", error);
    alert("Could not load analysis");
  }
}

// Close popup
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    currentAnalysisId = null;
  });
}

// =============================================================
// Feedback save/update
// =============================================================
if (saveBtn) {
  saveBtn.addEventListener("click", async () => {
    if (!currentAnalysisId) return alert("No analysis selected");

    const comment = feedbackEl.value.trim();

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

      alert(result.message ?? "Feedback saved successfully");
      await loadSubmissions(); // Refresh table
    } catch (err) {
      console.error("Error saving feedback:", err);
      alert("Error saving feedback");
    }
  });
}

// Initialize table on DOM load
document.addEventListener("DOMContentLoaded", loadSubmissions);
