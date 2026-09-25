document.addEventListener("DOMContentLoaded", () => {
    initializeTLSAnalysis();
});


function initializeTLSAnalysis() {
    loadTLSVersions();
    loadCipherSuites();
    loadKeyExchange();
    loadForwardSecrecy();
}


/* =================================
   TLS VERSION DISTRIBUTION
================================= */

function loadTLSVersions() {
    if (typeof dashboardData === "undefined") return;

    const tlsVersions = dashboardData.tlsVersions;

    updateElement(
        "tls13-value",
        `${tlsVersions["TLS 1.3"]}%`
    );

    updateElement(
        "tls12-value",
        `${tlsVersions["TLS 1.2"]}%`
    );

    updateElement(
        "tls11-value",
        `${tlsVersions["TLS 1.1"]}%`
    );

    updateProgressBar(
        "tls13-bar",
        tlsVersions["TLS 1.3"]
    );

    updateProgressBar(
        "tls12-bar",
        tlsVersions["TLS 1.2"]
    );

    updateProgressBar(
        "tls11-bar",
        tlsVersions["TLS 1.1"]
    );
}


/* =================================
   CIPHER SUITES
================================= */

function loadCipherSuites() {
    const cipherData = {
        "AES-256-GCM": 51,
        "AES-128-GCM": 29,
        "CHACHA20-POLY1305": 14,
        "Legacy / Weak": 4
    };

    const container = document.querySelector(
        "#cipher-suite-list"
    );

    if (!container) return;

    container.innerHTML = "";

    Object.entries(cipherData).forEach(
        ([cipher, count]) => {

            const percentage = Math.round(
                (count / 98) * 100
            );

            const item = document.createElement("div");

            item.className = "tls-stat-row";

            item.innerHTML = `
                <div class="tls-stat-info">
                    <span>${cipher}</span>
                    <strong>${count}</strong>
                </div>

                <div class="tls-progress">
                    <div
                        class="tls-progress-fill"
                        style="width: ${percentage}%">
                    </div>
                </div>
            `;

            container.appendChild(item);
        }
    );
}


/* =================================
   KEY EXCHANGE
================================= */

function loadKeyExchange() {
    const keyExchangeData = {
        ECDHE: 82,
        DHE: 11,
        RSA: 7
    };

    const container = document.querySelector(
        "#key-exchange-list"
    );

    if (!container) return;

    container.innerHTML = "";

    Object.entries(keyExchangeData).forEach(
        ([method, percentage]) => {

            const item = document.createElement("div");

            item.className = "tls-stat-row";

            item.innerHTML = `
                <div class="tls-stat-info">
                    <span>${method}</span>
                    <strong>${percentage}%</strong>
                </div>

                <div class="tls-progress">
                    <div
                        class="tls-progress-fill"
                        style="width: ${percentage}%">
                    </div>
                </div>
            `;

            container.appendChild(item);
        }
    );
}


/* =================================
   FORWARD SECRECY
================================= */

function loadForwardSecrecy() {
    const forwardSecrecyData = {
        established: 91,
        notEstablished: 3,
        unknown: 2
    };

    updateElement(
        "fs-established",
        forwardSecrecyData.established
    );

    updateElement(
        "fs-not-established",
        forwardSecrecyData.notEstablished
    );

    updateElement(
        "fs-unknown",
        forwardSecrecyData.unknown
    );

    const total =
        forwardSecrecyData.established +
        forwardSecrecyData.notEstablished +
        forwardSecrecyData.unknown;

    const percentage = Math.round(
        (forwardSecrecyData.established / total) * 100
    );

    updateElement(
        "fs-percentage",
        `${percentage}%`
    );
}


/* =================================
   PROGRESS BAR
================================= */

function updateProgressBar(id, value) {
    const element = document.getElementById(id);

    if (!element) return;

    element.style.width = `${value}%`;
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