let refreshInterval = null;

const windowConfigs = {
    'scroll-in-progress': { endpoint: '/api/schedule/in-progress' },
    'scroll-doing': { endpoint: '/api/schedule/doing' },
    'scroll-to-do': { endpoint: '/api/schedule/to-do' },
    'scroll-succeeded': { endpoint: '/api/schedule/succeeded' },
    'scroll-failed': { endpoint: '/api/schedule/failed' }
};

const windowStates = {};
const BATCH_SIZE = 15;
const PREFETCH_THRESHOLD = 5;
const SCROLL_THRESHOLD_PX = 60;

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

function normalizeScheduleContent(content) {
    return { items: content };
}

function formatItems(endpoint, items) {
    if (endpoint === '/api/schedule/in-progress') {
        return Array.isArray(items) ? items.map((name) => ({
            title: name,
            info: ''
        })) : [];
    }

    if (endpoint === '/api/schedule/failed' || endpoint === '/api/schedule/succeeded') {
        const list = Array.isArray(items) ? items : Object.values(items || {});
        return list.map((item) => {
            const titleParts = [item.runid, item.target, item.task].filter((value) => value !== null && value !== undefined && value !== '');
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
    }

    if (endpoint === '/api/schedule/doing' || endpoint === '/api/schedule/to-do' || endpoint === '/api/schedule/todo') {
        return Object.entries(items || {}).map(([title, info]) => ({
            title,
            info: Array.isArray(info) ? info.join(', ') : String(info ?? '')
        }));
    }

    if (Array.isArray(items)) {
        return items.map((item) => ({
            title: item.name || 'Task',
            info: item.info || ''
        }));
    }

    return [];
}

function renderItemsHtml(items) {
    return items.map((item) => `
        <div class="scroll-item">
            <strong>${item.title || 'Task'}</strong><br>
            <small>${item.info || ''}</small>
        </div>
    `).join('');
}

function renderBatch(state) {
    const container = document.getElementById(state.containerId);
    if (!container) return;
    if (state.rendered >= state.items.length) return;

    const nextItems = state.items.slice(state.rendered, state.rendered + BATCH_SIZE);
    state.rendered += nextItems.length;
    container.insertAdjacentHTML('beforeend', renderItemsHtml(nextItems));
}

function isNearBottom(container) {
    return container.scrollTop + container.clientHeight >= container.scrollHeight - SCROLL_THRESHOLD_PX;
}

async function loadNextPage(state) {
    if (state.fetching || state.done) return;
    state.fetching = true;

    const url = `${state.endpoint}?index=${state.offset}&limit=${BATCH_SIZE}`;
    const content = await apiFetch(url);
    if (content === null) {
        state.fetching = false;
        return;
    }

    const { items } = normalizeScheduleContent(content);
    const formatted = formatItems(state.endpoint, items);
    if (formatted.length === 0) {
        state.done = true;
    } else {
        state.items.push(...formatted);
        state.offset += formatted.length;
    }

    state.fetching = false;
}

async function ensureScrollable(state) {
    const container = document.getElementById(state.containerId);
    if (!container) return;

    let safety = 0;
    while (container.scrollHeight <= container.clientHeight && !state.done && safety < 5) {
        if (state.rendered < state.items.length) {
            renderBatch(state);
        } else {
            await loadNextPage(state);
            renderBatch(state);
        }
        safety += 1;
    }
}

async function handleScroll(state) {
    const container = document.getElementById(state.containerId);
    if (!container) return;

    if (isNearBottom(container)) {
        renderBatch(state);
        if (state.items.length - state.rendered <= PREFETCH_THRESHOLD) {
            await loadNextPage(state);
            if (isNearBottom(container)) {
                renderBatch(state);
            }
        }
    }
}

async function resetWindow(state) {
    const container = document.getElementById(state.containerId);
    if (!container) return;

    state.items = [];
    state.rendered = 0;
    state.offset = 0;
    state.done = false;
    state.fetching = false;
    container.innerHTML = '';

    await loadNextPage(state);
    renderBatch(state);
    await ensureScrollable(state);
}

async function reloadWindow(state) {
    const container = document.getElementById(state.containerId);
    if (!container) return;

    const targetOffset = state.offset;
    const targetRendered = state.rendered;
    const scrollTop = container.scrollTop;

    state.items = [];
    state.rendered = 0;
    state.offset = 0;
    state.done = false;
    state.fetching = false;
    container.innerHTML = '';

    while (state.offset < targetOffset && !state.done) {
        await loadNextPage(state);
        while (state.rendered < targetRendered && state.rendered < state.items.length) {
            renderBatch(state);
        }
    }

    while (state.rendered < targetRendered && state.rendered < state.items.length) {
        renderBatch(state);
    }

    if (targetRendered === 0 && targetOffset === 0) {
        await ensureScrollable(state);
    }

    container.scrollTop = scrollTop;
}

async function refreshAll() {
    await updateStats();
    for (const [id] of Object.entries(windowConfigs)) {
        const state = windowStates[id];
        if (!state || (state.offset === 0 && state.rendered === 0)) {
            await resetWindow(state);
        } else {
            await reloadWindow(state);
        }
    }
}

function setupRefresh() {
    const selector = document.getElementById('refresh-rate');
    
    const startTimer = () => {
        const rate = parseInt(selector.value);
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
    for (const [id, config] of Object.entries(windowConfigs)) {
        windowStates[id] = {
            containerId: id,
            endpoint: config.endpoint,
            items: [],
            rendered: 0,
            offset: 0,
            done: false,
            fetching: false
        };
        const container = document.getElementById(id);
        if (container) {
            container.addEventListener('scroll', () => handleScroll(windowStates[id]));
        }
    }
    refreshAll();
    setupRefresh();
});
