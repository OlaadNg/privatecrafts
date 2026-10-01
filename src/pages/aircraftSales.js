import { getFallbackAircraftData } from '../js/database.js';
import { formatCurrency } from '../js/utils.js';

export function renderAircraftSalesPage() {
  const salesData = getFallbackAircraftData();

  return `
    <!-- Page Header Banner -->
    <section class="hero-section" style="min-height: 45vh; padding-top: calc(var(--header-height) + 2rem);">
      <img src="/assets/flagship.png" alt="Aircraft Sales & Acquisitions" class="hero-bg-media" />
      <div class="overlay-dark"></div>
      <div class="container hero-content animate-fade-in">
        <span class="eyebrow" style="margin-bottom: 0.5rem;">Sales & Acquisitions</span>
        <h1 class="heading-xl text-ivory">Aircraft For Sale & Acquisitions</h1>
        <p class="text-cloud" style="font-size: 1.125rem; max-width: 650px; margin-top: 1rem;">
          View active listings from our inventory of premier private jets, available for immediate purchase or lease assignment worldwide.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="grid-3">
          ${salesData.map(aircraft => `
            <div class="card">
              <div class="card-img-wrapper">
                <img src="${aircraft.image_url}" alt="${aircraft.title}" />
                <span class="badge ${aircraft.status === 'For Sale' ? 'badge-gold' : 'badge-cloud'}" style="position: absolute; top: 1rem; left: 1rem;">
                  ${aircraft.status}
                </span>
              </div>
              <div class="card-body">
                <div style="font-size: 0.75rem; color: var(--color-gold); font-weight: 600; margin-bottom: 0.25rem;">${aircraft.year} • ${aircraft.manufacturer}</div>
                <h3 class="card-title">${aircraft.title}</h3>
                
                <div style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--color-gold); font-weight: 600; margin-bottom: 1rem;">
                  ${formatCurrency(aircraft.price_usd)}
                </div>

                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.8125rem; border-top: 1px solid var(--color-card-border); padding-top: 1rem; margin-bottom: 1.5rem;">
                  <div><span style="color: var(--color-muted);">S/N:</span> <strong class="text-ivory">${aircraft.serial_number}</strong></div>
                  <div><span style="color: var(--color-muted);">Reg:</span> <strong class="text-ivory">${aircraft.registration}</strong></div>
                  <div><span style="color: var(--color-muted);">Total Time:</span> <strong class="text-ivory">${aircraft.total_time_hours} hrs</strong></div>
                  <div><span style="color: var(--color-muted);">Location:</span> <strong class="text-ivory">${aircraft.location.split('(')[0]}</strong></div>
                </div>

                <a href="/aircraft-sales/${aircraft.slug}" class="btn btn-gold btn-sm" data-link>View Full Listing & Specs</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
