const certificatesData = [
    {
        id: "CERT-001",
        commonName: "mail.example.com",
        issuer: "Example CA",
        algorithm: "RSA",
        keyLength: "2048-bit",
        signatureAlgorithm: "SHA-256",
        validFrom: "18 Apr 2026",
        expiryDate: "18 Apr 2027",
        status: "VALID",
        daysRemaining: 205,
        sessions: 42
    },

    {
        id: "CERT-002",
        commonName: "mail-old.example.com",
        issuer: "Example Legacy CA",
        algorithm: "RSA",
        keyLength: "1024-bit",
        signatureAlgorithm: "SHA-1",
        validFrom: "01 Jun 2024",
        expiryDate: "07 Aug 2026",
        status: "EXPIRED",
        daysRemaining: -42,
        sessions: 12
    },

    {
        id: "CERT-003",
        commonName: "imap.example.com",
        issuer: "Example CA",
        algorithm: "RSA",
        keyLength: "2048-bit",
        signatureAlgorithm: "SHA-256",
        validFrom: "12 Jan 2026",
        expiryDate: "12 Jan 2027",
        status: "VALID",
        daysRemaining: 109,
        sessions: 31
    },

    {
        id: "CERT-004",
        commonName: "pop.example.com",
        issuer: "SecureMail CA",
        algorithm: "ECDSA",
        keyLength: "P-256",
        signatureAlgorithm: "SHA-256",
        validFrom: "03 Mar 2026",
        expiryDate: "03 Mar 2027",
        status: "VALID",
        daysRemaining: 158,
        sessions: 27
    },

    {
        id: "CERT-005",
        commonName: "smtp-backup.example.com",
        issuer: "Example CA",
        algorithm: "RSA",
        keyLength: "2048-bit",
        signatureAlgorithm: "SHA-256",
        validFrom: "21 Feb 2026",
        expiryDate: "21 Nov 2026",
        status: "EXPIRING_SOON",
        daysRemaining: 57,
        sessions: 18
    },

    {
        id: "CERT-006",
        commonName: "mail-gateway.example.com",
        issuer: "SecureMail CA",
        algorithm: "ECDSA",
        keyLength: "P-384",
        signatureAlgorithm: "SHA-384",
        validFrom: "10 May 2026",
        expiryDate: "10 May 2027",
        status: "VALID",
        daysRemaining: 227,
        sessions: 9
    }
];

const certificatesSummary = {
    total: 34,
    valid: 27,
    expired: 3,
    expiringSoon: 4,

    algorithms: {
        RSA: 26,
        ECDSA: 8
    },

    signatureAlgorithms: {
        "SHA-256": 29,
        "SHA-384": 4,
        "SHA-1": 1
    }
};

const certificatePriority = [
    {
        id: "CERT-002",
        commonName: "mail-old.example.com",
        issue: "Expired Certificate",
        severity: "HIGH",
        session: "#003"
    },

    {
        id: "CERT-005",
        commonName: "smtp-backup.example.com",
        issue: "Certificate Expiring Soon",
        severity: "MEDIUM",
        session: "#025"
    }
];