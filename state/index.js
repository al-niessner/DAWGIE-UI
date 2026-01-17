let refreshInterval = null;

async function init() {
    const [pipeline, svgText, descriptions] = await Promise.all([
        apiFetch('/api/pipeline/state'),
        fetch('/assets/state.svg').then(r => r.text()),
        fetch('/assets/state.json').then(r => r.json())
    ]);

    renderTable(descriptions);
    renderSVG(svgText, pipeline);
    setupInteractions();
    setupRefresh();
}

/**
 * Updates only the visual state in the SVG based on new pipeline data.
 */
async function updatePipelineState() {
    const pipeline = await apiFetch('/api/state/pipeline');
    if (!pipeline) return;

    // Clear previous highlights
    document.querySelectorAll('#svg-display [id] path, #svg-display [id] circle, #svg-display [id] rect, #svg-display [id] polygon, #svg-display [id] ellipse')
        .forEach(shape => shape.style.fill = '');

    // Apply new status
    if (pipeline.name) {
        const activeNode = document.getElementById(pipeline.name);
        if (activeNode) {
            const shape = activeNode.querySelector('path, circle, rect, polygon, ellipse');
            if (pipeline.status === 'active') shape.style.fill = 'green';
            else if (pipeline.status === 'entering') shape.style.fill = 'url(#grad-entering)';
            else if (pipeline.status === 'exiting') shape.style.fill = 'url(#grad-exiting)';
        }
    }
}

function setupRefresh() {
    const selector = document.getElementById('refresh-rate');
    selector.addEventListener('change', () => {
        if (refreshInterval) clearInterval(refreshInterval);
        
        const rate = parseInt(selector.value);
        if (rate > 0) {
            refreshInterval = setInterval(updatePipelineState, rate);
        }
    });
}

function renderTable(descriptions) {
    const table = document.getElementById('description-table');
    if (!descriptions) return;

    table.innerHTML = Object.entries(descriptions).map(([state, desc]) => `
        <tr data-state="${state}" id="row-${state}">
            <td style="font-weight: bold; width: 30%">${state}</td>
            <td>${desc}</td>
        </tr>
    `).join('');
}

function renderSVG(svgText, pipeline) {
    const container = document.getElementById('svg-display');
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');

    // Inject gradients for partial fills
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
        <linearGradient id="grad-entering" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="50%" style="stop-color:green;stop-opacity:1" />
            <stop offset="50%" style="stop-color:transparent;stop-opacity:0" />
        </linearGradient>
        <linearGradient id="grad-exiting" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="50%" style="stop-color:transparent;stop-opacity:0" />
            <stop offset="50%" style="stop-color:green;stop-opacity:1" />
        </linearGradient>
    `;
    svg.insertBefore(defs, svg.firstChild);

    // Apply pipeline status
    if (pipeline && pipeline.name) {
        const activeNode = document.getElementById(pipeline.name);
        if (activeNode) {
            const shape = activeNode.querySelector('path, circle, rect, polygon, ellipse');
            if (pipeline.status === 'active') shape.style.fill = 'green';
            else if (pipeline.status === 'entering') shape.style.fill = 'url(#grad-entering)';
            else if (pipeline.status === 'exiting') shape.style.fill = 'url(#grad-exiting)';
        }
    }
}

function setupInteractions() {
    // 1. Image to Table interaction
    document.querySelectorAll('#svg-display [id]').forEach(node => {
        node.classList.add('svg-state-node');
        node.addEventListener('mouseenter', () => {
            const row = document.getElementById(`row-${node.id}`);
            if (row) row.classList.add('highlight');
        });
        node.addEventListener('mouseleave', () => {
            const row = document.getElementById(`row-${node.id}`);
            if (row) row.classList.remove('highlight');
        });
    });

    // 2. Table to Image interaction
    document.querySelectorAll('#description-table tr').forEach(row => {
        const stateId = row.getAttribute('data-state');
        row.addEventListener('mouseenter', () => {
            const svgNode = document.getElementById(stateId);
            if (svgNode) svgNode.classList.add('blink');
        });
        row.addEventListener('mouseleave', () => {
            const svgNode = document.getElementById(stateId);
            if (svgNode) svgNode.classList.remove('blink');
        });
    });
}

document.addEventListener('DOMContentLoaded', init);