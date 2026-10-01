export function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="/" class="brand-logo" data-link style="margin-bottom: 1.5rem; display: inline-block;">
              <svg viewBox="0 0 320 60" width="180" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 4 L40 40 L22 32 L4 40 Z" stroke="#D4AF37" stroke-width="2.5" stroke-linejoin="round"/>
                <path d="M22 10 L34 36 L22 30 L10 36 Z" fill="#D4AF37"/>
                <text x="52" y="32" font-family="'Cormorant Garamond', Georgia, serif" font-size="22" font-weight="600" letter-spacing="3" fill="#F5F5F0">PRIVATECRAFT</text>
              </svg>
            </a>
            <p style="color: var(--color-cloud); margin-bottom: 1.5rem; max-width: 320px; font-size: 0.875rem;">
              Advanced aircraft manufacturing, systems integration, and engineering solutions designed for the next generation of flight.
            </p>
            <a href="https://wa.me/442079460912?text=Hello%20PRIVATECRAFT%2C%20I%20would%20like%20to%20discuss%20an%20aircraft%20manufacturing%20project." target="_blank" rel="noopener" class="btn btn-outline btn-sm">
              💬 Manufacturing Enquiry
            </a>
          </div>

          <div>
            <h4 class="footer-col-title">Capabilities</h4>
            <div class="footer-links">
              <a href="/charter" class="footer-link" data-link>Aircraft Manufacturing</a>
              <a href="/request-charter" class="footer-link" data-link>Project Consultation</a>
              <a href="/aircraft-sales" class="footer-link" data-link>Airframe Engineering</a>
              <a href="/aircraft-management" class="footer-link" data-link>Production Systems</a>
              <a href="/design-completion" class="footer-link" data-link>Design & Integration</a>
            </div>
          </div>

          <div>
            <h4 class="footer-col-title">Explore</h4>
            <div class="footer-links">
              <a href="/aircraft" class="footer-link" data-link>Fleet Overview</a>
              <a href="/destinations" class="footer-link" data-link>Destinations</a>
              <a href="/insights" class="footer-link" data-link>Insights & News</a>
              <a href="/gallery" class="footer-link" data-link>Media Gallery</a>
              <a href="/faq" class="footer-link" data-link>FAQ</a>
            </div>
          </div>

          <div>
            <h4 class="footer-col-title">Company</h4>
            <div class="footer-links">
              <a href="/about" class="footer-link" data-link>About PRIVATECRAFT</a>
              <a href="/team" class="footer-link" data-link>Leadership Team</a>
              <a href="/careers" class="footer-link" data-link>Careers</a>
              <a href="/sustainability" class="footer-link" data-link>Sustainability</a>
              <a href="/contact" class="footer-link" data-link>Contact Us</a>
            </div>
          </div>

          <div>
            <h4 class="footer-col-title">Legal</h4>
            <div class="footer-links">
              <a href="/privacy-policy" class="footer-link" data-link>Privacy Policy</a>
              <a href="/cookie-policy" class="footer-link" data-link>Cookie Policy</a>
              <a href="/terms" class="footer-link" data-link>Terms of Use</a>
              <a href="/disclaimer" class="footer-link" data-link>Disclaimer</a>
              <a href="/accessibility" class="footer-link" data-link>Accessibility</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} PRIVATECRAFT. All rights reserved. Advanced aircraft manufacturing and aerospace engineering.</p>
          <p style="color: var(--color-muted);">Precision by Design</p>
        </div>
      </div>
    </footer>
  `;
}
