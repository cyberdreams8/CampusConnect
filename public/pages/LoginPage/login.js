document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector('.form');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const role = document.getElementById('role').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, role })
            });

            const data = await response.json();

            if (data.success) {
                alert('Login successful!');
                // Redirect or handle successful login
            } else {
                alert(data.message); // Displays "Invalid username or password"
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while logging in.');
        }
    });
});
