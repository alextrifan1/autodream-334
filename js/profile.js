function showTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
}
document.addEventListener('DOMContentLoaded', () => showTab('posts'));

function togglePasswordMenu() {
    toggleMenu('password-menu');
}

function toggleEmailMenu() {
    toggleMenu('email-menu');
}

function toggleUsernameMenu() {
    toggleMenu('username-menu');
}

function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    const arrowIcon = menu.previousElementSibling.querySelector(".arrow-icon");

    if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
        arrowIcon.textContent = "▲";
    } else {
        menu.classList.add("hidden");
        arrowIcon.textContent = "▼";
    }
}

function togglePictureMenu() {
    toggleMenu('picture-menu');
}
