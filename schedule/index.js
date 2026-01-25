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
    const busy = (stats.workers.busy ?? -1);
    const idle = (stats.workers.idle ?? -1);
    document.getElementById('stat-busy').textContent = busy;
    document.getElementById('stat-idle').textContent = idle;
    document.getElementById('stat-total').textContent = (busy !== -1 && idle !== -1) ? busy + idle : -1;
}

function formatDuration(startIso, endIso) {
    const start = new Date(startIso);
    const end = new Date(endIso);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return '';
    }
    const durationMs = end.getTime() - start.getTime();
    if (durationMs < 0) {
        return '';
    }
    return `${(durationMs / 1000).toFixed(3)}s`;
}

function renderWindow(containerId, items, reverse = false, endpoint = '') {
    const container = document.getElementById(containerId);
    if (!container || !items) return;

    let displayItems = [];

    if (endpoint === '/api/schedule/in-progress') {
        displayItems = Array.isArray(items) ? items.map((name) => ({
            title: name,
            info: ''
        })) : [];
    } else if (endpoint === '/api/schedule/failed' || endpoint === '/api/schedule/succeeded') {
        const list = Array.isArray(items) ? items : Object.values(items);
        displayItems = list.map((item) => {
            const titleParts = [item.runid, item.target, item.task].filter(Boolean);
            const scheduled = item.timing?.scheduled ?? '';
            const started = item.timing?.started ?? '';
            const completed = item.timing?.completed ?? '';
            const duration = formatDuration(started, completed);
            const infoParts = [
                `<em>scheduled: ${scheduled}</em>`,
                `<em>starting: ${started}</em>`,
                `<em>completed: ${completed}</em>`
            ];
            if (duration) {
                infoParts.push(`<strong>duration: ${duration}</strong>`);
            }
            return {
                title: titleParts.join('.'),
                info: infoParts.join('<br>')
            };
        });
    } else if (endpoint === '/api/schedule/doing' || endpoint === '/api/schedule/to-do' || endpoint === '/api/schedule/todo') {
        displayItems = Object.entries(items).map(([title, info]) => ({
            title,
            info: Array.isArray(info) ? info.join(', ') : String(info ?? '')
        }));
    } else if (Array.isArray(items)) {
        displayItems = items.map((item) => ({
            title: item.name || 'Task',
            info: item.info || ''
        }));
    }

    if (reverse) {
        displayItems.reverse();
    }

    const initialItems = displayItems.slice(0, 15);

    container.innerHTML = initialItems.map((item) => `
        <div class="scroll-item">
            <strong>${item.title || 'Task'}</strong><br>
            <small>${item.info || ''}</small>
        </div>
    `).join('');
}


async function refreshAll() {
    await updateStats();
    for (const [id, config] of Object.entries(windowConfigs)) {
        const items = await apiFetch(config.endpoint);
        renderWindow(id, items, config.reverse, config.endpoint);
    }
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
