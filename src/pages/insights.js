export function renderInsightsPage() {
  const articles = [
    { title: 'Lagos to London, Privately', date: 'August 2026', category: 'Destinations', excerpt: 'Planning the non-stop corridor between West Africa and Europe for corporate executives and private families.', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80' },
    { title: 'The Rise of Ultra-Long-Range Flagships', date: 'July 2026', category: 'Market Report', excerpt: 'How the Gulfstream G700 and Bombardier Global 8000 are redefining intercontinental business travel.', img: 'https://images.unsplash.com/photo-1559687123-a55f280ce1c7?auto=format&fit=crop&w=800&q=80' },
    { title: 'Sustainable Aviation Fuel (SAF) Integration', date: 'June 2026', category: 'Sustainability', excerpt: 'Evaluating carbon offset programs and SAF availability across European and Middle Eastern FBO hubs.', img: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=800&q=80' }
  ];

  return `
    <section class="section-padding" style="padding-top: calc(var(--header-height) + 3rem);">
      <div class="container">
        <div style="max-width: 800px; margin-bottom: 4rem;">
          <span class="eyebrow">Aviation Advisory</span>
          <h1 class="heading-xl text-ivory" style="margin-top: 0.5rem; margin-bottom: 1.5rem;">
            Market Insights & Industry Intelligence
          </h1>
          <p class="text-cloud" style="font-size: 1.125rem;">
            Analysis, fleet reports, and travel guides curated by PRIVATECRAFT aviation specialists.
          </p>
        </div>

        <div class="grid-3">
          ${articles.map(art => `
            <div class="card">
              <div class="card-img-wrapper">
                <img src="${art.img}" alt="${art.title}" />
                <span class="badge badge-gold" style="position: absolute; top: 1rem; left: 1rem;">${art.category}</span>
              </div>
              <div class="card-body">
                <div style="font-size: 0.75rem; color: var(--color-muted); margin-bottom: 0.5rem;">${art.date}</div>
                <h3 class="card-title">${art.title}</h3>
                <p class="text-cloud" style="font-size: 0.875rem; margin-bottom: 1.5rem;">${art.excerpt}</p>
                <a href="#" class="btn btn-outline btn-sm" onclick="alert('Full article available upon request to our advisory team.'); return false;">Read Briefing</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
