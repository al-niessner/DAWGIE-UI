/* ... existing code ... */
.fidelity-btn.active {
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    font-weight: bold;
}

.df_model-display {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 20px;
}

.df_model-container {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    width: 100%;
}

.df_model-svg-content {
    flex: 0 0 65%;
    height: 600px; /* Give it a fixed height for the viewport */
    border: 1px solid #ddd;
    background: #fff;
    padding: 0;
    overflow: hidden;
    cursor: grab;
    position: relative;
    user-select: none; /* Prevent text selection while panning */
}

.df_model-svg-content svg {
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: all; /* Ensure events reach the SVG */
}

/* Optional: Add a subtle instruction overlay */
.df_model-svg-content::after {
    content: "Scroll to zoom, Drag to pan";
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: 0.7rem;
    color: #999;
    pointer-events: none;
}

.df_model-table-sidebar {
    flex: 0 0 33%; /* Constrains Table to 33% of the page width */
    max-height: 80vh;
    overflow-y: auto;
    background: #f9f9f9;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

#node-data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
}

#node-data-table th {
    text-align: left;
    border-bottom: 2px solid #eee;
    padding: 8px 4px;
    position: sticky;
    top: 0;
    background: #f9f9f9;
}

#node-data-table td {
    padding: 6px 4px;
    border-bottom: 1px solid #eee;
    word-break: break-all;
}

/* SVG Status Colors */
.status-succeeded { fill: #90ee90 !important; }
.status-failed { fill: #ffcccb !important; }
.status-scheduled { fill: #ffffe0 !important; }
/* ... existing code ... */