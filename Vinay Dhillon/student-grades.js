document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const studentName = urlParams.get("student");
    document.getElementById("studentName").textContent = studentName.replace(/([A-Z])/g, ' $1').trim();

    loadStudentGrades(studentName);
});

function loadStudentGrades(student) {
    const storedData = localStorage.getItem(`grades-${student}`);
    if (storedData) {
        document.getElementById("gradesBody").innerHTML = storedData;
    }
    checkDueDates(student);
    updateOverallGrade(student);
}

function addAssignment() {
    const assignment = document.getElementById("assignment").value;
    const dueDate = document.getElementById("dueDate").value;
    const grade = document.getElementById("grade").value || "null";
    const weight = document.getElementById("weight").value || "null";
    const feedback = document.getElementById("feedback").value || "";

    if (!assignment || !dueDate) {
        alert("Please fill out Assignment and Due Date fields.");
        return;
    }

    const table = document.getElementById("gradesBody");
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${assignment}</td>
        <td>${dueDate}</td>
        <td class="grade">${grade}</td>
        <td class="weight">${weight}</td>
        <td class="feedback">${feedback}</td>
        <td>
            <button class="edit-btn" onclick="editAssignment(this)" disabled>Edit</button>
            <button class="delete-btn" onclick="deleteAssignment(this)">Delete</button>
        </td>
    `;

    saveStudentGrades();
    checkDueDates();
    updateOverallGrade();
}

function deleteAssignment(button) {
    button.closest("tr").remove();
    saveStudentGrades();
    updateOverallGrade();
}

function editAssignment(button) {
    const row = button.closest("tr");
    row.cells[2].contentEditable = "true"; // Grade
    row.cells[3].contentEditable = "true"; // Weight
    row.cells[4].contentEditable = "true"; // Feedback
    button.textContent = "Save";
    button.onclick = function () {
        row.cells[2].contentEditable = "false";
        row.cells[3].contentEditable = "false";
        row.cells[4].contentEditable = "false";
        button.textContent = "Edit";
        button.onclick = () => editAssignment(button);
        saveStudentGrades();
        updateOverallGrade();
    };
}

function saveStudentGrades() {
    const student = new URLSearchParams(window.location.search).get("student");
    const tableContent = document.getElementById("gradesBody").innerHTML;
    localStorage.setItem(`grades-${student}`, tableContent);
}

function checkDueDates() {
    const today = new Date().toISOString().split('T')[0];

    document.querySelectorAll("#gradesBody tr").forEach(row => {
        const dueDate = row.cells[1].textContent;
        if (dueDate > today) {
            row.cells[2].textContent = "null";
            row.cells[3].textContent = "null";
            row.cells[5].children[0].disabled = true; // Disable Edit Button
        } else {
            row.cells[5].children[0].disabled = false; // Enable Edit Button
        }
    });
}

function updateOverallGrade() {
    const student = new URLSearchParams(window.location.search).get("student");
    let totalGrade = 0;
    let totalWeight = 0;

    document.querySelectorAll("#gradesBody tr").forEach(row => {
        const grade = parseFloat(row.cells[2].textContent.replace('%', '')) || 0;
        const weight = parseFloat(row.cells[3].textContent.replace('%', '')) || 0;
        if (row.cells[2].textContent !== "null" && row.cells[3].textContent !== "null") {
            totalGrade += (grade * weight) / 100;
            totalWeight += weight;
        }
    });

    const overallGrade = totalWeight > 0 ? (totalGrade / totalWeight) * 100 : null;

    localStorage.setItem(`overall-${student}`, overallGrade !== null ? overallGrade.toFixed(1) : "null");

    // Update the teacher's dashboard (if applicable)
    const teacherPage = document.querySelector(`#overall-${student}`);
    if (teacherPage) {
        teacherPage.textContent = overallGrade !== null ? `${overallGrade.toFixed(1)}%` : "null";
    }
}

function goBack() {
    window.location.href = "teacher-grades.html";
}
