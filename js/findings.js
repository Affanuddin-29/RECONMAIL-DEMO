document.addEventListener("DOMContentLoaded", () => {
    initializeFindings();
});


function initializeFindings() {
    renderFindings();
    setupFindingSearch();
    setupFindingFilters();
}


/* =================================
   RENDER FINDINGS
================================= */

function renderFindings(filteredFindings = findingsData) {
    const tableBody = document.querySelector("#findings-table-body");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (filteredFindings.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    No findings match your search.
                </td>
            </tr>
        `;

        return;
    }

    filteredFindings.forEach(finding => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${finding.id}</strong>
            </td>

            <td>
                <div class="finding-title">
                    ${finding.title}
                </div>

                <div class="finding-category">
                    ${finding.category}
                </div>
            </td>

            <td>
                <span class="severity-badge ${finding.severity.toLowerCase()}">
                    ${finding.severity}
                </span>
            </td>

            <td>${finding.session}</td>

            <td>${finding.protocol}</td>

            <td>
                <span class="finding-confidence">
                    ${finding.confidence}%
                </span>
            </td>

            <td>
                <button
                    class="table-action-btn finding-view-btn"
                    data-finding-id="${finding.id}">
                    View
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    setupFindingViewButtons();
}


/* =================================
   FINDING DETAILS
================================= */

function setupFindingViewButtons() {
    const buttons = document.querySelectorAll(
        ".finding-view-btn"
    );

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const findingId = button.dataset.findingId;

            openFindingDetails(findingId);
        });
    });
}


function openFindingDetails(findingId) {
    const finding = findingsData.find(
        item => item.id === findingId
    );

    if (!finding) return;

    updateElement(
        "finding-detail-id",
        finding.id
    );

    updateElement(
        "finding-detail-title",
        finding.title
    );

    updateElement(
        "finding-detail-category",
        finding.category
    );

    updateElement(
        "finding-detail-severity",
        finding.severity
    );

    updateElement(
        "finding-detail-session",
        finding.session
    );

    updateElement(
        "finding-detail-protocol",
        finding.protocol
    );

    updateElement(
        "finding-detail-source",
        finding.source
    );

    updateElement(
        "finding-detail-destination",
        finding.destination
    );

    updateElement(
        "finding-detail-time",
        finding.timestamp
    );

    updateElement(
        "finding-detail-description",
        finding.description
    );

    updateElement(
        "finding-detail-evidence",
        finding.evidence
    );

    updateElement(
        "finding-detail-impact",
        finding.impact
    );

    updateElement(
        "finding-detail-recommendation",
        finding.recommendation
    );

    updateElement(
        "finding-detail-confidence",
        `${finding.confidence}%`
    );

    openModal("finding-details-modal");
}


/* =================================
   SEARCH
================================= */

function setupFindingSearch() {
    const searchInput = document.querySelector(
        "#finding-search"
    );

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        applyFindingFilters();
    });
}


/* =================================
   FILTERS
================================= */

function setupFindingFilters() {
    const severityFilter = document.querySelector(
        "#finding-severity-filter"
    );

    const categoryFilter = document.querySelector(
        "#finding-category-filter"
    );

    if (severityFilter) {
        severityFilter.addEventListener("change", () => {
            applyFindingFilters();
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", () => {
            applyFindingFilters();
        });
    }
}


function applyFindingFilters() {
    const searchInput = document.querySelector(
        "#finding-search"
    );

    const severityFilter = document.querySelector(
        "#finding-severity-filter"
    );

    const categoryFilter = document.querySelector(
        "#finding-category-filter"
    );

    const searchTerm = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const selectedSeverity = severityFilter
        ? severityFilter.value
        : "ALL";

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "ALL";

    const filteredFindings = findingsData.filter(finding => {

        const matchesSearch =
            finding.id.toLowerCase().includes(searchTerm) ||
            finding.title.toLowerCase().includes(searchTerm) ||
            finding.category.toLowerCase().includes(searchTerm) ||
            finding.session.toLowerCase().includes(searchTerm) ||
            finding.protocol.toLowerCase().includes(searchTerm);

        const matchesSeverity =
            selectedSeverity === "ALL" ||
            finding.severity === selectedSeverity;

        const matchesCategory =
            selectedCategory === "ALL" ||
            finding.category === selectedCategory;

        return (
            matchesSearch &&
            matchesSeverity &&
            matchesCategory
        );
    });

    renderFindings(filteredFindings);
}


/* =================================
   SUMMARY
================================= */

function loadFindingSummary() {
    if (typeof findingsSummary === "undefined") {
        return;
    }

    updateElement(
        "findings-total",
        findingsSummary.total
    );

    updateElement(
        "findings-high",
        findingsSummary.severity.HIGH
    );

    updateElement(
        "findings-medium",
        findingsSummary.severity.MEDIUM
    );

    updateElement(
        "findings-low",
        findingsSummary.severity.LOW
    );
}


/* =================================
   UTILITY
================================= */

function updateElement(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}