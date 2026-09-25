const dashboardData = {
    securityPosture: {
        score: 78,
        status: "MODERATE"
    },

    metrics: {
        totalSessions: 128,
        totalFindings: 17,
        certificates: 34,
        tlsSessions: 94
    },

    protocols: {
        SMTP: 54,
        IMAP: 43,
        POP3: 31
    },

    tlsVersions: {
        "TLS 1.3": 62,
        "TLS 1.2": 31,
        "TLS 1.1": 7
    },

    riskDistribution: {
        HIGH: 4,
        MEDIUM: 7,
        LOW: 6
    },

    priorityFindings: [
        {
            rank: 1,
            title: "Expired X.509 Certificate",
            severity: "HIGH",
            session: "#003"
        },

        {
            rank: 2,
            title: "Deprecated TLS Configuration",
            severity: "HIGH",
            session: "#003"
        },

        {
            rank: 3,
            title: "Weak Cryptographic Configuration",
            severity: "MEDIUM",
            session: "#017"
        }
    ]
};