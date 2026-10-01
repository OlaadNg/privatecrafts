import { getFallbackAircraftData } from '../js/database.js';

export function renderHomePage() {
  const featuredAircraft = getFallbackAircraftData().filter(a => a.featured).slice(0, 3);

  return `
    <!-- Hero Section -->
    <section class="hero-section">
      <img src="/assets/hero-bg.png" alt="Private Craft Aviation" class="hero-bg-media" />
      <div class="overlay-dark"></div>
      
      <div class="container hero-content animate-fade-in">
        <span class="eyebrow" style="margin-bottom: 1rem;">Aerospace Manufacturing</span>
        <h1 class="heading-xl text-ivory" style="margin-bottom: 1.5rem;">
          Aircraft Design,<br />
          <span class="text-gold">Built to Lead.</span>
        </h1>
        <p class="text-cloud" style="font-size: 1.125rem; max-width: 620px; margin-bottom: 2.5rem; line-height: 1.7;">
          PRIVATECRAFT engineers and manufactures advanced aviation platforms, integrated systems, and bespoke aircraft solutions for modern mobility.
        </p>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="/request-charter" class="btn btn-gold btn-lg" data-link>Request a Consultation</a>
          <a href="/aircraft" class="btn btn-outline btn-lg" data-link>View Programs</a>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-value">15+</div>
            <div class="stat-label">Years of Expertise</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">500+</div>
            <div class="stat-label">Aircraft Access</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">100+</div>
            <div class="stat-label">Destinations</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">24/7</div>
            <div class="stat-label">Client Support</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Complete Aviation Practice Section -->
    <section class="section-padding" style="background: var(--color-bg-alt);">
      <div class="container">
        <div class="section-header" style="text-align: center; max-width: 700px; margin-left: auto; margin-right: auto;">
          <span class="eyebrow">Capabilities</span>
          <h2 class="heading-lg text-ivory" style="margin-top: 0.5rem; margin-bottom: 1rem;">A Full Aerospace Manufacturing Practice</h2>
          <p class="text-cloud">We design, engineer, and deliver next-generation aircraft programs — combining advanced production capability with precision certification and systems integration.</p>
        </div>

        <div class="grid-3">
          <div class="card glass-panel" style="padding: 2rem;">
            <div style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;">01</div>
            <h3 class="card-title">Airframe Engineering</h3>
            <p class="text-cloud" style="font-size: 0.9375rem; margin-bottom: 1.5rem; flex-grow: 1;">Aerodynamic design, structural optimization, and performance engineering for next-generation aircraft platforms.</p>
            <a href="/charter" class="btn btn-outline btn-sm" data-link>Explore Engineering</a>
          </div>

          <div class="card glass-panel" style="padding: 2rem;">
            <div style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;">02</div>
            <h3 class="card-title">Program Manufacturing</h3>
            <p class="text-cloud" style="font-size: 0.9375rem; margin-bottom: 1.5rem; flex-grow: 1;">Scalable production workflows for aircraft components, assemblies, and integrated mission systems.</p>
            <a href="/aircraft-sales" class="btn btn-outline btn-sm" data-link>Review Production</a>
          </div>

          <div class="card glass-panel" style="padding: 2rem;">
            <div style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;">03</div>
            <h3 class="card-title">Systems Integration</h3>
            <p class="text-cloud" style="font-size: 0.9375rem; margin-bottom: 1.5rem; flex-grow: 1;">Cabin, avionics, propulsion, and mission systems integrated with precision and full validation testing.</p>
            <a href="/aircraft-management" class="btn btn-outline btn-sm" data-link>View Integration</a>
          </div>

          <div class="card glass-panel" style="padding: 2rem;">
            <div style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;">04</div>
            <h3 class="card-title">Interior & Completion</h3>
            <p class="text-cloud" style="font-size: 0.9375rem; margin-bottom: 1.5rem; flex-grow: 1;">Refined cabin finishes, custom layouts, premium materials, and operationally efficient interior architecture.</p>
            <a href="/design-completion" class="btn btn-outline btn-sm" data-link>Discover Design Studio</a>
          </div>

          <div class="card glass-panel" style="padding: 2rem;">
            <div style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;">05</div>
            <h3 class="card-title">Certification & Compliance</h3>
            <p class="text-cloud" style="font-size: 0.9375rem; margin-bottom: 1.5rem; flex-grow: 1;">Regulatory readiness, compliance documentation, and airworthiness management across every project phase.</p>
            <a href="/contact" class="btn btn-outline btn-sm" data-link>Speak to Engineering</a>
          </div>

          <div class="card glass-panel" style="padding: 2rem;">
            <div style="font-family: var(--font-heading); font-size: 2.5rem; color: var(--color-gold); margin-bottom: 1rem;">06</div>
            <h3 class="card-title">Global Support</h3>
            <p class="text-cloud" style="font-size: 0.9375rem; margin-bottom: 1.5rem; flex-grow: 1;">End-to-end operational support across program delivery, maintenance readiness, and fleet lifecycle continuity.</p>
            <a href="/destinations" class="btn btn-outline btn-sm" data-link>See Support Network</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Aircraft Section -->
    <section class="section-padding">
      <div class="container">
        <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 3.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="eyebrow">Featured Aircraft</span>
            <h2 class="heading-lg text-ivory" style="margin-top: 0.5rem;">Selected From Our Fleet</h2>
          </div>
          <a href="/aircraft" class="btn btn-outline" data-link>Explore Our Fleet &rarr;</a>
        </div>

        <div class="grid-3">
          ${featuredAircraft.map(aircraft => `
            <div class="card">
              <div class="card-img-wrapper">
                <img src="${aircraft.image_url}" alt="${aircraft.title}" />
                <span class="badge badge-gold" style="position: absolute; top: 1rem; left: 1rem;">${aircraft.category}</span>
              </div>
              <div class="card-body">
                <div style="font-size: 0.75rem; color: var(--color-gold); font-weight: 600; margin-bottom: 0.25rem;">${aircraft.manufacturer}</div>
                <h3 class="card-title">${aircraft.title}</h3>
                <p class="text-cloud" style="font-size: 0.875rem; margin-bottom: 1.25rem; line-clamp: 2;">${aircraft.interior_description}</p>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; font-size: 0.8125rem; border-top: 1px solid var(--color-card-border); padding-top: 1rem; margin-bottom: 1.5rem;">
                  <div><span style="color: var(--color-muted);">Passengers:</span> <strong class="text-ivory">${aircraft.max_passengers}</strong></div>
                  <div><span style="color: var(--color-muted);">Range:</span> <strong class="text-ivory">${aircraft.range_nm} nm</strong></div>
                </div>
                <a href="/aircraft-sales/${aircraft.slug}" class="btn btn-gold btn-sm" data-link>View Specifications</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- The PRIVATECRAFT Difference Section -->
    <section class="section-padding" style="background: var(--color-bg-alt);">
      <div class="container">
        <div class="section-header" style="text-align: center; max-width: 650px; margin-left: auto; margin-right: auto;">
          <span class="eyebrow">Pillars</span>
          <h2 class="heading-lg text-ivory" style="margin-top: 0.5rem; margin-bottom: 1rem;">The PRIVATECRAFT Difference</h2>
          <p class="text-cloud">Our reputation is built on uncompromising performance, disciplined engineering, and manufacturing quality at every stage.</p>
        </div>

        <div class="grid-3">
          <div class="glass-panel" style="padding: 2rem;">
            <h3 style="font-size: 1.25rem;" class="text-gold">Precision</h3>
            <p class="text-cloud" style="font-size: 0.875rem; margin-top: 0.5rem;">Every detail is engineered against exact performance and certification requirements.</p>
          </div>
          <div class="glass-panel" style="padding: 2rem;">
            <h3 style="font-size: 1.25rem;" class="text-gold">Performance</h3>
            <p class="text-cloud" style="font-size: 0.875rem; margin-top: 0.5rem;">Design choices are driven by range, efficiency, and mission readiness.</p>
          </div>
          <div class="glass-panel" style="padding: 2rem;">
            <h3 style="font-size: 1.25rem;" class="text-gold">Integrity</h3>
            <p class="text-cloud" style="font-size: 0.875rem; margin-top: 0.5rem;">Transparent engineering decisions, honest program reporting, and accountable execution.</p>
          </div>
          <div class="glass-panel" style="padding: 2rem;">
            <h3 style="font-size: 1.25rem;" class="text-gold">Innovation</h3>
            <p class="text-cloud" style="font-size: 0.875rem; margin-top: 0.5rem;">New materials, advanced workflows, and better aircraft systems that move the category forward.</p>
          </div>
          <div class="glass-panel" style="padding: 2rem;">
            <h3 style="font-size: 1.25rem;" class="text-gold">Collaboration</h3>
            <p class="text-cloud" style="font-size: 0.875rem; margin-top: 0.5rem;">We work with OEM partners, engineers, and operators to deliver complex programs smoothly.</p>
          </div>
          <div class="glass-panel" style="padding: 2rem;">
            <h3 style="font-size: 1.25rem;" class="text-gold">Customization</h3>
            <p class="text-cloud" style="font-size: 0.875rem; margin-top: 0.5rem;">Every aircraft configuration is shaped around mission, operator, and experience.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
