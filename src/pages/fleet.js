import { getFallbackAircraftData } from '../js/database.js';

export function renderFleetPage() {
  const fleetData = getFallbackAircraftData();
  const categories = ['All', 'Ultra Long Range Jets', 'Long Range Jets', 'Super Midsize Jets', 'Heavy Jets', 'Light Jets', 'Very Light Jets', 'VIP Airliners'];

  return `
    <!-- Page Header Banner -->
    <section class="hero-section" style="min-height: 45vh; padding-top: calc(var(--header-height) + 2rem);">
      <img src="/assets/ramp-dusk.png" alt="Executive Fleet" class="hero-bg-media" />
      <div class="overlay-dark"></div>
      <div class="container hero-content animate-fade-in">
        <span class="eyebrow" style="margin-bottom: 0.5rem;">Program Portfolio</span>
        <h1 class="heading-xl text-ivory">The PRIVATECRAFT Aircraft Portfolio</h1>
        <p class="text-cloud" style="font-size: 1.125rem; max-width: 650px; margin-top: 1rem;">
          Explore our curated selection of aircraft programs, high-performance configurations, and manufacturing-ready platforms.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <!-- Filter tabs -->
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 3rem;" id="fleet-category-filters">
          ${categories.map((cat, idx) => `
            <button class="btn ${idx === 0 ? 'btn-gold' : 'btn-ghost'} btn-sm filter-tab-btn" data-category="${cat}">
              ${cat}
            </button>
          `).join('')}
        </div>

        <!-- Fleet Grid -->
        <div class="grid-3" id="fleet-grid-container">
          ${renderAircraftGridItems(fleetData)}
        </div>
      </div>
    </section>
  `;
}

function renderAircraftGridItems(items) {
  return items.map(aircraft => `
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
          <div><span style="color: var(--color-muted);">Range:</span> <strong class="text-ivory">${aircraft.range_nm} nm</strong></div>
          <div><span style="color: var(--color-muted);">Speed:</span> <strong class="text-ivory">${aircraft.cruise_speed_knots} kts</strong></div>
          <div><span style="color: var(--color-muted);">Passengers:</span> <strong class="text-ivory">${aircraft.max_passengers}</strong></div>
          <div><span style="color: var(--color-muted);">Cabin Height:</span> <strong class="text-ivory">${aircraft.cabin_height_ft} ft</strong></div>
        </div>

        <a href="/aircraft-sales/${aircraft.slug}" class="btn btn-outline btn-sm" data-link>Full Specs & Enquiry</a>
      </div>
    </div>
  `).join('');
}

export function afterRenderFleetPage() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const container = document.getElementById('fleet-grid-container');
  const allData = getFallbackAircraftData();

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('btn-gold');
        b.classList.add('btn-ghost');
      });
      btn.classList.remove('btn-ghost');
      btn.classList.add('btn-gold');

      const selectedCat = btn.getAttribute('data-category');
      const filtered = selectedCat === 'All' ? allData : allData.filter(item => item.category === selectedCat);
      
      if (container) {
        container.innerHTML = renderAircraftGridItems(filtered);
      }
    });
  });
}
