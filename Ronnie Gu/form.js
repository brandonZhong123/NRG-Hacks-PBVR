document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("priority").value = "";
});


document.getElementById("assignmentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;

    if (title.trim() === "" || dueDate.trim() === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (priority.trim() === "") {
        alert("Please select a priority level.");
        return;
    }

    let list = document.getElementById("list");
    let listItem = document.createElement("li");
    listItem.textContent = `Assignment: ${title} - Due: ${dueDate} - Priority: ${priority}`;

    list.appendChild(listItem);

    document.getElementById("assignmentList").style.display = "block";

    this.reset();
    document.getElementById("priority").value = "";
});