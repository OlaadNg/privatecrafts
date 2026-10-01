export function renderGalleryPage() {
  const media = [
    { title: 'Flagship on the ramp at dusk', url: '/assets/ramp-dusk.png' },
    { title: 'A cabin designed for quiet hours', url: '/assets/cabin-interior.png' },
    { title: 'Light jet, ready for departure', url: '/assets/falcon8x-featured.png' },
    { title: 'Arrival, arranged', url: '/assets/flagship.png' },
    { title: 'Cruise above the weather', url: '/assets/cockpit-detail.png' },
    { title: 'Materials, considered', url: '/assets/g700-featured.png' },
    { title: 'Detail at the door', url: '/assets/global8000-featured.png' },
    { title: 'Where business meets the coastline', url: '/assets/legacy600-featured.png' },
    { title: 'Turn to final', url: '/assets/hero-bg.png' },
    { title: 'Prepared for the next sector', url: '/assets/ramp-dusk.png' },
    { title: 'Space to think at altitude', url: '/assets/cabin-interior.png' },
    { title: 'A city viewed from above', url: '/assets/flagship.png' }
  ];

  return `
    <section class="section-padding" style="padding-top: calc(var(--header-height) + 3rem);">
      <div class="container">
        <div style="max-width: 800px; margin-bottom: 4rem;">
          <span class="eyebrow">Visual Gallery</span>
          <h1 class="heading-xl text-ivory" style="margin-top: 0.5rem; margin-bottom: 1.5rem;">
            PRIVATECRAFT Media Gallery
          </h1>
          <p class="text-cloud" style="font-size: 1.125rem;">
            Explore photography of our aircraft programs, bespoke cabin interiors, manufacturing facilities, and premium aerospace experiences.
          </p>
        </div>

        <div class="grid-3">
          ${media.map(m => `
            <div class="card">
              <div class="card-img-wrapper" style="padding-top: 75%;">
                <img src="${m.url}" alt="${m.title}" />
              </div>
              <div class="card-body" style="padding: 1.25rem;">
                <h4 style="font-size: 1.0625rem;" class="text-ivory">${m.title}</h4>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
