
// Select all table rows inside <tbody>
document.querySelectorAll("tbody tr").forEach((row) => {
  // Add an event listener when the row is clicked
  row.addEventListener("click", () => {
    // Get the values from each column of the row
    const coderName = row.children[0]?.innerText;      
    const trainingName = row.children[1]?.innerText;   
    const hasAI = row.children[2]?.innerText;          

    // Get DOM elements where the info will be displayed
    const popup = document.getElementById("popup"); 
    const aiDetected = document.getElementById("ia_percentage"); 
    const aiApi = document.getElementById("ai-comment");           

    // If all elements exist, update their values and show the popup
    if (aiDetected && aiApi && popup) {
      aiDetected.innerText = hasAI === "Yes" ? "92%" : "5%"; 
      aiApi.innerText = hasAI === "Yes" ? "OpenAI GPT-4" : "No AI detected"; 
      popup.style.display = "flex"; 
    }
  });
});

// Get the close button
const closeBtn = document.getElementById("close");
if (closeBtn) {
  // When the close button is clicked, hide the popup
  closeBtn.addEventListener("click", () => {
    const popup = document.getElementById("popup");
    if (popup) popup.style.display = "none"; 
  });
}

// Get feedback elements and buttons
const feedback = document.getElementById("feedback"); // Textarea for comments
const btnDelete = document.getElementById("delete"); // Delete button
const btnSave = document.getElementById("save");     // Save button

// Only add functionality if all elements exist
if (feedback && btnDelete && btnSave) {
  // Delete button: clears the textarea
  btnDelete.addEventListener("click", () => {
    feedback.value = "";
  });

  // Save button: saves feedback in localStorage
  btnSave.addEventListener("click", () => {
    const text = feedback.value.trim(); // Remove extra spaces
    if (text) {
      console.log("Feedback saved:", text);
      localStorage.setItem("feedback", text); 
      alert("Feedback saved successfully"); 
    } else {
      alert("No feedback to save"); 
    }
  });
}

// Capture form info and send it to the backend
// References to form elements
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
      const response = await fetch("http://localhost:3000/api/files/upload", {
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

