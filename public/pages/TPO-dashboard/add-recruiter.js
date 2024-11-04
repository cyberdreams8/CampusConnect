// add-recruiter.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addRecruiterForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const recruiterData = {
            Recruiter_id: document.getElementById('recruiterId').value, // Add a recruiter ID field
            Company_Name: document.getElementById('companyName').value,
            Contact_No: document.getElementById('contactNumber').value,
            Company_Email: document.getElementById('companyEmail').value,
            Company_Location: document.getElementById('companyLocation').value
        };

        fetch('http://localhost:3000/recruiters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recruiterData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Recruiter added successfully!');
            window.location.href = 'view-recruiter.html'; // Redirect after adding
        })
        .catch(error => console.error('Error adding recruiter:', error));
    });
});
