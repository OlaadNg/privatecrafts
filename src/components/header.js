export function renderHeader() {
  return `
    <header class="header" id="main-header">
      <div class="container header-inner">
        <a href="/" class="brand-logo" data-link>
          <svg viewBox="0 0 320 60" width="180" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 4 L40 40 L22 32 L4 40 Z" stroke="#D4AF37" stroke-width="2.5" stroke-linejoin="round"/>
            <path d="M22 10 L34 36 L22 30 L10 36 Z" fill="#D4AF37"/>
            <text x="52" y="32" font-family="'Cormorant Garamond', Georgia, serif" font-size="22" font-weight="600" letter-spacing="3" fill="#F5F5F0">PRIVATECRAFT</text>
          </svg>
        </a>

        <nav class="nav-menu">
          <a href="/charter" class="nav-link" data-link>Manufacturing</a>
          <a href="/aircraft" class="nav-link" data-link>Programs</a>
          <a href="/aircraft-sales" class="nav-link" data-link>Engineering</a>
          <a href="/aircraft-management" class="nav-link" data-link>Production</a>
          <a href="/design-completion" class="nav-link" data-link>Design</a>
          <a href="/destinations" class="nav-link" data-link>Certification</a>
          <a href="/about" class="nav-link" data-link>About</a>
          <a href="/insights" class="nav-link" data-link>Insights</a>
          <a href="/contact" class="nav-link" data-link>Contact</a>
        </nav>

        <div class="header-actions">
          <a href="/login" class="btn btn-ghost btn-sm" data-link style="margin-right: 0.5rem;">Portal</a>
          <a href="/request-charter" class="btn btn-gold btn-sm" data-link>Consultation</a>
          <button class="hamburger-btn" id="hamburger-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-nav-drawer" id="mobile-drawer">
      <div class="mobile-nav-links">
        <a href="/" class="mobile-nav-link" data-link>Home</a>
        <a href="/charter" class="mobile-nav-link" data-link>Manufacturing</a>
        <a href="/aircraft" class="mobile-nav-link" data-link>Program Portfolio</a>
        <a href="/aircraft-sales" class="mobile-nav-link" data-link>Engineering</a>
        <a href="/aircraft-management" class="mobile-nav-link" data-link>Production</a>
        <a href="/design-completion" class="mobile-nav-link" data-link>Design Studio</a>
        <a href="/destinations" class="mobile-nav-link" data-link>Certification</a>
        <a href="/about" class="mobile-nav-link" data-link>About Us</a>
        <a href="/insights" class="mobile-nav-link" data-link>Insights</a>
        <a href="/contact" class="mobile-nav-link" data-link>Contact</a>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <a href="/request-charter" class="btn btn-gold" data-link>Start a Consultation</a>
        <a href="/login" class="btn btn-outline" data-link>Client Portal</a>
      </div>
    </div>
  `;
}
