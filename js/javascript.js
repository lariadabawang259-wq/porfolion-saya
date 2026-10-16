/* =========================================
   PORTFOLIO JAVASCRIPT
========================================= */

"use strict";


/* =========================================
   ELEMENTS
========================================= */

const navbar = document.getElementById("mainNavbar");
const backToTop = document.getElementById("backToTop");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const themeToggle = document.getElementById("themeToggle");


/* =========================================
   NAVBAR SCROLL EFFECT + BACK TO TOP
========================================= */

function handleScroll() {

    if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }

    if (backToTop) {
        backToTop.classList.toggle("show", window.scrollY > 500);
    }

}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const currentId = entry.target.getAttribute("id");

            navLinks.forEach((link) => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${currentId}`
                );

            });

        });

    },
    { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));


/* =========================================
   CLOSE MOBILE NAVBAR
========================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        const navbarCollapse = document.getElementById("navbarNav");

        if (navbarCollapse && navbarCollapse.classList.contains("show")) {

            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);

            if (bsCollapse) bsCollapse.hide();

        }

    });

});


/* =========================================
   BACK TO TOP
========================================= */

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({ top: 0, behavior: "smooth" });

    });

}


/* =========================================
   CONTACT FORM VALIDATION
========================================= */

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();
        event.stopPropagation();

        if (!contactForm.checkValidity()) {

            contactForm.classList.add("was-validated");
            formMessage.textContent = "";

            return;

        }

        const name = document.getElementById("name").value.trim();

        formMessage.textContent =
            `Thanks, ${name}! Your message has been validated successfully.`;

        formMessage.style.color = "#a8ff12";

        contactForm.reset();
        contactForm.classList.remove("was-validated");

    });

}


/* =========================================
   THEME TOGGLE (tersimpan di browser)
========================================= */

function applyTheme(isLight) {

    document.body.classList.toggle("light-mode", isLight);

    if (themeToggle) {
        themeToggle.innerHTML = isLight
            ? '<i class="bi bi-moon"></i>'
            : '<i class="bi bi-sun"></i>';
    }

}

let lightMode = false;

try {
    lightMode = localStorage.getItem("theme") === "light";
} catch (e) {
    lightMode = false;
}

applyTheme(lightMode);

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        lightMode = !lightMode;

        applyTheme(lightMode);

        try {
            localStorage.setItem("theme", lightMode ? "light" : "dark");
        } catch (e) { /* abaikan */ }

    });

}