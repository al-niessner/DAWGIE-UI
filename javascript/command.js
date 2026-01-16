let allTargets = [];

async function init() {
    // Fetch initial data
    const [currentRev, tasks, targets] = await Promise.all([
        apiFetch('/api/rev/current'),
        apiFetch('/api/database/search/tasks'),
        apiFetch('/api/database/search/targets')
    ]);

    if (currentRev) document.getElementById('current-rev-val').textContent = currentRev;
    
    if (tasks) {
        const select = document.getElementById('tasks-select');
        select.innerHTML = tasks.map(t => `<option value="${t}">${t}</option>`).join('');
    }

    if (targets) {
        allTargets = targets;
        filterTargets();
    }

    setupEventListeners();
}

function filterTargets() {
    const include = document.getElementById('target-include').value.toLowerCase();
    const exclude = document.getElementById('target-exclude').value.toLowerCase();
    const select = document.getElementById('targets-select');

    // Simple glob-like filtering (using includes as a proxy for simple globs)
    const filtered = allTargets.filter(t => {
        const name = t.toLowerCase();
        const matchesInclude = !include || name.includes(include.replace(/\*/g, ''));
        const matchesExclude = exclude && name.includes(exclude.replace(/\*/g, ''));
        return matchesInclude && !matchesExclude;
    });

    select.innerHTML = filtered.map(t => `<option value="${t}">${t}</option>`).join('');
    document.getElementById('targets-count').textContent = `${filtered.length} shown of ${allTargets.length}`;
}

function setupEventListeners() {
    const changesetInput = document.getElementById('changeset');
    const revSubmit = document.getElementById('rev-submit');
    const tasksSelect = document.getElementById('tasks-select');
    const targetsSelect = document.getElementById('targets-select');
    const runBtn = document.getElementById('run-btn');

    // Revision Logic
    changesetInput.addEventListener('input', () => {
        const isHex = /^[0-9a-fA-F]+$/.test(changesetInput.value);
        revSubmit.disabled = !isHex;
    });

    revSubmit.addEventListener('click', async () => {
        const data = {
            changeset: changesetInput.value,
            directive: document.getElementById('reload-directive').value
        };
        const result = await apiFetch('/api/rev/submit', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        if (result) alert('Revision submitted successfully');
    });

    // Run Command Logic
    const updateRunButton = () => {
        const tasksSelected = tasksSelect.selectedOptions.length > 0;
        const targetsSelected = targetsSelect.selectedOptions.length > 0;
        runBtn.disabled = !(tasksSelected && targetsSelected);
    };

    tasksSelect.addEventListener('change', updateRunButton);
    targetsSelect.addEventListener('change', updateRunButton);

    runBtn.addEventListener('click', async () => {
        const data = {
            tasks: Array.from(tasksSelect.selectedOptions).map(o => o.value),
            targets: Array.from(targetsSelect.selectedOptions).map(o => o.value)
        };
        const result = await apiFetch('/api/cmd/run', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        if (result) alert('Command executed successfully');
    });

    // Filtering
    document.getElementById('target-include').addEventListener('input', filterTargets);
    document.getElementById('target-exclude').addEventListener('input', filterTargets);
}

document.addEventListener('DOMContentLoaded', init);
