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
                <div class="flex items-center space-x-4 job-card-header">
                    <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.87 0-7 3.13-7 7v1h14v-1c0-3.87-3.13-7-7-7z"/>
                        </svg>
                    </div>
                    <div>
                        <h3>${job.Job_Title}</h3>
                        <p>${job.Company_Name} • ${job.JobType} • ${job.YoE} YoE</p>
                    </div>
                </div>
                <p class="mt-2">Base Package: ${job.Base_Package} LPA</p>
                <div class="tags mt-2">
                    <span class="tag">Min CGPA: ${job.MinCGPA}</span>
                    <span class="tag">Closing by: ${formatDate(job.Closing_Deadline)}</span>
                </div>
            `;
            jobCardsContainer.appendChild(jobCard);
        });

        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
        paginationControls.style.display = totalPages > 1 ? 'flex' : 'none';
    }

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    }

    document.getElementById("jobSearchForm").addEventListener("submit", function (e) {
        e.preventDefault();
        currentPage = 1;
        performSearch();
    });

    document.getElementById("prevButton").addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            performSearch();
        }
    });

    document.getElementById("nextButton").addEventListener("click", function () {
        currentPage++;
        performSearch();
    });
});
