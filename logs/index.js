let refreshTimer = 5;
let timerInterval;

async function fetchLogs() {
    const levels = Array.from(document.querySelectorAll('.log-level:checked')).map(cb => cb.value);
    const count = document.getElementById('log-count').value;

    // Construct query parameters
    const params = new URLSearchParams({
        levels: levels.join(','),
        limit: count
    });

    const logs = await apiFetch(`/api/logs/recent?${params.toString()}`);

    if (logs && Array.isArray(logs)) {
        const display = document.getElementById('log-display');
        display.innerHTML = logs.map(log => `<div class="log-entry">${log}</div>`).join('');
    }

    resetTimer();
}

function resetTimer() {
    refreshTimer = 5;
    document.getElementById('timer-val').textContent = refreshTimer;
}

function startCountdown() {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        refreshTimer--;
        if (refreshTimer <= 0) {
            fetchLogs();
        } else {
            document.getElementById('timer-val').textContent = refreshTimer;
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial fetch
    fetchLogs();
    startCountdown();

    // Listen for control changes
    document.querySelectorAll('.log-level').forEach(el => {
        el.addEventListener('change', fetchLogs);
    });

    document.getElementById('log-count').addEventListener('change', fetchLogs);
});