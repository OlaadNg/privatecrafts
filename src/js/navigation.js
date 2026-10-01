import { $, $$ } from './utils.js';

export function initNavigation() {
  const header = $('#main-header');
  const hamburgerBtn = $('#hamburger-toggle');
  const mobileDrawer = $('#mobile-drawer');

  // Scroll header glass effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  hamburgerBtn?.addEventListener('click', () => {
    const isActive = mobileDrawer?.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded', String(isActive));
  });

  // Close drawer on mobile link click
  $$('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer?.classList.remove('active');
    });
  });

  // Update active state based on current path
  updateActiveNavLinks();
}

export function updateActiveNavLinks() {
  const currentPath = window.location.pathname;
  $$('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
