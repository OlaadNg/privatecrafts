export function renderAircraftManagementPage() {
  return `
    <!-- Page Header Banner -->
    <section class="hero-section" style="min-height: 45vh; padding-top: calc(var(--header-height) + 2rem);">
      <img src="/assets/cockpit-detail.png" alt="Aircraft Management" class="hero-bg-media" />
      <div class="overlay-dark"></div>
      <div class="container hero-content animate-fade-in">
        <span class="eyebrow" style="margin-bottom: 0.5rem;">Aircraft Management</span>
        <h1 class="heading-xl text-ivory">Own the Aircraft. We Handle the Rest.</h1>
        <p class="text-cloud" style="font-size: 1.125rem; max-width: 650px; margin-top: 1rem;">
          Comprehensive aircraft management designed to simplify ownership and optimise operations. Always available. Always accountable.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">The Practice</span>
          <h2 class="heading-lg text-ivory" style="margin-top: 0.5rem;">What We Manage on Your Behalf</h2>
        </div>

        <div class="grid-3" style="margin-bottom: 4rem;">
          <div class="card glass-panel" style="padding: 2rem;">
            <h3 class="card-title">Crew & Training</h3>
            <p class="text-cloud" style="font-size: 0.9375rem;">Recruitment, training and rostering of flight crew and cabin staff to a consistent standard, with full support and rest-cycle management.</p>
          </div>
          <div class="card glass-panel" style="padding: 2rem;">
            <h3 class="card-title">Maintenance & CAMO</h3>
            <p class="text-cloud" style="font-size: 0.9375rem;">Scheduled and unscheduled maintenance, continuing airworthiness oversight and hangar coordination through approved partners.</p>
          </div>
          <div class="card glass-panel" style="padding: 2rem;">
            <h3 class="card-title">Compliance & Regulatory</h3>
            <p class="text-cloud" style="font-size: 0.9375rem;">Management of registrations, certifications, audit trails and regulatory reporting across relevant jurisdictions.</p>
          </div>
          <div class="card glass-panel" style="padding: 2rem;">
            <h3 class="card-title">Production Planning</h3>
            <p class="text-cloud" style="font-size: 0.9375rem;">Production sequencing, workflow planning, and manufacturing oversight to keep aircraft programs on budget and on schedule.</p>
          </div>
          <div class="card glass-panel" style="padding: 2rem;">
            <h3 class="card-title">Insurance & Risk</h3>
            <p class="text-cloud" style="font-size: 0.9375rem;">Arrangement of hull, liability and crew insurance through aviation specialists, with annual review and claims support.</p>
          </div>
          <div class="card glass-panel" style="padding: 2rem;">
            <h3 class="card-title">Dispatch & Scheduling</h3>
            <p class="text-cloud" style="font-size: 0.9375rem;">Flight planning, slot coordination, handling, fuel sourcing and 24/7 trip support for every sector.</p>
          </div>
        </div>

        <div class="glass-panel-gold" style="padding: 3rem; border-radius: var(--radius-lg); text-align: center;">
          <h2 class="heading-md text-ivory" style="margin-bottom: 1rem;">Ownership, Without the Operational Burden.</h2>
          <p class="text-cloud" style="max-width: 600px; margin: 0 auto 2rem auto;">Request a tailored production and program proposal outlining build phases, operational budgets, and lifecycle support needs.</p>
          <a href="/contact" class="btn btn-gold btn-lg" data-link>Contact Aircraft Management</a>
        </div>
      </div>
    </section>
  `;
}
