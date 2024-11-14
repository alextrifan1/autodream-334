// Get the form and error message elements
const signUpForm = document.getElementById('signUpForm');
const errorMessage = document.getElementById('error-message');

// Add event listener for form submission
signUpForm.addEventListener('submit', function (event) {
    // Prevent form from submitting if there's an error
    let formValid = true;
    
    // Get input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation for password length
    if (password.length < 6) {
        formValid = false;
        alert('Password must be at least 6 characters long');
    }

    // Simple validation for email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        formValid = false;
        alert('Please enter a valid email address');
    }

    if (!formValid) {
        event.preventDefault(); // Stop form submission if invalid
    }
});
