document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Login successful!');
        // Redirect or perform further actions based on user role
    } else {
        alert(data.message || 'Login failed');
    }
});
