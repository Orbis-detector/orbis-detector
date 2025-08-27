// Selecciona todas las filas dentro del <tbody> de la tabla
document.querySelectorAll("tbody tr").forEach((fila) => {
  // Agrega un listener para cuando se haga click en la fila
  fila.addEventListener("click", () => {
    // Obtiene los valores de cada columna de la fila
    const nombre = fila.children[0]?.innerText; // Primer columna: nombre
    const entrenamiento = fila.children[1]?.innerText; // Segunda columna: entrenamiento
    const tieneIA = fila.children[2]?.innerText; // Tercera columna: si tiene IA

    // Obtiene los elementos del DOM donde se mostrará la info
    const iaDetectada = document.getElementById("ia-detectada"); // Porcentaje de IA detectada
    const iaApi = document.getElementById("ia-api"); // Nombre del modelo detectado
    const popup = document.getElementById("popup"); // Ventana emergente

    // Si todos los elementos existen, actualiza sus valores y muestra el popup
    if (iaDetectada && iaApi && popup) {
      iaDetectada.innerText = tieneIA === "Sí" ? "92%" : "5%"; // Muestra el porcentaje según tenga IA
      iaApi.innerText = tieneIA === "Sí" ? "OpenAI GPT-4" : "Sin IA detectada"; // Muestra el modelo o mensaje
      popup.style.display = "flex"; // Muestra la ventana emergente
    }
  });
});

// Obtiene el botón de cerrar
const cerrarBtn = document.getElementById("cerrar");
if (cerrarBtn) {
  // Cuando se hace click en el botón, oculta la ventana emergente
  cerrarBtn.addEventListener("click", () => {
    const popup = document.getElementById("popup");
    if (popup) popup.style.display = "none"; // Oculta el popup
  });
}

// Obtiene los elementos de feedback y botones
const feedback = document.getElementById("feedback"); // Textarea para comentarios
const btnEliminar = document.getElementById("eliminar"); // Botón de limpiar
const btnGuardar = document.getElementById("guardar"); // Botón de guardar

// Solo se agrega funcionalidad si todos los elementos existen
if (feedback && btnEliminar && btnGuardar) {
  // Botón eliminar: limpia el textarea
  btnEliminar.addEventListener("click", () => {
    feedback.value = "";
  });

  // Botón guardar: guarda el feedback en localStorage
  btnGuardar.addEventListener("click", () => {
    const texto = feedback.value.trim(); // Quita espacios al inicio y final
    if (texto) {
      console.log("Feedback guardado:", texto); // Muestra en consola
      localStorage.setItem("feedback", texto); // Guarda en localStorage
      alert("Feedback guardado correctamente"); // Notifica al usuario
    } else {
      alert("No hay feedback para guardar"); // Si no hay texto, alerta
    }
  });
}





// Captura la info del frontend y la envía al backend
// Referencia a los elementos del formulario
const nameCoder = document.getElementById("nombreCoder");
const nameTraining = document.getElementById("nombreEntrega");
const fileInput = document.getElementById("fileInput");
const submitBtn = document.querySelector(".primary-btn");

// Solo si existe el botón (evitamos error en historialEntregas.html)
if (submitBtn && nameCoder && nameTraining && fileInput) {
  submitBtn.addEventListener("click", async () => {
    // Validación
    if (!nameCoder.value || !nameTraining.value || !fileInput.files.length) {
      alert("Por favor completa todos los campos y selecciona un archivo");
      return;
    }

    // Crear objeto FormData
    const formData = new FormData();
    formData.append("coderName", nameCoder.value);
    formData.append("trainingName", nameTraining.value);
    formData.append("file", fileInput.files[0]);

    try {
      // Enviar los datos al Backend
      const response = await fetch("http://localhost:3000/api/files/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Archivo subido con éxit0");
        // Resetear formulario
        nameCoder.value = "";
        nameTraining.value = "";
        fileInput.value = "";
      } else {
        alert("Ocurrió un error: " + result.message);
      }
    } catch (error) {
      console.log("Error al enviar la entrega:", error);
      alert("Ocurrió un error en la conexión con el servidor");
    }
  });
}