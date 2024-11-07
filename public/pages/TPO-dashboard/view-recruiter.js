document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/api/recruiters');  // Update to the correct path
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const recruiters = await response.json();
        
        const tableBody = document.getElementById('recruiterTableBody');
        tableBody.innerHTML = ''; // Clear existing table data

        recruiters.forEach(recruiter => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${recruiter.Recruiter_id}</td>
                <td>${recruiter.Company_Name}</td>
                <td>${recruiter.Contact_No}</td>
                <td>${recruiter.Company_Email}</td>
                <td>${recruiter.Company_Location}</td>
                <td>
                    <a href="update-recruiter.html?recruiter_id=${recruiter.Recruiter_id}" class="action-button">Edit</a>
                    <a href="#" class="action-button delete-button" onclick="deleteRecruiter('${recruiter.Recruiter_id}')">Delete</a>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching recruiters:', error);
    }
});
