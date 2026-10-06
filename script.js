// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Theme: auto follows system, manual toggle overrides (persisted)
const toggle = document.getElementById('themeToggle');
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  else document.documentElement.removeAttribute('data-theme');
  toggle.textContent = theme === 'dark' ? '☀' : '◐';
}

function getPreferredTheme() {
  const saved = localStorage.getItem('ct-theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return mediaQuery.matches ? 'dark' : 'light'; // auto from system
}

applyTheme(getPreferredTheme());

toggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('ct-theme', next); // remember manual choice
  applyTheme(next);
});

// Follow system changes only when user hasn't set a manual preference
mediaQuery.addEventListener('change', (e) => {
  if (!localStorage.getItem('ct-theme')) applyTheme(e.matches ? 'dark' : 'light');
});

// Double-click toggle to clear override and return to Auto (system)
toggle.title = 'Toggle theme (double-click for Auto)';
toggle.addEventListener('dblclick', () => {
  localStorage.removeItem('ct-theme');
  applyTheme(mediaQuery.matches ? 'dark' : 'light');
});

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,.08)' : 'none';
});

// Contact form -> mailto (easily replace with Formspree / backend later)
function sendMail(e) {
  e.preventDefault();
  const name = document.getElementById('cfName').value.trim();
  const email = document.getElementById('cfEmail').value.trim();
  const msg = document.getElementById('cfMsg').value.trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
  // Change this to your real email if different:
  window.location.href = `mailto:christinielrteope@gmail.com?subject=${subject}&body=${body}`;
  return false;
}
