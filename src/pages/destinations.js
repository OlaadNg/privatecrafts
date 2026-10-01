export function renderDestinationsPage() {
  const destinations = [
    { city: 'London', airport: 'London Biggin Hill (EGKB) / Farnborough (EGLF)', country: 'United Kingdom', desc: 'Direct access to Europe’s financial capital with dedicated private FBO facilities.', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80' },
    { city: 'Lagos', airport: 'Murtala Muhammed International (DNMM)', country: 'Nigeria', desc: 'Seamless VIP handling and swift transfers for West African corporate travel.', img: 'https://images.unsplash.com/photo-1618828665011-0abd973f7ad8?auto=format&fit=crop&w=800&q=80' },
    { city: 'Geneva', airport: 'Geneva Cointrin (LSGG)', country: 'Switzerland', desc: 'Gateway to Swiss banking and alpine ski resorts with express apron turnarounds.', img: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80' },
    { city: 'Dubai', airport: 'Dubai World Central (OMDW) / Al Maktoum', country: 'United Arab Emirates', desc: 'Ultra-luxurious VIP terminal facilities connecting East and West.', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80' },
    { city: 'New York', airport: 'Teterboro (KTEB) / Westchester (KHPN)', country: 'United States', desc: 'Minutes from Manhattan via private helicopter shuttle transfer.', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80' },
    { city: 'Paris', airport: 'Paris Le Bourget (LFPB)', country: 'France', desc: 'Europe’s premier dedicated business aviation airport.', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80' }
  ];

  return `
    <!-- Page Header Banner -->
    <section class="hero-section" style="min-height: 45vh; padding-top: calc(var(--header-height) + 2rem);">
      <img src="/assets/hero-bg.png" alt="Global Destinations" class="hero-bg-media" />
      <div class="overlay-dark"></div>
      <div class="container hero-content animate-fade-in">
        <span class="eyebrow" style="margin-bottom: 0.5rem;">Global Reach</span>
        <h1 class="heading-xl text-ivory">Strategic Aerospace Hubs & Program Corridors</h1>
        <p class="text-cloud" style="font-size: 1.125rem; max-width: 650px; margin-top: 1rem;">
          Discover the production, engineering, and service hubs that support our aircraft manufacturing and integration programs worldwide.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="grid-3">
          ${destinations.map(d => `
            <div class="card">
              <div class="card-img-wrapper">
                <img src="${d.img}" alt="${d.city}" />
                <span class="badge badge-gold" style="position: absolute; top: 1rem; left: 1rem;">${d.country}</span>
              </div>
              <div class="card-body">
                <h3 class="card-title">${d.city}</h3>
                <div style="font-size: 0.75rem; color: var(--color-gold); font-weight: 600; margin-bottom: 0.75rem;">${d.airport}</div>
                <p class="text-cloud" style="font-size: 0.875rem; margin-bottom: 1.5rem;">${d.desc}</p>
                <a href="/request-charter?destination=${encodeURIComponent(d.city)}" class="btn btn-outline btn-sm" data-link>Discuss ${d.city} Program</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
