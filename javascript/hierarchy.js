let currentView = 'alg';
let refreshInterval = null;

async function loadHierarchy() {
    const activeBtn = document.querySelector('.fidelity-btn.active');
    const url = activeBtn.dataset.svg;
    
    try {
        const response = await fetch(url);
        const svgText = await response.text();
        const container = document.getElementById('svg-container');
        
        // Clear and Inject
        container.innerHTML = svgText;

        const svgElement = container.querySelector('svg');
        if (svgElement) {
            // Remove hardcoded attributes that prevent scaling
            svgElement.removeAttribute('width');
            svgElement.removeAttribute('height');
            setupZoomAndPan(svgElement, container);
            updateNodeData(svgElement);
        }
    } catch (e) {
        console.error("Failed to load SVG", e);
    }
}

function setupZoomAndPan(svg, container) {
    let isPanning = false;
    let startPoint = { x: 0, y: 0 };
    
    // Parse initial viewBox or create one if missing
    let viewBox = svg.viewBox.baseVal;
    if (viewBox.width === 0) {
        const bBox = svg.getBBox();
        svg.setAttribute('viewBox', `${bBox.x} ${bBox.y} ${bBox.width} ${bBox.height}`);
    }

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const scale = e.deltaY > 0 ? 1.1 : 0.9;
        
        // Zoom relative to the center of the current view
        const dw = viewBox.width * (scale - 1);
        const dh = viewBox.height * (scale - 1);
        
        viewBox.x -= dw / 2;
        viewBox.y -= dh / 2;
        viewBox.width *= scale;
        viewBox.height *= scale;
    }, { passive: false });

    container.addEventListener('mousedown', (e) => {
        isPanning = true;
        startPoint = { x: e.clientX, y: e.clientY };
        container.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        
        // Calculate movement relative to SVG coordinate system
        const dx = (e.clientX - startPoint.x) * (viewBox.width / container.clientWidth);
        const dy = (e.clientY - startPoint.y) * (viewBox.height / container.clientHeight);
        
        viewBox.x -= dx;
        viewBox.y -= dy;
        
        startPoint = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
        isPanning = false;
        container.style.cursor = 'grab';
    });
}

async function updateNodeData(svgElement) {
    if (!svgElement) return;

    // 1. Identify nodes (assuming they have a specific class or are 'text' elements)
    const nodes = Array.from(svgElement.querySelectorAll('.node, text'))
                       .map(el => el.textContent.trim())
                       .filter((v, i, a) => v && a.indexOf(v) === i)
                       .sort();

    const tbody = document.querySelector('#node-data-table tbody');
    tbody.innerHTML = ''; // Clear table

    for (const nodeName of nodes) {
        const data = await apiFetch('/api/hierarchy/statistics', {
            method: 'POST',
            body: JSON.stringify({ node: nodeName })
        });

        const status = data?.status || 'unknown';
        
        // 2. Update Table
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${nodeName}</td>
            <td>${status}</td>
            <td>${data?.run_id || '-'}</td>
            <td>${data?.date || '-'}</td>
        `;

        // 3. Update SVG Colors
        applyColorToSvgNode(svgElement, nodeName, status);
    }
}

function applyColorToSvgNode(svg, name, status) {
    // Search for the element containing the node text
    const textNodes = Array.from(svg.querySelectorAll('text'));
    const targetText = textNodes.find(el => el.textContent.trim() === name);
    
    if (!targetText) return;

    // Usually, the shape (rect/circle) is a sibling or parent of the text in Graphviz SVGs
    const shape = targetText.parentElement.querySelector('polygon, ellipse, rect, circle');
    if (!shape) return;

    // Reset styles
    shape.style.fill = '';
    shape.classList.remove('status-succeeded', 'status-failed', 'status-scheduled');

    switch(status.toLowerCase()) {
        case 'succeeded': shape.classList.add('status-succeeded'); break;
        case 'failed': shape.classList.add('status-failed'); break;
        case 'scheduled': shape.classList.add('status-scheduled'); break;
        case 'both':
            // Create a unique linear gradient if it doesn't exist
            if (!svg.querySelector('#grad-both')) {
                const defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS("http://www.w3.org/2000/svg", "defs"), svg.firstChild);
                defs.innerHTML += `
                    <linearGradient id="grad-both" x1="1" y1="0" x2="0" y2="0">
                        <stop offset="0%" stop-color="#90ee90" />
                        <stop offset="100%" stop-color="#ffcccb" />
                    </linearGradient>`;
            }
            shape.style.fill = 'url(#grad-both)';
            break;
    }
}

// Controls & Refresh Logic
document.querySelectorAll('.fidelity-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.fidelity-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        loadHierarchy();
    });
});

function setupRefresh() {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        if (document.getElementById('refresh-toggle').checked) {
            const svg = document.querySelector('#svg-container svg');
            updateNodeData(svg);
        }
    }, 30000);
}

document.getElementById('refresh-now-btn').addEventListener('click', () => {
    const svg = document.querySelector('#svg-container svg');
    updateNodeData(svg);
});

document.addEventListener('DOMContentLoaded', () => {
    loadHierarchy();
    setupRefresh();
});