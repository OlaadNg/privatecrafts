export function renderLegalPage(type) {
  const titles = {
    'privacy-policy': 'Privacy Policy',
    'cookie-policy': 'Cookie Policy',
    'terms': 'Terms of Use',
    'disclaimer': 'Legal Disclaimer',
    'accessibility': 'Accessibility Statement'
  };

  const title = titles[type] || 'Legal Information';

  return `
    <section class="section-padding" style="padding-top: calc(var(--header-height) + 3rem);">
      <div class="container" style="max-width: 800px;">
        <span class="eyebrow">Legal Governance</span>
        <h1 class="heading-xl text-ivory" style="margin-top: 0.5rem; margin-bottom: 2rem;">${title}</h1>
        
        <div class="glass-panel text-cloud" style="padding: 2.5rem; line-height: 1.8; font-size: 0.9375rem;">
          <p style="margin-bottom: 1.5rem;">Last Updated: August 2026</p>
          
          <h3 class="text-ivory" style="font-size: 1.25rem; margin-top: 1.5rem; margin-bottom: 0.75rem;">1. Introduction</h3>
          <p style="margin-bottom: 1.5rem;">PRIVATECRAFT respects your privacy and is committed to protecting your personal data in accordance with applicable global privacy laws. This document governs your access to and use of PRIVATECRAFT's design, engineering, manufacturing, and digital consultation services.</p>

          <h3 class="text-ivory" style="font-size: 1.25rem; margin-top: 1.5rem; margin-bottom: 0.75rem;">2. Data Collection & Confidentiality</h3>
          <p style="margin-bottom: 1.5rem;">Any information provided through our program consultation forms, aircraft concept enquiries, or project portals is strictly confidential. PRIVATECRAFT does not sell, trade, or distribute client data to unauthorized third parties.</p>

          <h3 class="text-ivory" style="font-size: 1.25rem; margin-top: 1.5rem; margin-bottom: 0.75rem;">3. Engineering & Manufacturing Disclosure</h3>
          <p>PRIVATECRAFT operates as an aerospace design and manufacturing consultancy. Where specified, we coordinate with certified partners, production specialists, and technical stakeholders to deliver compliant aircraft programs and mission-ready systems.</p>
        </div>
      </div>
    </section>
  `;
}
