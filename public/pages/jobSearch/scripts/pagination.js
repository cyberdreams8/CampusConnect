document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".search-form");
    const jobCardsContainer = document.querySelector(".job-cards-container");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Gather search parameters
        const formData = new FormData(form);
        const query = new URLSearchParams(formData).toString();

        try {
            // Fetch job data based on search criteria
            const response = await fetch(`/jobSearch?${query}`);
            const data = await response.json();

            // Clear previous job cards
            jobCardsContainer.innerHTML = "";

            // Display fetched job listings
            if (data.jobs && data.jobs.length > 0) {
                data.jobs.forEach((job) => {
                    const jobCard = document.createElement("div");
                    jobCard.className = "job-card";
                    jobCard.innerHTML = `
                        <h3>${job.JobTitle}</h3>
                        <p>${job.CompanyName} • ${job.JobType} • ${job.Location}</p>
                        <p>Package: ${job.Package}</p>
                        <p>Closing Deadline: ${job.ClosingDeadline}</p>
                    `;
                    jobCardsContainer.appendChild(jobCard);
                });
            } else {
                jobCardsContainer.innerHTML = "<p>No jobs found matching your criteria.</p>";
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    });
});
