document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send form data using fetch
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
    })
    .then(response => response.json())
    .then(data => {
        // If the login is successful, redirect to the home page
        if (data.status === 'success') {
            window.location.href = 'index.php'; // Redirect to homepage or dashboard
        } else {
            // Display the error message
            document.getElementById('error-message').textContent = data.message;
            document.getElementById('error-message').style.display = 'block';
        }
    })
    .catch(error => {
        // Handle errors (e.g., network issues)
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
        document.getElementById('error-message').style.display = 'block';
    });
});
