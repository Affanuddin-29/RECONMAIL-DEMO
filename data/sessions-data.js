const sessionsData = [
    {
        id: "001",
        protocol: "SMTP",
        source: "10.0.0.12",
        destination: "10.0.0.20",
        startTime: "10:41:12",
        duration: "18.4s",
        tlsVersion: "TLS 1.3",
        cipher: "AES_256_GCM",
        keyExchange: "ECDHE",
        certificate: "Valid",
        forwardSecrecy: true,
        risk: "LOW",
        status: "SECURE"
    },

    {
        id: "002",
        protocol: "IMAP",
        source: "10.0.0.15",
        destination: "10.0.0.21",
        startTime: "10:41:47",
        duration: "32.7s",
        tlsVersion: "TLS 1.2",
        cipher: "AES_128_GCM",
        keyExchange: "ECDHE",
        certificate: "Valid",
        forwardSecrecy: true,
        risk: "MEDIUM",
        status: "REVIEW"
    },

    {
        id: "003",
        protocol: "SMTP",
        source: "10.0.0.18",
        destination: "10.0.0.20",
        startTime: "10:42:01",
        duration: "41.2s",
        tlsVersion: "TLS 1.1",
        cipher: "AES_256_GCM",
        keyExchange: "ECDHE",
        certificate: "Expired",
        forwardSecrecy: true,
        risk: "HIGH",
        status: "RISK"
    },

    {
        id: "004",
        protocol: "POP3",
        source: "10.0.0.14",
        destination: "10.0.0.22",
        startTime: "10:42:38",
        duration: "21.5s",
        tlsVersion: "TLS 1.3",
        cipher: "CHACHA20_POLY1305",
        keyExchange: "ECDHE",
        certificate: "Valid",
        forwardSecrecy: true,
        risk: "LOW",
        status: "SECURE"
    },

    {
        id: "005",
        protocol: "SMTP",
        source: "10.0.0.19",
        destination: "10.0.0.20",
        startTime: "10:43:04",
        duration: "27.9s",
        tlsVersion: "TLS 1.2",
        cipher: "AES_256_GCM",
        keyExchange: "ECDHE",
        certificate: "Valid",
        forwardSecrecy: true,
        risk: "LOW",
        status: "SECURE"
    },

    {
        id: "006",
        protocol: "IMAP",
        source: "10.0.0.16",
        destination: "10.0.0.21",
        startTime: "10:43:42",
        duration: "35.1s",
        tlsVersion: "TLS 1.2",
        cipher: "AES_128_GCM",
        keyExchange: "DHE",
        certificate: "Valid",
        forwardSecrecy: true,
        risk: "MEDIUM",
        status: "REVIEW"
    },

    {
        id: "007",
        protocol: "SMTP",
        source: "10.0.0.13",
        destination: "10.0.0.20",
        startTime: "10:44:19",
        duration: "16.8s",
        tlsVersion: "TLS 1.3",
        cipher: "AES_256_GCM",
        keyExchange: "ECDHE",
        certificate: "Valid",
        forwardSecrecy: true,
        risk: "LOW",
        status: "SECURE"
    },

    {
        id: "008",
        protocol: "POP3",
        source: "10.0.0.17",
        destination: "10.0.0.22",
        startTime: "10:44:51",
        duration: "24.6s",
        tlsVersion: "TLS 1.2",
        cipher: "AES_128_GCM",
        keyExchange: "ECDHE",
        certificate: "Valid",
        forwardSecrecy: true,
        risk: "LOW",
        status: "SECURE"
    },

    {
        id: "009",
        protocol: "IMAP",
        source: "10.0.0.11",
        destination: "10.0.0.21",
        startTime: "10:45:26",
        duration: "29.3s",
        tlsVersion: "TLS 1.3",
        cipher: "CHACHA20_POLY1305",
        keyExchange: "ECDHE",
        certificate: "Valid",
        forwardSecrecy: true,
        risk: "LOW",
        status: "SECURE"
    },

    {
        id: "010",
        protocol: "SMTP",
        source: "10.0.0.23",
        destination: "10.0.0.20",
        startTime: "10:46:02",
        duration: "31.8s",
        tlsVersion: "TLS 1.2",
        cipher: "AES_256_GCM",
        keyExchange: "RSA",
        certificate: "Valid",
        forwardSecrecy: false,
        risk: "MEDIUM",
        status: "REVIEW"
    },

    {
        id: "011",
        protocol: "IMAP",
        source: "10.0.0.25",
        destination: "10.0.0.21",
        startTime: "10:46:47",
        duration: "22.4s",
        tlsVersion: "TLS 1.3",
        cipher: "AES_128_GCM",
        keyExchange: "ECDHE",
        certificate: "Valid",
        forwardSecrecy: true,
        risk: "LOW",
        status: "SECURE"
    },

    {
        id: "012",
        protocol: "SMTP",
        source: "10.0.0.27",
        destination: "10.0.0.20",
        startTime: "10:47:13",
        duration: "19.7s",
        tlsVersion: "TLS 1.3",
        cipher: "AES_256_GCM",
        keyExchange: "ECDHE",
        certificate: "Valid",
        forwardSecrecy: true,
        risk: "LOW",
        status: "SECURE"
    }
];

const sessionDetails = {
    "003": {
        id: "003",

        timeline: [
            {
                time: "10:42:01",
                event: "TCP connection established",
                type: "network"
            },
            {
                time: "10:42:02",
                event: "SMTP protocol detected",
                type: "protocol"
            },
            {
                time: "10:42:03",
                event: "EHLO command detected",
                type: "smtp"
            },
            {
                time: "10:42:03",
                event: "STARTTLS negotiation initiated",
                type: "tls"
            },
            {
                time: "10:42:04",
                event: "TLS handshake detected",
                type: "tls"
            },
            {
                time: "10:42:04",
                event: "X.509 certificate received",
                type: "certificate"
            },
            {
                time: "10:42:05",
                event: "Encrypted SMTP session established",
                type: "secure"
            }
        ],

        tls: {
            version: "TLS 1.1",
            cipher: "AES_256_GCM",
            keyExchange: "ECDHE",
            forwardSecrecy: true,
            handshakeStatus: "Completed",
            serverName: "mail.example.com"
        },

        certificate: {
            subject: "CN=mail-old.example.com",
            issuer: "Example Legacy CA",
            algorithm: "RSA",
            keyLength: "1024-bit",
            signatureAlgorithm: "SHA-1",
            status: "EXPIRED",
            expiredDays: 42
        },

        findings: [
            {
                severity: "HIGH",
                title: "Expired X.509 Certificate",
                description:
                    "The TLS certificate presented during the session has expired."
            },
            {
                severity: "HIGH",
                title: "Deprecated TLS Configuration",
                description:
                    "The session negotiated TLS 1.1, which is considered deprecated."
            }
        ]
    }
};