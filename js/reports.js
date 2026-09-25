document.addEventListener("DOMContentLoaded", () => {
    initializeReports();
});


function initializeReports() {
    setupReportButtons();
    loadReportSummary();
}


/* =================================
   REPORT BUTTONS
================================= */

function setupReportButtons() {
    const jsonButton = document.querySelector(
        "#generate-json-report"
    );

    const pdfButton = document.querySelector(
        "#generate-pdf-report"
    );

    const htmlButton = document.querySelector(
        "#generate-html-report"
    );

    if (jsonButton) {
        jsonButton.addEventListener("click", () => {
            generateJSONReport();
        });
    }

    if (pdfButton) {
        pdfButton.addEventListener("click", () => {
            generatePDFReport();
        });
    }

    if (htmlButton) {
        htmlButton.addEventListener("click", () => {
            generateHTMLReport();
        });
    }
}


/* =================================
   REPORT SUMMARY
================================= */

function loadReportSummary() {
    if (typeof dashboardData === "undefined") {
        return;
    }

    updateElement(
        "report-session-count",
        dashboardData.metrics.totalSessions
    );

    updateElement(
        "report-finding-count",
        dashboardData.metrics.totalFindings
    );

    updateElement(
        "report-certificate-count",
        dashboardData.metrics.certificates
    );

    updateElement(
        "report-score",
        dashboardData.securityPosture.score
    );
}


/* =================================
   JSON REPORT
================================= */

function generateJSONReport() {
    const report = createForensicReport();

    const json = JSON.stringify(
        report,
        null,
        4
    );

    downloadFile(
        json,
        "RECONMAIL-forensic-report.json",
        "application/json"
    );

    showNotification(
        "JSON forensic report generated."
    );
}


/* =================================
   PDF REPORT
================================= */

function generatePDFReport() {
    showNotification(
        "PDF report generation is available in the prototype demo."
    );
}


/* =================================
   HTML REPORT
================================= */

function generateHTMLReport() {
    const report = createForensicReport();

    const html = `
<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <title>
        RECONMAIL Forensic Security Report
    </title>

    <style>

        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 40px auto;
            padding: 20px;
            color: #111827;
        }

        h1 {
            margin-bottom: 5px;
        }

        .subtitle {
            color: #6b7280;
            margin-bottom: 30px;
        }

        .summary {
            display: grid;
            grid-template-columns:
                repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }

        .card {
            border: 1px solid #e5e7eb;
            padding: 20px;
            border-radius: 10px;
        }

        .card strong {
            display: block;
            font-size: 24px;
            margin-top: 8px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            border-bottom: 1px solid #e5e7eb;
            padding: 12px;
            text-align: left;
        }

        th {
            background: #f9fafb;
        }

    </style>

</head>

<body>

    <h1>
        RECONMAIL
    </h1>

    <div class="subtitle">
        AI-Assisted Cryptographic Security Assessment
    </div>

    <div class="summary">

        <div class="card">
            Sessions
            <strong>
                ${report.summary.sessions}
            </strong>
        </div>

        <div class="card">
            Findings
            <strong>
                ${report.summary.findings}
            </strong>
        </div>

        <div class="card">
            Certificates
            <strong>
                ${report.summary.certificates}
            </strong>
        </div>

        <div class="card">
            Security Score
            <strong>
                ${report.summary.securityScore}/100
            </strong>
        </div>

    </div>

    <h2>
        Security Findings
    </h2>

    <table>

        <thead>

            <tr>
                <th>ID</th>
                <th>Finding</th>
                <th>Severity</th>
                <th>Session</th>
            </tr>

        </thead>

        <tbody>

            ${report.findings.map(finding => `

                <tr>

                    <td>
                        ${finding.id}
                    </td>

                    <td>
                        ${finding.title}
                    </td>

                    <td>
                        ${finding.severity}
                    </td>

                    <td>
                        ${finding.session}
                    </td>

                </tr>

            `).join("")}

        </tbody>

    </table>

</body>

</html>
`;

    downloadFile(
        html,
        "RECONMAIL-forensic-report.html",
        "text/html"
    );

    showNotification(
        "HTML forensic report generated."
    );
}


/* =================================
   CREATE REPORT OBJECT
================================= */

function createForensicReport() {

    const sessions =
        typeof sessionsData !== "undefined"
            ? sessionsData
            : [];

    const findings =
        typeof findingsData !== "undefined"
            ? findingsData
            : [];

    const certificates =
        typeof certificatesData !== "undefined"
            ? certificatesData
            : [];

    const score =
        typeof dashboardData !== "undefined"
            ? dashboardData.securityPosture.score
            : 0;

    return {

        reportMetadata: {
            product: "RECONMAIL",
            reportType: "Cryptographic Security Assessment",
            generatedAt:
                new Date().toISOString(),
            source:
                "demo_capture.pcap"
        },

        summary: {

            sessions: sessions.length,

            findings:
                typeof findingsSummary !== "undefined"
                    ? findingsSummary.total
                    : findings.length,

            certificates:
                typeof certificatesSummary !== "undefined"
                    ? certificatesSummary.total
                    : certificates.length,

            securityScore: score
        },

        findings: findings.map(finding => ({
            id: finding.id,
            title: finding.title,
            severity: finding.severity,
            category: finding.category,
            session: finding.session,
            protocol: finding.protocol,
            evidence: finding.evidence,
            recommendation:
                finding.recommendation
        })),

        certificates: certificates.map(
            certificate => ({
                id: certificate.id,
                commonName:
                    certificate.commonName,
                issuer:
                    certificate.issuer,
                algorithm:
                    certificate.algorithm,
                keyLength:
                    certificate.keyLength,
                signatureAlgorithm:
                    certificate.signatureAlgorithm,
                status:
                    certificate.status,
                expiryDate:
                    certificate.expiryDate
            })
        )
    };
}


/* =================================
   DOWNLOAD FILE
================================= */

function downloadFile(
    content,
    filename,
    type
) {
    const blob = new Blob(
        [content],
        { type }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}


/* =================================
   UTILITY
================================= */

function updateElement(id, value) {
    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}