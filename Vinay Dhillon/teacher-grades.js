// Function to add a new grade entry
function addGradeEntry() {
    const studentName = document.getElementById("studentName").value;
    const assignment = document.getElementById("assignment").value;
    const grade = document.getElementById("grade").value;
    const weight = document.getElementById("weight").value;
    const feedback = document.getElementById("feedback").value;

    if (studentName === "" || assignment === "" || grade === "" || weight === "" || feedback === "") {
        alert("Please fill out all fields.");
        return;
    }

    const table = document.getElementById("gradesBody");
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${studentName}</td>
        <td>${assignment}</td>
        <td contenteditable="true">${grade}</td>
        <td contenteditable="true">${weight}</td>
        <td contenteditable="true">${feedback}</td>
        <td>
            <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    // Clear form after submission
    document.getElementById("addGradeForm").reset();
}

// Function to delete a grade entry
function deleteRow(button) {
    const row = button.closest("tr");
    row.remove();
}
