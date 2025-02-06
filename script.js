'use strict';

// Toggle function for sidebar, modals, etc.
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// Modal Testimonials
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
};

document.querySelectorAll("[data-testimonials-item]").forEach(item => {
    item.addEventListener("click", function () {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.textContent = this.querySelector("[data-testimonials-title]").textContent;
        modalText.textContent = this.querySelector("[data-testimonials-text]").textContent;
        testimonialsModalFunc();
    });
});

// Close modal
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Filter Select
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", () => elementToggleFunc(select));

const filterFunc = (selectedValue) => {
    filterItems.forEach(item => {
        item.classList.toggle("active", selectedValue === "all" || selectedValue === item.dataset.category);
    });
};

selectItems.forEach(item => {
    item.addEventListener("click", function () {
        let selectedValue = this.textContent.trim().toLowerCase();
        selectValue.textContent = this.textContent;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
});

// Enabling filter button for larger screens
let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
        let selectedValue = this.textContent.trim().toLowerCase();
        selectValue.textContent = this.textContent;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
});

// Contact Form Validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
    input.addEventListener("input", () => {
        formBtn.disabled = !form.checkValidity();
    });
});

// Page Navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
        const targetPage = this.textContent.trim().toLowerCase();

        // Remove 'active' from all pages and links
        pages.forEach(page => page.classList.remove("active"));
        navigationLinks.forEach(nav => nav.classList.remove("active"));

        // Activate the target page and clicked link
        const targetElement = document.querySelector(`[data-page="${targetPage}"]`);
        if (targetElement) {
            targetElement.classList.add("active");
        }
        this.classList.add("active");

        // Scroll to top
        window.scrollTo(0, 0);
    });
});
