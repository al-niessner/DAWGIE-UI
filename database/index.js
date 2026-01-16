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
        const max = await apiFetch('/api/database/search/runid/max');
        body.innerHTML = `
            <p>Enter range (e.g., 1..10) or list (1,3,5). Max: ${max || 'unknown'}</p>
            <input type="text" id="modal-input" value="${currentQuery.runid === '-1' ? '' : currentQuery.runid}">
        `;
    } else {
        // Fetch valid options based on current filters
        const items = await apiFetch(`/api/database/search/${key}`, {
            method: 'POST',
            body: JSON.stringify(currentQuery)
        });

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
    const key = document.getElementById('modal-overlay').dataset.activeKey;
    let value = "*";

    if (key === 'runid') {
        value = document.getElementById('modal-input').value.trim() || "-1";
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
    const results = await apiFetch('/api/database/search', {
        method: 'POST',
        body: JSON.stringify(currentQuery)
    });

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