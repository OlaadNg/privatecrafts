export function renderAboutPage() {
  return `
    <!-- Page Header Banner -->
    <section class="hero-section" style="min-height: 45vh; padding-top: calc(var(--header-height) + 2rem);">
      <img src="/assets/cockpit-detail.png" alt="About PRIVATECRAFT" class="hero-bg-media" />
      <div class="overlay-dark"></div>
      <div class="container hero-content animate-fade-in">
        <span class="eyebrow" style="margin-bottom: 0.5rem;">Who We Are</span>
        <h1 class="heading-xl text-ivory">Aerospace Innovation, Built in Practice.</h1>
        <p class="text-cloud" style="font-size: 1.125rem; max-width: 650px; margin-top: 1rem;">
          PRIVATECRAFT brings together design, engineering, manufacturing, and certification expertise to create advanced aircraft programs for a new generation of flight.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="grid-3" style="margin-bottom: 4rem;">
          <div class="card glass-panel" style="padding: 2.5rem;">
            <div style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;">Design</div>
            <p class="text-cloud" style="font-size: 0.9375rem; line-height: 1.6;">
              Every concept starts with mission fit, aerodynamic efficiency, and human-centered aircraft architecture shaped around real use cases.
            </p>
          </div>

          <div class="card glass-panel" style="padding: 2.5rem;">
            <div style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;">Manufacture</div>
            <p class="text-cloud" style="font-size: 0.9375rem; line-height: 1.6;">
              We transform advanced concepts into production-ready systems with disciplined tolerances, fit-for-purpose materials, and efficient assembly methods.
            </p>
          </div>

          <div class="card glass-panel" style="padding: 2.5rem;">
            <div style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;">Certification</div>
            <p class="text-cloud" style="font-size: 0.9375rem; line-height: 1.6;">
              Technical quality and compliance are non-negotiable. Our team supports airworthiness, safety validation, and regulatory confidence throughout the lifecycle.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;
}
