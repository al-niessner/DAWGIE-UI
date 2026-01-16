/**
 * Fetches a markdown file and renders it into the specified element.
 * @param {string} url - Path to the markdown file.
 * @param {string} elementId - ID of the container element.
 */
async function loadMarkdown(url, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const text = await response.text();
            // Assumes marked.js is included in the page
            container.innerHTML = marked.parse(text);
        } else {
            container.innerHTML = `<p>Error: ${url} not found.</p>`;
        }
    } catch (e) {
        console.error(`Failed to load markdown from ${url}:`, e);
        container.innerHTML = "<p>Error loading custom.</p>";
    }
}
