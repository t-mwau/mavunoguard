const mobileMenu = document.querySelector('.mobile-menu');
const sidebar = document.querySelector('.sidebar');
mobileMenu?.addEventListener('click', () => sidebar.classList.toggle('is-open'));