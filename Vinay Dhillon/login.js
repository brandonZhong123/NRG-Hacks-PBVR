document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent actual submission for this example

    // Simulated correct credentials (replace with backend validation)
    const correctEmail = "user@example.com";
    const correctPassword = "SecurePass123";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");

    if (email === correctEmail && password === correctPassword) {
        // Redirect to dashboard (Replace 'dashboard.html' with your actual page)
        window.location.href = "dashboard.html";
    } else {
        loginError.textContent = "Invalid email or password.";
    }
});
