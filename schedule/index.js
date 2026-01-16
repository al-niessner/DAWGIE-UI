let refreshInterval = null;

const windowConfigs = {
    'scroll-in-progress': { endpoint: '/api/schedule/in-progress', reverse: false },
    'scroll-doing': { endpoint: '/api/schedule/doing', reverse: false },
    'scroll-to-do': { endpoint: '/api/schedule/to-do', reverse: false },
    'scroll-succeeded': { endpoint: '/api/schedule/succeeded', reverse: true },
    'scroll-failed': { endpoint: '/api/schedule/failed', reverse: true }
};

async function updateStats() {
    const stats = await apiFetch('/api/schedule/stats');
    if (stats) {
        document.getElementById('stat-busy').textContent = stats.busy_workers || 0;
        document.getElementById('stat-idle').textContent = stats.idle_workers || 0;
        document.getElementById('stat-total').textContent = stats.total_workers || 0;
    }
}

/**
 * Renders the first 15 items in a scroll window.
 */
function renderWindow(containerId, items, reverse = false) {
    const container = document.getElementById(containerId);
    if (!container || !items) return;

    let displayItems = [...items];
    if (reverse) {
        displayItems.reverse();
    }

    // Initialize with the first 15 items
    const initialItems = displayItems.slice(0, 15);
    
    container.innerHTML = initialItems.map(item => `
        <div class="scroll-item">
            <strong>${item.name || 'Task'}</strong><br>
            <small>${item.info || ''}</small>
        </div>
    `).join('');
}


async function refreshAll() {
    await updateStats();
    for (const [id, config] of Object.entries(windowConfigs)) {}
}

function setupRefresh() {
    const selector = document.getElementById('refresh-rate');
    
    const startTimer = () => {
        const rate = parseInt(selector.value) * 1000;
        if (rate > 0) {
            refreshInterval = setInterval(refreshAll, rate);
        }
    };

    selector.addEventListener('change', () => {
        if (refreshInterval) clearInterval(refreshInterval);
        startTimer();
    });

    startTimer(); // Start an initial timer
}

document.addEventListener('DOMContentLoaded', () => {
    refreshAll();
    setupRefresh();
});
