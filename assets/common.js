/**
 * Displays an error message in an overlay on the page.
 */
function showApiError(status, message) {
    const overlay = document.createElement('div');
    overlay.className = 'api-error-overlay';
    overlay.innerHTML = `
        <span class="close-btn" onclick="this.parentElement.remove()">&times;</span>
        <strong>API ${status.toUpperCase()}</strong><br>
        ${message}
    `;
    document.body.appendChild(overlay);

    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (overlay.parentElement) overlay.remove();
    }, 8000);
}

/**
 * Generic helper to fetch from /api and handle the standard JSON response format.
 */
async function apiFetch(url, options = {}) {
    try {
        console.log(`Fetching ${url}`);
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorMsg = `HTTP error! status: ${response.status}`;
            console.error(errorMsg);
            showApiError('error', errorMsg);
            return null;
        }

        const data = await response.json();

        if (data.status === 'success') {
            return data.content;
        } else {
            // Handle 'failure' or 'error' status from backend
            console.error(`API ${data.status}: ${data.message}`, data.content || "");
            showApiError(data.status, data.message);
            return null;
        }
    } catch (e) {
        const errorMsg = `Failed to connect to ${url}`;
        console.error(errorMsg, e);
        showApiError('connection error', errorMsg);
        return null;
    }
}

async function updateTitles() {
    let name = await apiFetch('/api/ae/name');
    
    if (!name) {
        name = "DAWGIE";
    }

    name = name.toUpperCase();

    // Update <title>
    if (document.title.includes("DAWGIE UI")) {
        document.title = document.title.replace("DAWGIE UI", name);
    }

    // Update <h1>
    const h1s = document.getElementsByTagName('h1');
    for (let h1 of h1s) {
        if (h1.textContent.includes("DAWGIE UI")) {
            h1.textContent = h1.textContent.replace("DAWGIE UI", name);
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', updateTitles);
