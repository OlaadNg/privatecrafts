export function renderCareersPage() {
  return `
    <section class="section-padding" style="padding-top: calc(var(--header-height) + 3rem);">
      <div class="container">
        <div style="max-width: 800px; margin-bottom: 4rem;">
          <span class="eyebrow">Join Our Team</span>
          <h1 class="heading-xl text-ivory" style="margin-top: 0.5rem; margin-bottom: 1.5rem;">
            Careers at PRIVATECRAFT
          </h1>
          <p class="text-cloud" style="font-size: 1.125rem;">
            We are building a team of aerospace engineers, manufacturing specialists, design experts, and program leaders who thrive on technical precision and ambitious production delivery.
          </p>
        </div>

        <div class="glass-panel" style="padding: 2.5rem; margin-bottom: 3rem;">
          <h3 class="heading-md text-ivory" style="margin-bottom: 1.5rem;">Current Open Opportunities</h3>
          
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div style="border-bottom: 1px solid var(--color-card-border); padding-bottom: 1.5rem;">
              <span class="badge badge-gold" style="margin-bottom: 0.5rem;">London / Mayfair</span>
              <h4 style="font-size: 1.25rem;" class="text-ivory">Senior Aircraft Design Engineer</h4>
              <p class="text-cloud" style="font-size: 0.875rem; margin-top: 0.25rem;">Lead concept development, aerodynamic refinement, and structural analysis for new aircraft and mission-focused platforms.</p>
            </div>

            <div style="border-bottom: 1px solid var(--color-card-border); padding-bottom: 1.5rem;">
              <span class="badge badge-gold" style="margin-bottom: 0.5rem;">Geneva / Remote</span>
              <h4 style="font-size: 1.25rem;" class="text-ivory">Manufacturing Program Manager</h4>
              <p class="text-cloud" style="font-size: 0.875rem; margin-top: 0.25rem;">Coordinate production planning, material flow, supplier integration, and program milestones across complex aircraft builds.</p>
            </div>
          </div>
        </div>

        <div class="glass-panel-gold" style="padding: 2.5rem; text-align: center; border-radius: var(--radius-md);">
          <h3 class="heading-md text-ivory" style="margin-bottom: 1rem;">Speculative Applications</h3>
          <p class="text-cloud" style="margin-bottom: 1.5rem;">Send your CV and introductory letter directly to our talent team.</p>
          <a href="mailto:careers@privatecraft.com" class="btn btn-gold btn-lg">Email careers@privatecraft.com</a>
        </div>
      </div>
    </section>
  `;
}
