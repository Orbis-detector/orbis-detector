// Selecciona todas las filas de la tabla (tbody)
document.querySelectorAll("tbody tr").forEach(fila => {
  fila.addEventListener("click", () => {
    // Aquí podrías cambiar dinámicamente los valores según la fila
    const nombre = fila.children[0].innerText;
    const entrenamiento = fila.children[1].innerText;
    const tieneIA = fila.children[2].innerText;

    document.getElementById("ia-detectada").innerText = 
      tieneIA === "Sí" ? "92%" : "5%";
    document.getElementById("ia-api").innerText = 
      tieneIA === "Sí" ? "OpenAI GPT-4" : "Sin IA detectada";

    // Mostrar popup
    document.getElementById("popup").style.display = "flex";
  });
});

// Botón cerrar
document.getElementById("cerrar").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

// === NUEVO ===

// Referencias
const feedback = document.getElementById("feedback");
const btnEliminar = document.getElementById("eliminar");
const btnGuardar = document.getElementById("guardar");

// Eliminar feedback
btnEliminar.addEventListener("click", () => {
  feedback.value = "";
});

// Guardar feedback
btnGuardar.addEventListener("click", () => {
  const texto = feedback.value.trim();
  if (texto) {
    console.log("✅ Feedback guardado:", texto);
    localStorage.setItem("feedback", texto); // Guarda en localStorage
    alert("Feedback guardado correctamente");
  } else {
    alert("⚠️ No hay feedback para guardar");
  }
});
