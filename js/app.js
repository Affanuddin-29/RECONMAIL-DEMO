document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

function initializeApp() {
    initializeNavigation();
    initializeModals();
    initializeMobileMenu();

    // Show Dashboard by default
    showPage("dashboard");
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navItems = document.querySelectorAll(".nav-item[data-page]");

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const pageId = item.dataset.page;

            if (!pageId) return;

            showPage(pageId);

        });

    });

}


/* =========================================================
   SHOW PAGE
   ========================================================= */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page-section");

    let targetPage = null;

    pages.forEach(page => {

        page.classList.remove("active");
        page.style.display = "none";

        if (page.id === pageId) {
            targetPage = page;
        }

    });

    if (!targetPage) {

        console.error(`RECONMAIL: Page "${pageId}" was not found.`);

        return;
    }

    targetPage.classList.add("active");
    targetPage.style.display = "block";


    /* -----------------------------------------
       Update navigation
    ----------------------------------------- */

    const navItems = document.querySelectorAll(".nav-item[data-page]");

    navItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.page === pageId
        );

    });


    /* -----------------------------------------
       Update breadcrumb
    ----------------------------------------- */

    const breadcrumb = document.querySelector(".breadcrumb strong");

    if (breadcrumb) {

        const pageNames = {
            dashboard: "Dashboard",
            sessions: "Sessions",
            findings: "Findings",
            tls: "TLS Analysis",
            certificates: "Certificates",
            "ai-analyst": "AI Security Analyst",
            reports: "Reports"
        };

        breadcrumb.textContent =
            pageNames[pageId] || "RECONMAIL";

    }


    /* -----------------------------------------
       Close mobile sidebar
    ----------------------------------------- */

    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.classList.remove("open");
    }

}


/* =========================================================
   MODALS
   ========================================================= */

function initializeModals() {

    document.addEventListener("click", event => {

        const closeButton = event.target.closest("[data-close-modal]");

        if (closeButton) {

            const modalId = closeButton.dataset.closeModal;

            closeModal(modalId);

            return;
        }


        const modal = event.target.closest(".modal");

        if (
            modal &&
            event.target.classList.contains("modal-overlay")
        ) {

            closeModal(modal.id);

        }

    });

}


function openModal(modalId) {

    const modal = document.getElementById(modalId);

    if (!modal) {
        console.warn(`Modal "${modalId}" not found.`);
        return;
    }

    modal.classList.add("active");

}


function closeModal(modalId) {

    const modal = document.getElementById(modalId);

    if (!modal) return;

    modal.classList.remove("active");

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initializeMobileMenu() {

    const menuButton =
        document.querySelector(".mobile-menu-button");

    const sidebar =
        document.querySelector(".sidebar");

    if (!menuButton || !sidebar) return;

    menuButton.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });

}


/* =========================================================
   GLOBAL NOTIFICATION
   ========================================================= */

function showNotification(message, type = "info") {

    const notification =
        document.getElementById("notification");

    if (!notification) return;

    notification.textContent = message;

    notification.className =
        `notification show ${type}`;

    clearTimeout(window.notificationTimer);

    window.notificationTimer = setTimeout(() => {

        notification.classList.remove("show");

    }, 3000);

}