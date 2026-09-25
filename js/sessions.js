document.addEventListener("DOMContentLoaded", () => {
    initializeSessions();
});


function initializeSessions() {
    renderSessionsTable();
    setupSessionSearch();
    setupSessionFilters();
}


/* =================================
   RENDER SESSIONS
================================= */

function renderSessionsTable(filteredSessions = sessionsData) {
    const tableBody = document.querySelector("#sessions-table-body");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (filteredSessions.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-state">
                    No sessions found.
                </td>
            </tr>
        `;

        return;
    }

    filteredSessions.forEach(session => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>#${session.id}</strong>
            </td>

            <td>
                <span class="protocol-badge ${session.protocol.toLowerCase()}">
                    ${session.protocol}
                </span>
            </td>

            <td>${session.source}</td>

            <td>${session.destination}</td>

            <td>${session.tlsVersion}</td>

            <td>
                <span class="severity-badge ${session.risk.toLowerCase()}">
                    ${session.risk}
                </span>
            </td>

            <td>
                <span class="session-status ${session.status.toLowerCase()}">
                    ${session.status}
                </span>
            </td>

            <td>
                <button
                    class="table-action-btn"
                    data-session-id="${session.id}">
                    View
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    setupSessionViewButtons();
}


/* =================================
   SESSION DETAILS
================================= */

function setupSessionViewButtons() {
    const buttons = document.querySelectorAll(
        "[data-session-id]"
    );

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const sessionId = button.dataset.sessionId;

            openSessionDetails(sessionId);
        });
    });
}


function openSessionDetails(sessionId) {
    const session = sessionsData.find(
        item => item.id === sessionId
    );

    if (!session) return;

    const details = sessionDetails[sessionId];

    updateSessionOverview(session);

    if (details) {
        updateSessionTimeline(details);
        updateSessionTLS(details);
        updateSessionCertificate(details);
        updateSessionFindings(details);
    }

    openModal("session-details-modal");
}


/* =================================
   SESSION OVERVIEW
================================= */

function updateSessionOverview(session) {
    updateElement("detail-session-id", `#${session.id}`);
    updateElement("detail-protocol", session.protocol);
    updateElement("detail-source", session.source);
    updateElement("detail-destination", session.destination);
    updateElement("detail-start-time", session.startTime);
    updateElement("detail-duration", session.duration);
    updateElement("detail-risk", session.risk);
}


/* =================================
   TIMELINE
================================= */

function updateSessionTimeline(details) {
    const container = document.querySelector(
        "#session-timeline"
    );

    if (!container) return;

    container.innerHTML = "";

    details.timeline.forEach(event => {
        const item = document.createElement("div");

        item.className = "timeline-item";

        item.innerHTML = `
            <div class="timeline-time">
                ${event.time}
            </div>

            <div class="timeline-marker ${event.type}">
                <span></span>
            </div>

            <div class="timeline-content">
                ${event.event}
            </div>
        `;

        container.appendChild(item);
    });
}


/* =================================
   TLS DETAILS
================================= */

function updateSessionTLS(details) {
    const tls = details.tls;

    updateElement("detail-tls-version", tls.version);
    updateElement("detail-cipher", tls.cipher);
    updateElement("detail-key-exchange", tls.keyExchange);
    updateElement(
        "detail-forward-secrecy",
        tls.forwardSecrecy ? "YES" : "NO"
    );
    updateElement(
        "detail-handshake-status",
        tls.handshakeStatus
    );
    updateElement(
        "detail-server-name",
        tls.serverName
    );
}


/* =================================
   CERTIFICATE DETAILS
================================= */

function updateSessionCertificate(details) {
    const certificate = details.certificate;

    updateElement(
        "detail-cert-subject",
        certificate.subject
    );

    updateElement(
        "detail-cert-issuer",
        certificate.issuer
    );

    updateElement(
        "detail-cert-algorithm",
        certificate.algorithm
    );

    updateElement(
        "detail-cert-key-length",
        certificate.keyLength
    );

    updateElement(
        "detail-cert-signature",
        certificate.signatureAlgorithm
    );

    updateElement(
        "detail-cert-status",
        certificate.status
    );
}


/* =================================
   SESSION FINDINGS
================================= */

function updateSessionFindings(details) {
    const container = document.querySelector(
        "#session-findings"
    );

    if (!container) return;

    container.innerHTML = "";

    details.findings.forEach(finding => {
        const item = document.createElement("div");

        item.className = "session-finding";

        item.innerHTML = `
            <div>
                <span class="severity-badge ${finding.severity.toLowerCase()}">
                    ${finding.severity}
                </span>

                <strong>${finding.title}</strong>
            </div>

            <p>${finding.description}</p>
        `;

        container.appendChild(item);
    });
}


/* =================================
   SEARCH
================================= */

function setupSessionSearch() {
    const searchInput = document.querySelector(
        "#session-search"
    );

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        const searchTerm =
            searchInput.value.toLowerCase().trim();

        const filteredSessions = sessionsData.filter(session => {
            return (
                session.id.toLowerCase().includes(searchTerm) ||
                session.protocol.toLowerCase().includes(searchTerm) ||
                session.source.toLowerCase().includes(searchTerm) ||
                session.destination.toLowerCase().includes(searchTerm) ||
                session.tlsVersion.toLowerCase().includes(searchTerm) ||
                session.risk.toLowerCase().includes(searchTerm)
            );
        });

        renderSessionsTable(filteredSessions);
    });
}


/* =================================
   FILTERS
================================= */

function setupSessionFilters() {
    const filter = document.querySelector(
        "#session-risk-filter"
    );

    if (!filter) return;

    filter.addEventListener("change", () => {
        const selectedRisk = filter.value;

        if (selectedRisk === "ALL") {
            renderSessionsTable();
            return;
        }

        const filteredSessions = sessionsData.filter(
            session => session.risk === selectedRisk
        );

        renderSessionsTable(filteredSessions);
    });
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