import { getFallbackAircraftData } from '../js/database.js';
import { formatCurrency, showAlert } from '../js/utils.js';

export function renderAircraftSalesDetailPage(params) {
  const slug = params.slug;
  const list = getFallbackAircraftData();
  const aircraft = list.find(a => a.slug === slug) || list[0];

  return `
    <section class="section-padding" style="padding-top: calc(var(--header-height) + 2rem);">
      <div class="container">
        <a href="/aircraft-sales" class="btn btn-ghost btn-sm" data-link style="margin-bottom: 2rem;">&larr; Back to Sales Inventory</a>

        <div class="grid-2" style="align-items: flex-start; gap: 3rem; margin-bottom: 4rem;">
          <div>
            <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--color-card-border);">
              <img src="${aircraft.image_url}" alt="${aircraft.title}" id="main-gallery-img" style="width: 100%; height: 420px; object-fit: cover;" />
              <span class="badge ${aircraft.status === 'For Sale' ? 'badge-gold' : 'badge-cloud'}" style="position: absolute; top: 1rem; left: 1rem;">
                ${aircraft.status}
              </span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
              ${aircraft.gallery.map(img => `
                <img src="${img}" alt="Gallery thumbnail" class="gallery-thumb" style="width: 100%; height: 100px; object-fit: cover; border-radius: var(--radius-xs); cursor: pointer; border: 1px solid var(--color-card-border);" />
              `).join('')}
            </div>
          </div>

          <div>
            <span class="eyebrow">${aircraft.category} • ${aircraft.year}</span>
            <h1 class="heading-lg text-ivory" style="margin-top: 0.5rem; margin-bottom: 1rem;">${aircraft.title}</h1>
            
            <div style="font-family: var(--font-heading); font-size: 2.25rem; color: var(--color-gold); font-weight: 600; margin-bottom: 1.5rem;">
              ${formatCurrency(aircraft.price_usd)}
            </div>

            <p class="text-cloud" style="font-size: 1.0625rem; line-height: 1.7; margin-bottom: 2rem;">
              ${aircraft.interior_description}
            </p>

            <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem;">
              <h3 style="font-size: 1.125rem; margin-bottom: 1rem;" class="text-ivory">Key Aircraft Highlights</h3>
              <ul style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 0.5rem; font-size: 0.875rem;" class="text-cloud">
                ${aircraft.features.map(f => `<li style="display: flex; align-items: center; gap: 0.5rem;"><span class="text-gold">✓</span> ${f}</li>`).join('')}
              </ul>
            </div>

            <div style="display: flex; gap: 1rem;">
              <button class="btn btn-gold btn-lg" id="inquire-aircraft-btn">Inquire About This Aircraft</button>
              <a href="https://wa.me/442079460912?text=Inquiry%20regarding%20${encodeURIComponent(aircraft.title)}" target="_blank" class="btn btn-outline btn-lg">WhatsApp Sales</a>
            </div>
          </div>
        </div>

        <!-- Detailed Technical Specifications -->
        <div class="glass-panel" style="padding: 2.5rem; margin-bottom: 4rem;">
          <h2 class="heading-md text-ivory" style="margin-bottom: 2rem;">Technical & Operational Specifications</h2>

          <div class="grid-2" style="gap: 3rem;">
            <div>
              <h4 class="eyebrow" style="margin-bottom: 1rem;">Airframe & Performance</h4>
              <table style="width: 100%; font-size: 0.875rem; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid var(--color-card-border);">
                  <td style="padding: 0.75rem 0; color: var(--color-muted);">Serial Number</td>
                  <td style="padding: 0.75rem 0; text-align: right;" class="text-ivory">${aircraft.serial_number}</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--color-card-border);">
                  <td style="padding: 0.75rem 0; color: var(--color-muted);">Registration</td>
                  <td style="padding: 0.75rem 0; text-align: right;" class="text-ivory">${aircraft.registration}</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--color-card-border);">
                  <td style="padding: 0.75rem 0; color: var(--color-muted);">Total Time / Landings</td>
                  <td style="padding: 0.75rem 0; text-align: right;" class="text-ivory">${aircraft.total_time_hours} hrs / ${aircraft.total_landings} cycles</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--color-card-border);">
                  <td style="padding: 0.75rem 0; color: var(--color-muted);">Maximum Range</td>
                  <td style="padding: 0.75rem 0; text-align: right;" class="text-ivory">${aircraft.range_nm} nautical miles</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--color-card-border);">
                  <td style="padding: 0.75rem 0; color: var(--color-muted);">High Speed Cruise</td>
                  <td style="padding: 0.75rem 0; text-align: right;" class="text-ivory">${aircraft.cruise_speed_knots} knots</td>
                </tr>
              </table>
            </div>

            <div>
              <h4 class="eyebrow" style="margin-bottom: 1rem;">Cabin & Interior Specs</h4>
              <table style="width: 100%; font-size: 0.875rem; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid var(--color-card-border);">
                  <td style="padding: 0.75rem 0; color: var(--color-muted);">Passenger Capacity</td>
                  <td style="padding: 0.75rem 0; text-align: right;" class="text-ivory">${aircraft.max_passengers} Passengers</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--color-card-border);">
                  <td style="padding: 0.75rem 0; color: var(--color-muted);">Cabin Length / Height</td>
                  <td style="padding: 0.75rem 0; text-align: right;" class="text-ivory">${aircraft.cabin_length_ft} ft / ${aircraft.cabin_height_ft} ft</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--color-card-border);">
                  <td style="padding: 0.75rem 0; color: var(--color-muted);">Baggage Volume</td>
                  <td style="padding: 0.75rem 0; text-align: right;" class="text-ivory">${aircraft.baggage_cubic_ft} cu ft</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--color-card-border);">
                  <td style="padding: 0.75rem 0; color: var(--color-muted);">Exterior Finish</td>
                  <td style="padding: 0.75rem 0; text-align: right;" class="text-ivory">${aircraft.exterior_finish}</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--color-card-border);">
                  <td style="padding: 0.75rem 0; color: var(--color-muted);">Base Location</td>
                  <td style="padding: 0.75rem 0; text-align: right;" class="text-ivory">${aircraft.location}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function afterRenderAircraftSalesDetailPage() {
  const mainImg = document.getElementById('main-gallery-img');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      if (mainImg) mainImg.src = t.src;
    });
  });

  const btn = document.getElementById('inquire-aircraft-btn');
  btn?.addEventListener('click', () => {
    showAlert('Thank you for your interest! A PRIVATECRAFT sales broker has been assigned to your request.', 'info');
  });
}
