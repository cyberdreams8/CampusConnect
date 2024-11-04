// view-recruiters.js
document.addEventListener('DOMContentLoaded', function() {
    fetchRecruiters();

    function fetchRecruiters() {
        fetch('http://localhost:3000/recruiters') // Update with the correct API endpoint
            .then(response => response.json())
            .then(data => {
                const tbody = document.querySelector('tbody');
                tbody.innerHTML = ''; // Clear existing rows
                data.forEach(recruiter => {
                    const row = `<tr>
                        <td>${recruiter.Recruiter_id}</td>
                        <td>${recruiter.Company_Name}</td>
                        <td>${recruiter.Contact_No}</td>
                        <td>${recruiter.Company_Email}</td>
                        <td>${recruiter.Company_Location}</td>
                        <td>
                            <a href="update-recruiter.html?recruiter_id=${recruiter.Recruiter_id}" class="action-button">Edit</a>
                            <a href="#" class="action-button delete-button" onclick="deleteRecruiter('${recruiter.Recruiter_id}')">Delete</a>
                        </td>
                    </tr>`;
                    tbody.innerHTML += row;
                });
            })
            .catch(error => console.error('Error fetching recruiters:', error));
    }

    window.deleteRecruiter = function(recruiter_id) {
        fetch(`http://localhost:3000/recruiters/${recruiter_id}`, { method: 'DELETE' })
            .then(() => {
                // Reload the recruiter list after deletion
                fetchRecruiters();
            })
            .catch(error => console.error('Error deleting recruiter:', error));
    }
});
