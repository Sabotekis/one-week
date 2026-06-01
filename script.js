const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const navLinks = Array.from(document.querySelectorAll('.sidebar-btn'));

const savedTheme = window.localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === 'dark';
  toggle.setAttribute('aria-pressed', String(isDark));
  toggle.setAttribute('aria-label', isDark ? 'Ieslēgt gaišo režīmu' : 'Ieslēgt tumšo režīmu');
}

applyTheme(initialTheme);

toggle.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  window.localStorage.setItem('theme', nextTheme);
});

function setActiveLink(id) {
  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === id;
    link.classList.toggle('is-active', active);
    link.setAttribute('aria-current', active ? 'location' : 'false');
  });
}

const currentPage = location.pathname.split('/').pop() || 'index.html';
const initialPage = navLinks.some((link) => link.getAttribute('href') === currentPage)
  ? currentPage
  : 'index.html';

setActiveLink(initialPage);

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setActiveLink(link.getAttribute('href'));
  });
});