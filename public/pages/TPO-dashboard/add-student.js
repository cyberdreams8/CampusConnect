// add-student.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addStudentForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const studentData = {
            Uid: document.getElementById('uid').value, // Add a UID field to your form
            First_Name: document.getElementById('firstName').value,
            Middle_Name: document.getElementById('middleName').value,
            Last_Name: document.getElementById('lastName').value,
            DOB: document.getElementById('dob').value,
            Gender: document.getElementById('gender').value,
            Branch: document.getElementById('branch').value,
            Graduation_Year: document.getElementById('graduationYear').value,
            CGPA: document.getElementById('cgpa').value,
            Email: document.getElementById('email').value,
            Contact_Number: document.getElementById('contactNumber').value
        };

        fetch('http://localhost:3000/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Student added successfully!');
            window.location.href = 'view-student.html'; // Redirect after adding
        })
        .catch(error => console.error('Error adding student:', error));
    });
});
