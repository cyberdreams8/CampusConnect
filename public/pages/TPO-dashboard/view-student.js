document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/api/students');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const students = await response.json();
        
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = ''; // Clear existing table data

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.Uid}</td>
                <td>${student.First_Name} ${student.Middle_Name} ${student.Last_Name}</td>
                <td>${student.Branch}</td>
                <td>${student.Graduation_Year}</td>
                <td>${student.CGPA}</td>
                <td>${student.Email}</td>
                <td>
                    <a href="update-student.html?uid=${student.Uid}" class="action-button">Edit</a>
                    <a href="#" class="action-button delete-button">Delete</a>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching students:', error);
    }
});



// Example delete function (you will need to implement this on the backend)
async function deleteStudent(uid) {
    // Implement deletion logic here
}
