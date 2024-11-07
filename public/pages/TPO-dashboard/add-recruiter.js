document.getElementById('addRecruiterForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const recruiterId = document.getElementById('recruiterId').value;

    const companyName = document.getElementById('companyName').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const companyEmail = document.getElementById('companyEmail').value;
    const companyLocation = document.getElementById('companyLocation').value;

    try {
        const response = await fetch('/api/recruiters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recruiterId,
                companyName,
                contactNumber,
                companyEmail,
                companyLocation,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Recruiter added successfully');
            window.location.href = 'view-recruiter.html'; // Redirect to the recruiter list page
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error adding the recruiter');
    }
});
