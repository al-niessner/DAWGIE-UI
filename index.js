async function loadHomeContent() {
    const readmeElement = document.getElementById('readme-content');
    if (!readmeElement) return;

    // Load README.md
    try {
        const response = await fetch('/assets/custom/home.md');
        if (response.ok) {
            const text = await response.text();
            readmeElement.innerHTML = marked.parse(text);
        } else {
            readmeElement.innerHTML = "<p>/assets/custom/home.md not found.</p>";
        }
    } catch (e) {
        readmeElement.innerHTML = "<p>Error loading documentation.</p>";
    }

    // Load Statistics
    const stats = await apiFetch('/api/schedule/stats');
    if (stats) {
        document.getElementById('stat-busy').textContent = stats.busy_workers || -1;
        document.getElementById('stat-idle').textContent = stats.idle_workers || -1;
        document.getElementById('stat-total').textContent = stats.total_workers || -1;
        document.getElementById('stat-queued').textContent = stats.queued_jobs || -1;
        document.getElementById('stat-waiting').textContent = stats.waiting_tasks || -1;
    }

    // Load Pipeline State
    const state = await apiFetch('/api/state/pipeline');
    if (state) {
        document.getElementById('pipeline-state').textContent = state.status || "Unknown";
    }

    // Load Recent Logs
    const logs = await apiFetch('/api/logs/recent?limit=3');
    if (logs && Array.isArray(logs)) {
        const logsContainer = document.getElementById('recent-logs');
        logsContainer.innerHTML = logs.map(log => `<div class="log-item">${log}</div>`).join('');
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', loadHomeContent);
