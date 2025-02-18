document.getElementById("registerForm").addEventListener("submit", function(event) {
    let valid = true;

    // Email validation (regex)
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = "Invalid email format";
        valid = false;
    } else {
        emailError.textContent = "";
    }

    // First name validation (no spaces)
    const firstName = document.getElementById("first_name").value;
    const firstNameError = document.getElementById("firstNameError");
    if (/\s/.test(firstName)) {
        firstNameError.textContent = "First name cannot contain spaces";
        valid = false;
    } else {
        firstNameError.textContent = "";
    }

    // Last name validation (no spaces)
    const lastName = document.getElementById("last_name").value;
    const lastNameError = document.getElementById("lastNameError");
    if (/\s/.test(lastName)) {
        lastNameError.textContent = "Last name cannot contain spaces";
        valid = false;
    } else {
        lastNameError.textContent = "";
    }

    // Password validation (at least 8 chars, 1 number, 1 special char)
    const password = document.getElementById("password").value;
    const passwordError = document.getElementById("passwordError");
    const passwordRegex = /^(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.textContent = "Password must be at least 8 characters, contain a number and a special character";
        valid = false;
    } else {
        passwordError.textContent = "";
    }

    // Confirm password validation
    const confirmPassword = document.getElementById("confirm_password").value;
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match";
        valid = false;
    } else {
        confirmPasswordError.textContent = "";
    }

    // Prevent form submission if any field is invalid
    if (!valid) {
        event.preventDefault();
    }
});
