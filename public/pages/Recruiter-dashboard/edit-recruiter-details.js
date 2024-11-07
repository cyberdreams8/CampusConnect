document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch recruiter profile with session credentials
        const response = await fetch('/api/recruiter/profile', {
            method: 'GET',
            credentials: 'include' // Important for session-based authentication
        });

        console.log("Response from server:", response);

        const data = await response.json();
        console.log("Data received:", data);

        // Check if the response was successful and data was returned
        if (response.ok && data.success) {
            // Populate form fields with recruiter data
            if (document.getElementById('recruiterId')) {
                document.getElementById('recruiterId').value = data.recruiter.Recruiter_id;
            }
            if (document.getElementById('companyName')) {
                document.getElementById('companyName').value = data.recruiter.Company_Name;
            }
            if (document.getElementById('contactNo')) {
                document.getElementById('contactNo').value = data.recruiter.Contact_No;
            }
            if (document.getElementById('companyMail')) {
                // Check if Company_Email exists, otherwise set it to an empty string
                document.getElementById('companyMail').value = data.recruiter.Company_Email || '';
            }
            if (document.getElementById('companyLocation')) {
                document.getElementById('companyLocation').value = data.recruiter.Company_Location;
            }

            // Attach event listener for the update button if it exists
            const updateButton = document.querySelector('button[type="submit"]');
            if (updateButton) {
                updateButton.addEventListener('click', async function(e) {
                    e.preventDefault();

                    // Gather updated form values
                    const recruiterId = document.getElementById('recruiterId').value;
                    const companyName = document.getElementById('companyName').value;
                    const contactNo = document.getElementById('contactNo').value;
                    const companyMail = document.getElementById('companyMail').value;
                    const companyLocation = document.getElementById('companyLocation').value;

                    // Validate form inputs (can be customized to your needs)
                    if (!companyMail || !companyName || !contactNo || !companyLocation) {
                        alert('All fields are required!');
                        return;
                    }

                    // Send updated data to backend
                    const updateResponse = await fetch('/api/recruiter/profile', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ recruiterId, companyName, contactNo, companyMail, companyLocation }),
                        credentials: 'include'  // Important for session-based authentication
                    });

                    const updateData = await updateResponse.json();

                    if (updateResponse.ok) {
                        alert('Recruiter details updated successfully!');
                        // Optionally, you can reload the page or redirect the user
                        // window.location.reload();
                    } else {
                        alert(updateData.message || 'Failed to update recruiter details.');
                    }
                });
            } else {
                console.error("Update button not found.");
            }
        } else if (response.status === 401) {
            console.error("Unauthorized access - redirecting to login page.");
            alert('Session expired. Please log in again.');
            window.location.href = 'login.html';
        } else {
            console.error("Error:", data.message || "Failed to load recruiter details.");
            alert(data.message || "Failed to load recruiter details");
        }
    } catch (error) {
        console.error('Error fetching recruiter details:', error);
        alert('An error occurred while fetching recruiter details.');
    }
});
