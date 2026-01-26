let currentQuery = {
    runid: "-1",
    target: "*",
    task: "*",
    alg: "*",
    sv: "*"
};

let searchResults = [];
let sortStack = []; // Keeps track of multi-column sort: [{key: 'runid', desc: false}]

document.addEventListener('DOMContentLoaded', () => {
    const parts = document.querySelectorAll('.name-part');
    parts.forEach(part => part.addEventListener('click', (e) => openModal(e.target.id.replace('part-', ''))));

    document.getElementById('search-btn').addEventListener('click', performSearch);
    document.getElementById('modal-cancel').addEventListener('click', closeModal);
    document.getElementById('modal-apply').addEventListener('click', applyModal);
    
    // Header click for sorting
    document.querySelectorAll('#table-headers th').forEach(th => {
        th.addEventListener('click', () => handleSort(th.dataset.key));
    });
});

async function openModal(key) {
    const modal = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.innerText = `Update ${key.toUpperCase()}`;
    body.innerHTML = 'Loading...';
    modal.classList.remove('hidden');

    if (key === 'runid') {
        const max = await apiFetch('/api/database/runid/max');
        modal.dataset.maxRunid = max;
        body.innerHTML = `
            <strong>Max Run ID: ${max || 'unknown'}</strong>
            <p>Ranges are Python-like:
            <ul>
            <li>1:10 for 1-9 inclusive.</li>
            <li>:10 for 0-9 inclusive.</li>
            <li>1: for 1 to max run id inclusive.</li>
            <li>Do not negative indexes.</li>
            </ul>
            Mix number and ranges: 1,5,19:29,37. 
            </p>
            <input type="text" id="modal-input" value="${currentQuery.runid === '-1' ? '' : currentQuery.runid}">
        `;
    } else {
        // Fetch valid options based on current filters
        const params = new URLSearchParams({
            runids: currentQuery.runid,
            targets: currentQuery.target,
            tasks: currentQuery.task,
            algs: currentQuery.alg,
            svs: currentQuery.sv,
            vals: '*'
        });
        const items = await apiFetch(`/api/database/filter/${key}?${params.toString()}`);

        if (items) {
            let html = `<select id="modal-select" multiple style="width:100%; height:200px;">`;
            html += `<option value="*" ${currentQuery[key] === '*' ? 'selected' : ''}>* (Any)</option>`;
            items.forEach(item => {
                const selected = currentQuery[key].split(',').includes(item) ? 'selected' : '';
                html += `<option value="${item}" ${selected}>${item}</option>`;
            });
            html += `</select>`;
            body.innerHTML = html;
        }
    }
    
    modal.dataset.activeKey = key;
}

function applyModal() {
    const modal = document.getElementById('modal-overlay');
    const key = modal.dataset.activeKey;
    let value = "*";

    if (key === 'runid') {
        const input = document.getElementById('modal-input').value.trim();
        if (!input) {
            value = "-1";
        } else {
            const max = parseInt(modal.dataset.maxRunid) || Infinity;
            
            // Check for invalid characters
            if (/[^0-9,:]/.test(input)) {
                showApiError('validation error', 'Run ID list can only contain numbers, commas (,) and colons (:).');
                return;
            }

            const parts = input.split(',');
            const validated = [];
            
            for (let part of parts) {
                part = part.trim();
                if (!part) {
                    showApiError('validation error', 'Empty values are not allowed between commas.');
                    return;
                }
                
                if (part.includes(':')) {
                    const range = part.split(':');
                    if (range.length !== 2) {
                        showApiError('validation error', `Invalid range format: ${part}`);
                        return;
                    }
                    
                    const startStr = range[0].trim();
                    const endStr = range[1].trim();

                    const start = startStr === '' ? 0 : parseInt(startStr);
                    const end = endStr === '' ? max : parseInt(endStr);
                    
                    if (startStr !== '' && (isNaN(start) || start < 0 || start > max)) {
                        showApiError('validation error', `Range start ${startStr} must be between 0 and ${max}`);
                        return;
                    }
                    if (endStr !== '' && (isNaN(end) || end < 0 || end > max)) {
                        showApiError('validation error', `Range end ${endStr} must be between 0 and ${max}`);
                        return;
                    }
                    if (endStr !== '' && start > end) {
                        showApiError('validation error', `Range start ${start} cannot be greater than end ${end}: ${part}`);
                        return;
                    }
                    validated.push(part);
                } else {
                    const num = parseInt(part);
                    if (isNaN(num) || num < 0 || num > max) {
                        showApiError('validation error', `Run ID ${part} must be between 0 and ${max}`);
                        return;
                    }
                    validated.push(part);
                }
            }
            value = validated.join(',');
        }
    } else {
        const select = document.getElementById('modal-select');
        const selectedOptions = Array.from(select.selectedOptions).map(o => o.value);
        if (selectedOptions.includes('*') || selectedOptions.length === 0) {
            value = "*";
        } else {
            value = selectedOptions.join(',');
        }
    }

    currentQuery[key] = value;
    document.getElementById(`part-${key}`).innerText = value;
    closeModal();
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

async function performSearch() {
    const params = new URLSearchParams({
        runids: currentQuery.runid,
        targets: currentQuery.target,
        tasks: currentQuery.task,
        algs: currentQuery.alg,
        svs: currentQuery.sv
    });
    const results = await apiFetch(`/api/database/search?${params.toString()}`);

    if (results) {
        searchResults = results; // Expecting array of objects {runid, target, task, alg, sv}
        renderTable();
    }
}

function handleSort(key) {
    // Basic multi-sort logic: move key to front of stack
    const existing = sortStack.find(s => s.key === key);
    if (existing) {
        existing.desc = !existing.desc;
        sortStack = [existing, ...sortStack.filter(s => s.key !== key)];
    } else {
        sortStack = [{key, desc: false}, ...sortStack];
    }
    
    sortData();
    renderTable();
}

function sortData() {
    searchResults.sort((a, b) => {
        for (let sort of sortStack) {
            let valA = a[sort.key];
            let valB = b[sort.key];
            
            if (sort.key === 'runid') {
                valA = parseInt(valA);
                valB = parseInt(valB);
            }

            if (valA < valB) return sort.desc ? 1 : -1;
            if (valA > valB) return sort.desc ? -1 : 1;
        }
        return 0;
    });
}

function renderTable() {
    const body = document.getElementById('results-body');
    body.innerHTML = searchResults.map(row => `
        <tr>
            <td>${row.runid}</td>
            <td>${row.target}</td>
            <td>${row.task}</td>
            <td>${row.alg}</td>
            <td>${row.sv}</td>
        </tr>
    `).join('');
}