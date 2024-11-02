document.addEventListener("DOMContentLoaded", function () {
    const jobCardsContainer = document.getElementById('jobCardsContainer');
    const paginationControls = document.getElementById('paginationControls');
    const pageIndicator = document.getElementById('pageIndicator');
    let currentPage = 1;
    const jobsPerPage = 5;

    async function performSearch() {
        const jobTitle = document.getElementById('job-title').value;
        const experience = document.getElementById('experience').value;
        const jobType = document.getElementById('job-type').value;
        const cgpa = document.getElementById('cgpa').value;
        const companyName = document.getElementById('company').value;

        try {
            const response = await fetch(`/api/jobs?jobTitle=${encodeURIComponent(jobTitle)}&experience=${encodeURIComponent(experience)}&jobType=${encodeURIComponent(jobType)}&minCGPA=${encodeURIComponent(cgpa)}&company=${encodeURIComponent(companyName)}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const jobs = await response.json();
            displayJobs(jobs);
        } catch (error) {
            console.error('Error fetching job listings:', error);
            alert('An error occurred while fetching job listings.');
        }
    }

    function displayJobs(jobs) {
        jobCardsContainer.innerHTML = '';
        const totalPages = Math.ceil(jobs.length / jobsPerPage);
        const startIdx = (currentPage - 1) * jobsPerPage;
        const paginatedJobs = jobs.slice(startIdx, startIdx + jobsPerPage);

        paginatedJobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');
            jobCard.innerHTML = `
                <div class="job-card-header">
                    <h3>${job.Job_Title}</h3>
                    <p>${job.Company_Name} • ${job.JobType} • ${job.YoE} years of experience</p>
                </div>
                <div class="job-details">
                    <p>Base Package: $${job.Base_Package}K</p>
                    <div class="tags">
                        <span class="tag">CGPA: ${job.MinCGPA}</span>
                        <span class="tag">Closing by: ${job.Closing_Deadline}</span>
                    </div>
                </div>
            `;
            jobCardsContainer.appendChild(jobCard);
        });

        updatePaginationControls(totalPages);
    }

    function updatePaginationControls(totalPages) {
        paginationControls.style.display = totalPages > 1 ? 'flex' : 'none';
        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
        document.getElementById('prevButton').disabled = currentPage === 1;
        document.getElementById('nextButton').disabled = currentPage === totalPages;
    }

    document.getElementById('prevButton').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            performSearch();
        }
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        currentPage++;
        performSearch();
    });

    document.getElementById('jobSearchForm').addEventListener('submit', function (event) { // Use 'jobSearchForm' instead of 'search-form'
        event.preventDefault();
        currentPage = 1;
        performSearch();
    });
});
