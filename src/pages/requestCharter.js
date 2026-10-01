import { submitBookingRequest } from '../js/database.js';
import { showAlert } from '../js/utils.js';

export function renderRequestCharterPage() {
  return `
    <!-- Page Header Banner -->
    <section class="hero-section" style="min-height: 40vh; padding-top: calc(var(--header-height) + 2rem);">
      <img src="/assets/cockpit-detail.png" alt="Manufacturing Consultation Request" class="hero-bg-media" />
      <div class="overlay-dark"></div>
      <div class="container hero-content animate-fade-in" style="text-align: center; margin: 0 auto;">
        <span class="eyebrow" style="margin-bottom: 0.5rem;">Program Advisory</span>
        <h1 class="heading-xl text-ivory">Request a Manufacturing Consultation</h1>
        <p class="text-cloud" style="font-size: 1.0625rem; max-width: 650px; margin: 1rem auto 0 auto;">
          Share your aircraft concept, production needs, or engineering brief. Our team will assess the scope, technical path, and program roadmap.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container" style="max-width: 900px;">
        <div class="glass-panel" style="padding: 3rem; border-radius: var(--radius-md);">
          <form id="charter-quote-form">
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid var(--color-card-border); padding-bottom: 1.5rem; flex-wrap: wrap;">
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; color: var(--color-ivory);">
                <input type="radio" name="trip_type" value="New Design" checked /> New Design
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; color: var(--color-ivory);">
                <input type="radio" name="trip_type" value="Production Program" /> Production Program
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; color: var(--color-ivory);">
                <input type="radio" name="trip_type" value="Certification / Modernisation" /> Certification / Modernisation
              </label>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label" for="departure_location">Project Location / Facility</label>
                <input type="text" id="departure_location" class="form-input" placeholder="e.g. London design centre or regional production hub" required />
              </div>

              <div class="form-group">
                <label class="form-label" for="destination_location">Target Aircraft / Program</label>
                <input type="text" id="destination_location" class="form-input" placeholder="e.g. Executive aircraft, cargo aircraft, mission system" required />
              </div>

              <div class="form-group">
                <label class="form-label" for="departure_date">Planned Start Date</label>
                <input type="date" id="departure_date" class="form-input" required />
              </div>

              <div class="form-group">
                <label class="form-label" for="return_date">Project Completion Target</label>
                <input type="date" id="return_date" class="form-input" />
              </div>

              <div class="form-group">
                <label class="form-label" for="passengers_count">Program Scale</label>
                <input type="number" id="passengers_count" class="form-input" min="1" max="1000" value="1" required />
              </div>

              <div class="form-group">
                <label class="form-label" for="preferred_category">Manufacturing Focus</label>
                <select id="preferred_category" class="form-select">
                  <option value="Any Focus">Advisory Recommendation</option>
                  <option value="Airframe Engineering">Airframe Engineering</option>
                  <option value="Program Manufacturing">Program Manufacturing</option>
                  <option value="Systems Integration">Systems Integration</option>
                  <option value="Interior & Completion">Interior & Completion</option>
                  <option value="Certification Support">Certification Support</option>
                  <option value="Modernisation">Modernisation</option>
                </select>
              </div>
            </div>

            <div style="margin-top: 1rem; border-top: 1px solid var(--color-card-border); padding-top: 2rem;">
              <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--color-ivory); margin-bottom: 1.5rem;">Contact Information</h3>
              <div class="grid-2">
                <div class="form-group">
                  <label class="form-label" for="client_name">Full Name</label>
                  <input type="text" id="client_name" class="form-input" placeholder="Full Name" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="client_email">Email Address</label>
                  <input type="email" id="client_email" class="form-input" placeholder="executive@company.com" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="client_phone">Phone / WhatsApp Number</label>
                  <input type="tel" id="client_phone" class="form-input" placeholder="+44 7000 000000" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="additional_notes">Project Notes</label>
                  <input type="text" id="additional_notes" class="form-input" placeholder="e.g. mission profile, certification requirements, timeline" />
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-gold btn-lg w-full" id="quote-submit-btn" style="width: 100%; margin-top: 2rem;">
              Submit Consultation Request
            </button>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function afterRenderRequestCharterPage() {
  const form = document.getElementById('charter-quote-form');
  const submitBtn = document.getElementById('quote-submit-btn');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting Quote Request...';

    const formData = {
      trip_type: form.querySelector('input[name="trip_type"]:checked')?.value || 'One Way',
      departure_location: document.getElementById('departure_location').value,
      destination_location: document.getElementById('destination_location').value,
      departure_date: document.getElementById('departure_date').value,
      return_date: document.getElementById('return_date').value || null,
      passengers_count: parseInt(document.getElementById('passengers_count').value, 10),
      preferred_category: document.getElementById('preferred_category').value,
      client_name: document.getElementById('client_name').value,
      client_email: document.getElementById('client_email').value,
      client_phone: document.getElementById('client_phone').value,
      additional_notes: document.getElementById('additional_notes').value,
      created_at: new Date().toISOString()
    };

    const res = await submitBookingRequest(formData);

    if (res.success) {
      showAlert('Thank you! Your manufacturing consultation request has been received. A program advisor will contact you shortly.', 'info');
      form.reset();
    } else {
      showAlert('Error submitting request. Please try again or contact us directly.', 'error');
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Consultation Request';
  });
}
