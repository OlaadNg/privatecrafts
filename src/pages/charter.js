export function renderCharterPage() {
  return `
    <!-- Page Header Banner -->
    <section class="hero-section" style="min-height: 45vh; padding-top: calc(var(--header-height) + 2rem);">
      <img src="/assets/cabin-interior.png" alt="Private Jet Charter" class="hero-bg-media" />
      <div class="overlay-dark"></div>
      <div class="container hero-content animate-fade-in">
        <span class="eyebrow" style="margin-bottom: 0.5rem;">Precision Manufacturing</span>
        <h1 class="heading-xl text-ivory">Aircraft Manufacturing Solutions</h1>
        <p class="text-cloud" style="font-size: 1.125rem; max-width: 650px; margin-top: 1rem;">
          We build advanced aircraft programs with disciplined engineering, high-fidelity production methods, and fully integrated mission-ready systems.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <!-- Fleet Categories -->
        <div class="section-header">
          <span class="eyebrow">Program Categories</span>
          <h2 class="heading-lg text-ivory" style="margin-top: 0.5rem;">Choose the Right Manufacturing Path</h2>
        </div>

        <div class="grid-3" style="margin-bottom: 5rem;">
          <div class="card glass-panel">
            <div class="program-category-image">
              <img src="/assets/legacy600-featured.png" alt="Regional aircraft platform on an airport apron" loading="lazy" decoding="async" />
            </div>
            <div class="program-category-content">
              <span class="badge badge-gold" style="margin-bottom: 1rem; width: fit-content;">Light & Agile</span>
              <h3 class="card-title">Regional Aircraft Platforms</h3>
              <p class="text-cloud" style="font-size: 0.9375rem; margin-bottom: 1.5rem;">Efficient, cost-aware airframes designed for shorter mission profiles, cargo flexibility, and regional reach.</p>
              <div style="font-size: 0.8125rem; color: var(--color-muted); margin-bottom: 1.5rem;">
                <strong>Focus:</strong> Aerodynamics, structure, maintainability
              </div>
              <a href="/request-charter?category=Light+Jets" class="btn btn-outline btn-sm" data-link>Request Program Brief</a>
            </div>
          </div>

          <div class="card glass-panel">
            <div class="program-category-image">
              <img src="/assets/falcon8x-featured.png" alt="Business aircraft prepared for an executive mission" loading="lazy" decoding="async" />
            </div>
            <div class="program-category-content">
              <span class="badge badge-gold" style="margin-bottom: 1rem; width: fit-content;">Mid-Size Missions</span>
              <h3 class="card-title">Business Aviation Programs</h3>
              <p class="text-cloud" style="font-size: 0.9375rem; margin-bottom: 1.5rem;">High-performance aircraft configurations built for executive transport, premium cabin layouts, and mission versatility.</p>
              <div style="font-size: 0.8125rem; color: var(--color-muted); margin-bottom: 1.5rem;">
                <strong>Focus:</strong> Cabin design, mission systems, integration
              </div>
              <a href="/request-charter?category=Super+Midsize+Jets" class="btn btn-outline btn-sm" data-link>Discuss Capability</a>
            </div>
          </div>

          <div class="card glass-panel">
            <div class="program-category-image">
              <img src="/assets/global8000-featured.png" alt="Long-range aircraft platform at dusk" loading="lazy" decoding="async" />
            </div>
            <div class="program-category-content">
              <span class="badge badge-gold" style="margin-bottom: 1rem; width: fit-content;">Flagship Systems</span>
              <h3 class="card-title">Long-Range & VIP Platforms</h3>
              <p class="text-cloud" style="font-size: 0.9375rem; margin-bottom: 1.5rem;">Large-format aircraft ecosystems engineered for long-sector endurance, luxury interiors, and advanced operational resilience.</p>
              <div style="font-size: 0.8125rem; color: var(--color-muted); margin-bottom: 1.5rem;">
                <strong>Focus:</strong> Advanced systems, certification, lifecycle support
              </div>
              <a href="/request-charter?category=Ultra+Long+Range+Jets" class="btn btn-gold btn-sm" data-link>Request Flagship Brief</a>
            </div>
          </div>
        </div>

        <div class="glass-panel-gold" style="padding: 3rem; text-align: center; border-radius: var(--radius-lg);">
          <h2 class="heading-md text-ivory" style="margin-bottom: 1rem;">Ready to Build Your Next Aircraft Program?</h2>
          <p class="text-cloud" style="max-width: 600px; margin: 0 auto 2rem auto;">Our engineering and manufacturing teams are ready to help shape your aircraft concept, production roadmap, and certification path.</p>
          <a href="/request-charter" class="btn btn-gold btn-lg" data-link>Start a Manufacturing Consultation</a>
        </div>
      </div>
    </section>
  `;
}
