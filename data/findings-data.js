const findingsData = [
    {
        id: "F-001",
        title: "Expired X.509 Certificate",
        severity: "HIGH",
        category: "Certificate Security",
        session: "#003",
        protocol: "SMTP",
        source: "10.0.0.18",
        destination: "10.0.0.20",
        timestamp: "10:42:04",
        status: "OPEN",
        description:
            "The TLS certificate presented by the mail server has expired.",
        evidence:
            "Certificate for mail-old.example.com expired 42 days before the captured session.",
        impact:
            "An expired certificate can undermine trust in the TLS connection.",
        recommendation:
            "Replace the expired certificate and establish automated certificate expiry monitoring.",
        confidence: 99
    },

    {
        id: "F-002",
        title: "Deprecated TLS Configuration",
        severity: "HIGH",
        category: "TLS Security",
        session: "#003",
        protocol: "SMTP",
        source: "10.0.0.18",
        destination: "10.0.0.20",
        timestamp: "10:42:04",
        status: "OPEN",
        description:
            "The session negotiated an outdated TLS protocol version.",
        evidence:
            "Observed TLS version: TLS 1.1.",
        impact:
            "Deprecated TLS versions increase the cryptographic security risk of the communication channel.",
        recommendation:
            "Disable deprecated TLS versions and require TLS 1.2 or TLS 1.3 where supported.",
        confidence: 98
    },

    {
        id: "F-003",
        title: "Weak Public-Key Configuration",
        severity: "MEDIUM",
        category: "Cryptography",
        session: "#017",
        protocol: "IMAP",
        source: "10.0.0.24",
        destination: "10.0.0.21",
        timestamp: "10:51:17",
        status: "OPEN",
        description:
            "The observed certificate uses a weak public-key configuration.",
        evidence:
            "Certificate public key length observed as 1024-bit RSA.",
        impact:
            "Older and shorter public keys provide a weaker cryptographic security margin.",
        recommendation:
            "Migrate to RSA 2048-bit or an appropriate modern elliptic-curve configuration.",
        confidence: 96
    },

    {
        id: "F-004",
        title: "Legacy Signature Algorithm",
        severity: "MEDIUM",
        category: "Certificate Security",
        session: "#017",
        protocol: "IMAP",
        source: "10.0.0.24",
        destination: "10.0.0.21",
        timestamp: "10:51:18",
        status: "OPEN",
        description:
            "The certificate uses a legacy digital signature algorithm.",
        evidence:
            "Observed certificate signature algorithm: SHA-1.",
        impact:
            "Legacy signature algorithms provide weaker security guarantees than modern alternatives.",
        recommendation:
            "Replace certificates using legacy signature algorithms with certificates using modern algorithms such as SHA-256.",
        confidence: 97
    },

    {
        id: "F-005",
        title: "Forward Secrecy Not Established",
        severity: "MEDIUM",
        category: "TLS Security",
        session: "#010",
        protocol: "SMTP",
        source: "10.0.0.23",
        destination: "10.0.0.20",
        timestamp: "10:46:02",
        status: "OPEN",
        description:
            "The observed TLS session did not establish forward secrecy.",
        evidence:
            "Key exchange observed: RSA.",
        impact:
            "Without forward secrecy, compromise of long-term private-key material can increase risk to previously captured encrypted traffic.",
        recommendation:
            "Prefer ephemeral key exchange mechanisms such as ECDHE or DHE when supported.",
        confidence: 94
    },

    {
        id: "F-006",
        title: "Legacy TLS Cipher Detected",
        severity: "LOW",
        category: "Cryptography",
        session: "#021",
        protocol: "POP3",
        source: "10.0.0.26",
        destination: "10.0.0.22",
        timestamp: "10:54:32",
        status: "OPEN",
        description:
            "A legacy cryptographic configuration was observed during TLS negotiation.",
        evidence:
            "Cipher configuration matched a legacy cryptographic rule.",
        impact:
            "Legacy configurations may provide a smaller security margin.",
        recommendation:
            "Review the server cipher configuration and remove unnecessary legacy algorithms.",
        confidence: 91
    },

    {
        id: "F-007",
        title: "Certificate Expiry Approaching",
        severity: "LOW",
        category: "Certificate Security",
        session: "#025",
        protocol: "SMTP",
        source: "10.0.0.29",
        destination: "10.0.0.20",
        timestamp: "11:02:14",
        status: "OPEN",
        description:
            "The certificate is valid but approaching its expiration date.",
        evidence:
            "Certificate expiration threshold was reached during analysis.",
        impact:
            "Failure to renew the certificate could cause future TLS validation failures.",
        recommendation:
            "Schedule certificate renewal and enable automated expiry monitoring.",
        confidence: 89
    }
];

const findingsSummary = {
    total: 17,

    severity: {
        HIGH: 4,
        MEDIUM: 7,
        LOW: 6
    },

    categories: {
        "Certificate Security": 6,
        "TLS Security": 7,
        "Cryptography": 4
    },

    status: {
        OPEN: 17,
        RESOLVED: 0
    }
};

const priorityFindings = [
    {
        rank: 1,
        id: "F-001",
        title: "Expired X.509 Certificate",
        severity: "HIGH",
        session: "#003"
    },

    {
        rank: 2,
        id: "F-002",
        title: "Deprecated TLS Configuration",
        severity: "HIGH",
        session: "#003"
    },

    {
        rank: 3,
        id: "F-003",
        title: "Weak Public-Key Configuration",
        severity: "MEDIUM",
        session: "#017"
    }
];