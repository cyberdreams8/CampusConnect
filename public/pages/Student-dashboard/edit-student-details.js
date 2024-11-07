document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch student profile with session credentials
        const response = await fetch('/api/students/profile', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Populate form fields with student data
            document.getElementById('uid').value = data.student.Uid;
            document.getElementById('firstName').value = data.student.First_Name;
            document.getElementById('middleName').value = data.student.Middle_Name || '';
            document.getElementById('lastName').value = data.student.Last_Name;
            document.getElementById('dob').value = data.student.DOB;
            document.getElementById('gender').value = data.student.Gender;
            document.getElementById('branch').value = data.student.Branch;
            document.getElementById('graduationYear').value = data.student.Graduation_Year;
            document.getElementById('cgpa').value = data.student.CGPA;
            document.getElementById('email').value = data.student.Email;
            document.getElementById('contactNumber').value = data.student.Contact_Number;
            document.getElementById('jobSearchKeywords').value = data.student.Job_Search_Keywords || '';
            document.getElementById('aboutMe').value = data.student.About_Me || '';

            // Event listener for updating the profile
            document.querySelector('button[type="submit"]').addEventListener('click', async (e) => {
                e.preventDefault();

                const updatedData = {
                    uid: document.getElementById('uid').value,
                    firstName: document.getElementById('firstName').value,
                    middleName: document.getElementById('middleName').value,
                    lastName: document.getElementById('lastName').value,
                    dob: document.getElementById('dob').value,
                    gender: document.getElementById('gender').value,
                    branch: document.getElementById('branch').value,
                    graduationYear: document.getElementById('graduationYear').value,
                    cgpa: document.getElementById('cgpa').value,
                    email: document.getElementById('email').value,
                    contactNumber: document.getElementById('contactNumber').value,
                    jobSearchKeywords: document.getElementById('jobSearchKeywords').value,
                    aboutMe: document.getElementById('aboutMe').value
                };

                const updateResponse = await fetch('/api/students/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData),
                    credentials: 'include'
                });

                const updateData = await updateResponse.json();

                if (updateResponse.ok) {
                    alert('Profile updated successfully!');
                } else {
                    alert(updateData.message || 'Failed to update profile.');
                }
            });
        } else if (response.status === 401) {
            alert('Session expired. Please log in again.');
            window.location.href = 'login.html';
        } else {
            alert(data.message || 'Failed to load student details');
        }
    } catch (error) {
        alert('An error occurred while fetching student details.');
    }
});

document.getElementById('logout').addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    window.location.href = 'login.html';
});
