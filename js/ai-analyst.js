document.addEventListener("DOMContentLoaded", () => {
    initializeAIAnalyst();
});


function initializeAIAnalyst() {
    loadAIOverview();
    loadTopObservations();
    loadRecommendations();
}


/* =================================
   AI OVERVIEW
================================= */

function loadAIOverview() {
    const totalFindings =
        typeof findingsSummary !== "undefined"
            ? findingsSummary.total
            : 17;

    const totalSessions =
        typeof dashboardData !== "undefined"
            ? dashboardData.metrics.totalSessions
            : 128;

    updateElement(
        "ai-total-findings",
        totalFindings
    );

    updateElement(
        "ai-total-sessions",
        totalSessions
    );
}


/* =================================
   TOP OBSERVATIONS
================================= */

function loadTopObservations() {
    const observations = [
        {
            severity: "HIGH",
            title: "Expired X.509 Certificate",
            session: "#003",
            explanation:
                "The captured SMTP session presented a certificate that had already expired."
        },

        {
            severity: "HIGH",
            title: "Deprecated TLS Configuration",
            session: "#003",
            explanation:
                "TLS 1.1 was observed during the reconstructed session and should be reviewed against the security baseline."
        },

        {
            severity: "MEDIUM",
            title: "Weak Cryptographic Configuration",
            session: "#017",
            explanation:
                "A legacy public-key or signature configuration was observed and should be reviewed."
        }
    ];

    const container = document.querySelector(
        "#ai-observations"
    );

    if (!container) return;

    container.innerHTML = "";

    observations.forEach(observation => {
        const item = document.createElement("div");

        item.className = "ai-observation";

        item.innerHTML = `
            <div class="ai-observation-header">

                <span class="severity-badge ${observation.severity.toLowerCase()}">
                    ${observation.severity}
                </span>

                <strong>
                    ${observation.title}
                </strong>

            </div>

            <div class="ai-observation-session">
                Session ${observation.session}
            </div>

            <p>
                ${observation.explanation}
            </p>
        `;

        container.appendChild(item);
    });
}


/* =================================
   RECOMMENDATIONS
================================= */

function loadRecommendations() {
    const recommendations = [
        {
            priority: "01",
            title: "Replace expired certificates",
            description:
                "Renew certificates before expiration and introduce automated certificate lifecycle monitoring."
        },

        {
            priority: "02",
            title: "Disable deprecated TLS versions",
            description:
                "Review server configuration and restrict protocol negotiation to approved TLS versions."
        },

        {
            priority: "03",
            title: "Review legacy cryptographic settings",
            description:
                "Replace weak public-key and signature configurations with stronger modern alternatives."
        }
    ];

    const container = document.querySelector(
        "#ai-recommendations"
    );

    if (!container) return;

    container.innerHTML = "";

    recommendations.forEach(recommendation => {
        const item = document.createElement("div");

        item.className = "ai-recommendation";

        item.innerHTML = `
            <div class="ai-recommendation-number">
                ${recommendation.priority}
            </div>

            <div class="ai-recommendation-content">

                <strong>
                    ${recommendation.title}
                </strong>

                <p>
                    ${recommendation.description}
                </p>

            </div>
        `;

        container.appendChild(item);
    });
}


/* =================================
   AI EXPLANATION
================================= */

function generateAIExplanation(findingId) {
    if (
        typeof findingsData === "undefined"
    ) {
        return;
    }

    const finding = findingsData.find(
        item => item.id === findingId
    );

    if (!finding) return;

    const explanation = `
        RECONMAIL identified this finding from
        observed session and cryptographic evidence.

        Finding:
        ${finding.title}

        Severity:
        ${finding.severity}

        Evidence:
        ${finding.evidence}

        Recommended action:
        ${finding.recommendation}
    `;

    updateElement(
        "ai-explanation",
        explanation.trim()
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