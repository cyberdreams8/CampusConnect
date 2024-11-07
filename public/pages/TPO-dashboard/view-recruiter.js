document.addEventListener('DOMContentLoaded', function() {
    fetchRecruiters();

    function fetchRecruiters() {
        fetch('http://localhost:3000/api/recruiters') // Adjust to match your backend API
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const tbody = document.getElementById('recruiterTableBody');
                tbody.innerHTML = ''; // Clear existing rows

                data.forEach(recruiter => {
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
                    tbody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching recruiters:', error));
    }

    window.deleteRecruiter = function(recruiter_id) {
        fetch(`http://localhost:3000/api/recruiters/${recruiter_id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete recruiter');
                }
                // Reload the recruiter list after deletion
                fetchRecruiters();
            })
            .catch(error => console.error('Error deleting recruiter:', error));
    }
});
