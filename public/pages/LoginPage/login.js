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
        credentials: 'same-origin',  // Important! This ensures the session cookie is sent
    });

    const data = await response.json();

    if (response.ok) {
        alert('Login successful!');
        
        // Redirect based on the user role using the redirectUrl from the response
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        } else {
            alert('No redirect URL found.'); // Optional: handle cases where no URL is provided
        }
    } else {
        alert(data.message || 'Login failed');
    }
});
