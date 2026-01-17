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
        document.getElementById('stat-busy').textContent = stats.workers.busy || -1;
        document.getElementById('stat-idle').textContent = stats.workers.idle || -1;
        document.getElementById('stat-total').textContent = stats.workers.busy + stats.workers.idle || -1;
        document.getElementById('stat-queued').textContent = stats.jobs.doing || -1;
        document.getElementById('stat-waiting').textContent = stats.jobs.todo || -1;
    }

    // Load Pipeline State
    const state = await apiFetch('/api/pipeline/state');
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
