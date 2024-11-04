// home.js
document.addEventListener('DOMContentLoaded', function() {
    // Code for any interactive elements on the home page
    console.log("Welcome to the TPO Home Page");
    // Example: Adding event listeners for buttons or links
    const dashboardLink = document.querySelector('#dashboard');
    if (dashboardLink) {
        dashboardLink.addEventListener('click', function() {
            // Logic for dashboard navigation if needed
            console.log("Navigating to Dashboard");
        });
    }
});
