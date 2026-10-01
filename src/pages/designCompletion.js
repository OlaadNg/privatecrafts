export function renderDesignCompletionPage() {
  return `
    <!-- Page Header Banner -->
    <section class="hero-section" style="min-height: 45vh; padding-top: calc(var(--header-height) + 2rem);">
      <img src="/assets/cabin-interior.png" alt="Design & Completion" class="hero-bg-media" />
      <div class="overlay-dark"></div>
      <div class="container hero-content animate-fade-in">
        <span class="eyebrow" style="margin-bottom: 0.5rem;">Design & Completion</span>
        <h1 class="heading-xl text-ivory">Your Aircraft. Your Vision.</h1>
        <p class="text-cloud" style="font-size: 1.125rem; max-width: 650px; margin-top: 1rem;">
          Bespoke aircraft interiors created around your lifestyle, identity and operational requirements. An interior designed around you.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">Capabilities</span>
          <h2 class="heading-lg text-ivory" style="margin-top: 0.5rem;">From Concept to Delivery</h2>
        </div>

        <div class="grid-3" style="margin-bottom: 4rem;">
          <div class="card glass-panel" style="padding: 2rem;">
            <h3 class="card-title">Interior Design</h3>
            <p class="text-cloud" style="font-size: 0.9375rem;">Bespoke cabin layouts, seating, lighting and finishes created around your identity and the way you travel.</p>
          </div>
          <div class="card glass-panel" style="padding: 2rem;">
            <h3 class="card-title">Materials Sourcing</h3>
            <p class="text-cloud" style="font-size: 0.9375rem;">Carefully selected leathers, veneers, textiles and metals — sourced responsibly and matched to your brief.</p>
          </div>
          <div class="card glass-panel" style="padding: 2rem;">
            <h3 class="card-title">Cabin Systems</h3>
            <p class="text-cloud" style="font-size: 0.9375rem;">Entertainment, connectivity, lighting, climate and galley systems specified and integrated for seamless use.</p>
          </div>
          <div class="card glass-panel" style="padding: 2rem;">
            <h3 class="card-title">Certification Support</h3>
            <p class="text-cloud" style="font-size: 0.9375rem;">Coordination of engineering, airworthiness and regulatory sign-off across the completion process.</p>
          </div>
          <div class="card glass-panel" style="padding: 2rem;">
            <h3 class="card-title">Project Management</h3>
            <p class="text-cloud" style="font-size: 0.9375rem;">A single team coordinating designers, workshops and vendors to deliver on schedule and on budget.</p>
          </div>
          <div class="card glass-panel" style="padding: 2rem;">
            <h3 class="card-title">Post-Delivery Care</h3>
            <p class="text-cloud" style="font-size: 0.9375rem;">Support through entry into service, warranty management and onward refurbishment over the life of the aircraft.</p>
          </div>
        </div>

        <div class="glass-panel-gold" style="padding: 3rem; border-radius: var(--radius-lg); text-align: center;">
          <h2 class="heading-md text-ivory" style="margin-bottom: 1rem;">An Interior Designed Around You.</h2>
          <p class="text-cloud" style="max-width: 600px; margin: 0 auto 2rem auto;">Consult with our lead interior architects and review sample material swatches, 3D renders, and floor plans.</p>
          <a href="/contact" class="btn btn-gold btn-lg" data-link>Discover Design & Completion</a>
        </div>
      </div>
    </section>
  `;
}
