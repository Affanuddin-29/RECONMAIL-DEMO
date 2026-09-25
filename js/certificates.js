document.addEventListener("DOMContentLoaded", () => {
    initializeCertificates();
});


function initializeCertificates() {
    renderCertificates();
    loadCertificateSummary();
    setupCertificateSearch();
    setupCertificateFilter();
}


/* =================================
   RENDER CERTIFICATES
================================= */

function renderCertificates(filteredCertificates = certificatesData) {
    const tableBody = document.querySelector(
        "#certificates-table-body"
    );

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (filteredCertificates.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-state">
                    No certificates found.
                </td>
            </tr>
        `;

        return;
    }

    filteredCertificates.forEach(certificate => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${certificate.id}</strong>
            </td>

            <td>
                <div class="certificate-name">
                    ${certificate.commonName}
                </div>
            </td>

            <td>
                ${certificate.issuer}
            </td>

            <td>
                ${certificate.algorithm}
            </td>

            <td>
                ${certificate.keyLength}
            </td>

            <td>
                ${certificate.signatureAlgorithm}
            </td>

            <td>
                <span class="certificate-status ${getCertificateStatusClass(certificate.status)}">
                    ${formatCertificateStatus(certificate.status)}
                </span>
            </td>

            <td>
                <button
                    class="table-action-btn certificate-view-btn"
                    data-certificate-id="${certificate.id}">
                    View
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    setupCertificateViewButtons();
}


/* =================================
   CERTIFICATE DETAILS
================================= */

function setupCertificateViewButtons() {
    const buttons = document.querySelectorAll(
        ".certificate-view-btn"
    );

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const certificateId =
                button.dataset.certificateId;

            openCertificateDetails(certificateId);
        });
    });
}


function openCertificateDetails(certificateId) {
    const certificate = certificatesData.find(
        item => item.id === certificateId
    );

    if (!certificate) return;

    updateElement(
        "certificate-detail-id",
        certificate.id
    );

    updateElement(
        "certificate-detail-name",
        certificate.commonName
    );

    updateElement(
        "certificate-detail-issuer",
        certificate.issuer
    );

    updateElement(
        "certificate-detail-algorithm",
        certificate.algorithm
    );

    updateElement(
        "certificate-detail-key-length",
        certificate.keyLength
    );

    updateElement(
        "certificate-detail-signature",
        certificate.signatureAlgorithm
    );

    updateElement(
        "certificate-detail-valid-from",
        certificate.validFrom
    );

    updateElement(
        "certificate-detail-expiry",
        certificate.expiryDate
    );

    updateElement(
        "certificate-detail-sessions",
        certificate.sessions
    );

    updateElement(
        "certificate-detail-days",
        formatDaysRemaining(
            certificate.daysRemaining
        )
    );

    updateElement(
        "certificate-detail-status",
        formatCertificateStatus(
            certificate.status
        )
    );

    openModal("certificate-details-modal");
}


/* =================================
   SUMMARY
================================= */

function loadCertificateSummary() {
    if (typeof certificatesSummary === "undefined") {
        return;
    }

    updateElement(
        "certificates-total",
        certificatesSummary.total
    );

    updateElement(
        "certificates-valid",
        certificatesSummary.valid
    );

    updateElement(
        "certificates-expired",
        certificatesSummary.expired
    );

    updateElement(
        "certificates-expiring",
        certificatesSummary.expiringSoon
    );
}


/* =================================
   SEARCH
================================= */

function setupCertificateSearch() {
    const searchInput = document.querySelector(
        "#certificate-search"
    );

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        applyCertificateFilters();
    });
}


/* =================================
   FILTER
================================= */

function setupCertificateFilter() {
    const filter = document.querySelector(
        "#certificate-status-filter"
    );

    if (!filter) return;

    filter.addEventListener("change", () => {
        applyCertificateFilters();
    });
}


function applyCertificateFilters() {
    const searchInput = document.querySelector(
        "#certificate-search"
    );

    const filter = document.querySelector(
        "#certificate-status-filter"
    );

    const searchTerm = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const selectedStatus = filter
        ? filter.value
        : "ALL";

    const filteredCertificates =
        certificatesData.filter(certificate => {

            const matchesSearch =
                certificate.id
                    .toLowerCase()
                    .includes(searchTerm) ||

                certificate.commonName
                    .toLowerCase()
                    .includes(searchTerm) ||

                certificate.issuer
                    .toLowerCase()
                    .includes(searchTerm) ||

                certificate.algorithm
                    .toLowerCase()
                    .includes(searchTerm);

            const matchesStatus =
                selectedStatus === "ALL" ||
                certificate.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });

    renderCertificates(filteredCertificates);
}


/* =================================
   STATUS HELPERS
================================= */

function getCertificateStatusClass(status) {
    switch (status) {
        case "VALID":
            return "valid";

        case "EXPIRED":
            return "expired";

        case "EXPIRING_SOON":
            return "expiring";

        default:
            return "";
    }
}


function formatCertificateStatus(status) {
    switch (status) {
        case "VALID":
            return "VALID";

        case "EXPIRED":
            return "EXPIRED";

        case "EXPIRING_SOON":
            return "EXPIRING SOON";

        default:
            return status;
    }
}


function formatDaysRemaining(days) {
    if (days < 0) {
        return `${Math.abs(days)} days ago`;
    }

    return `${days} days remaining`;
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