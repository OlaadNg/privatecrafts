export function renderTeamPage() {
  const team = [
    { name: 'Alexander Sterling', role: 'Chief Executive Officer', bio: 'Over 20 years leading aerospace program strategy, aircraft development, and manufacturing transformation.', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80' },
    { name: 'Elena Rostova', role: 'Head of Design & Integration', bio: 'Specialising in premium aircraft interiors, systems architecture, and mission-driven cabin configuration.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
    { name: 'Marcus Vance', role: 'Director of Manufacturing Operations', bio: 'Focused on production strategy, supplier coordination, quality assurance, and scalable aircraft assembly delivery.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80' }
  ];

  return `
    <section class="section-padding" style="padding-top: calc(var(--header-height) + 3rem);">
      <div class="container">
        <div style="max-width: 800px; margin-bottom: 4rem;">
          <span class="eyebrow">Leadership</span>
          <h1 class="heading-xl text-ivory" style="margin-top: 0.5rem; margin-bottom: 1.5rem;">
            Leadership & Advisory Board
          </h1>
          <p class="text-cloud" style="font-size: 1.125rem;">
            Meet the aerospace leaders steering PRIVATECRAFT's concept development, engineering programs, and manufacturing excellence.
          </p>
        </div>

        <div class="grid-3">
          ${team.map(m => `
            <div class="card">
              <div class="card-img-wrapper">
                <img src="${m.img}" alt="${m.name}" />
              </div>
              <div class="card-body">
                <h3 class="card-title">${m.name}</h3>
                <div style="font-size: 0.75rem; color: var(--color-gold); font-weight: 600; margin-bottom: 1rem;">${m.role}</div>
                <p class="text-cloud" style="font-size: 0.875rem;">${m.bio}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
