document.getElementById('search-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data including the company name
    const companyName = document.getElementById('company').value;
    const jobTitle = document.getElementById('job-title').value;
    const experience = document.getElementById('experience').value;
    const jobType = document.getElementById('job-type').value;
    const cgpa = document.getElementById('cgpa').value;

    try {
        // Build the query string including all parameters
        const response = await fetch(`/api/jobs?jobTitle=${encodeURIComponent(jobTitle)}&experience=${encodeURIComponent(experience)}&jobType=${encodeURIComponent(jobType)}&minCGPA=${encodeURIComponent(cgpa)}&company=${encodeURIComponent(companyName)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jobListings = await response.json();

        // Clear previous listings
        const listingsContainer = document.querySelector('.job-listing-section'); // Ensure this selects the correct container
        listingsContainer.innerHTML = ''; // Clear existing listings

        // Dynamically create job cards based on the search results
        jobListings.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');
            jobCard.innerHTML = `
                <div class="job-card-header">
                    <div class="logo-placeholder">
                        <img src="https://via.placeholder.com/64" alt="Company Logo">
                    </div>
                    <div>
                        <h3>${job.Job_Title}</h3>
                        <p>${job.Company_Name} • ${job.JobType} • ${job.Location}</p>
                    </div>
                </div>
                <div class="job-details">
                    <p>Required Skills: ${job.Required_Skills}</p>
                    <div class="tags">
                        <span class="tag">Experience: ${job.YoE} years</span>
                        <span class="tag">CGPA: ${job.MinCGPA}</span>
                    </div>
                </div>
            `;
            listingsContainer.appendChild(jobCard);
        });
    } catch (error) {
        console.error('An error occurred while fetching job listings:', error);
    }
});
