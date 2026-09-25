document.addEventListener("DOMContentLoaded", () => {
    initializeDashboard();
});


function initializeDashboard() {
    loadDashboardMetrics();
    loadSecurityPosture();
    loadTLSDistribution();
    loadPriorityFindings();
}


/* ================================
   DASHBOARD METRICS
================================ */

function loadDashboardMetrics() {
    if (typeof dashboardData === "undefined") return;

    const metrics = dashboardData.metrics;

    updateElement("total-sessions", metrics.totalSessions);
    updateElement("total-findings", metrics.totalFindings);
    updateElement("total-certificates", metrics.certificates);
    updateElement("total-tls-sessions", metrics.tlsSessions);
}


/* ================================
   SECURITY POSTURE
================================ */

function loadSecurityPosture() {
    if (typeof dashboardData === "undefined") return;

    const posture = dashboardData.securityPosture;

    updateElement("posture-score", posture.score);
    updateElement("posture-status", posture.status);

    const scoreCircle = document.querySelector(".posture-progress");

    if (scoreCircle) {
        const circumference = 2 * Math.PI * 52;
        const progress =
            circumference - (posture.score / 100) * circumference;

        scoreCircle.style.strokeDasharray = circumference;
        scoreCircle.style.strokeDashoffset = progress;
    }
}


/* ================================
   TLS DISTRIBUTION
================================ */

function loadTLSDistribution() {
    if (typeof dashboardData === "undefined") return;

    const tlsData = dashboardData.tlsVersions;

    const tls13 = document.querySelector("[data-tls='tls13']");
    const tls12 = document.querySelector("[data-tls='tls12']");
    const tls11 = document.querySelector("[data-tls='tls11']");

    if (tls13) {
        tls13.textContent = `${tlsData["TLS 1.3"]}%`;
    }

    if (tls12) {
        tls12.textContent = `${tlsData["TLS 1.2"]}%`;
    }

    if (tls11) {
        tls11.textContent = `${tlsData["TLS 1.1"]}%`;
    }
}


/* ================================
   PRIORITY FINDINGS
================================ */

function loadPriorityFindings() {
    if (typeof dashboardData === "undefined") return;

    const findings = dashboardData.priorityFindings;

    const container = document.querySelector(
        ".priority-findings-list"
    );

    if (!container) return;

    container.innerHTML = "";

    findings.forEach(finding => {
        const item = document.createElement("div");

        item.className = "priority-finding";

        item.innerHTML = `
            <div class="priority-rank">
                ${String(finding.rank).padStart(2, "0")}
            </div>

            <div class="priority-content">
                <div class="priority-title">
                    ${finding.title}
                </div>

                <div class="priority-session">
                    Session ${finding.session}
                </div>
            </div>

            <span class="severity-badge ${finding.severity.toLowerCase()}">
                ${finding.severity}
            </span>
        `;

        container.appendChild(item);
    });
}


/* ================================
   UTILITY
================================ */

function updateElement(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}