import { submitContactMessage } from '../js/database.js';
import { showAlert } from '../js/utils.js';

export function renderContactPage() {
  return `
    <!-- Page Header Banner -->
    <section class="hero-section" style="min-height: 40vh; padding-top: calc(var(--header-height) + 2rem);">
      <img src="/assets/flagship.png" alt="Contact Advisory" class="hero-bg-media" />
      <div class="overlay-dark"></div>
      <div class="container hero-content animate-fade-in">
        <span class="eyebrow" style="margin-bottom: 0.5rem;">Engineering Enquiries</span>
        <h1 class="heading-xl text-ivory">Speak With Our Manufacturing Team</h1>
        <p class="text-cloud" style="font-size: 1.0625rem; max-width: 650px; margin-top: 0.75rem;">
          Our aerospace specialists are available to assess aircraft concepts, production programs, and certification pathways across the full lifecycle.
        </p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="grid-2" style="gap: 4rem; align-items: flex-start;">
          <div>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;" class="text-ivory">
              <div>
                <span class="eyebrow">Mayfair Headquarters</span>
                <p style="font-size: 1.125rem; font-family: var(--font-heading); margin-top: 0.25rem;">Mayfair, London W1J 7NT, United Kingdom</p>
              </div>

              <div>
                <span class="eyebrow">Direct Contact</span>
                <p style="font-size: 1rem; margin-top: 0.25rem;"><strong style="color: var(--color-gold);">Telephone:</strong> +44 20 7946 0912</p>
                <p style="font-size: 1rem;"><strong style="color: var(--color-gold);">Email:</strong> engineering@privatecraft.com</p>
              </div>

              <div>
                <a href="https://wa.me/442079460912?text=Hello%20PRIVATECRAFT%2C%20I%20would%20like%20to%20discuss%20an%20aircraft%20manufacturing%20project" target="_blank" class="btn btn-outline btn-lg" style="margin-top: 1rem;">
                  💬 Connect via Manufacturing Enquiry
                </a>
              </div>
            </div>
          </div>

          <div class="glass-panel" style="padding: 2.5rem; border-radius: var(--radius-md);">
            <h2 class="heading-md text-ivory" style="margin-bottom: 1.5rem;">Send a Program Enquiry</h2>
            <form id="contact-form">
              <div class="form-group">
                <label class="form-label" for="contact_name">Full Name</label>
                <input type="text" id="contact_name" class="form-input" placeholder="Your name" required />
              </div>

              <div class="form-group">
                <label class="form-label" for="contact_email">Email Address</label>
                <input type="email" id="contact_email" class="form-input" placeholder="name@domain.com" required />
              </div>

              <div class="form-group">
                <label class="form-label" for="contact_phone">Phone / WhatsApp</label>
                <input type="tel" id="contact_phone" class="form-input" placeholder="+44 7000 000000" />
              </div>

              <div class="form-group">
                <label class="form-label" for="contact_subject">Inquiry Type</label>
                <select id="contact_subject" class="form-select">
                  <option value="Aircraft Manufacturing">Aircraft Manufacturing</option>
                  <option value="Airframe Engineering">Airframe Engineering</option>
                  <option value="Production Systems">Production Systems</option>
                  <option value="Design & Integration">Design & Integration</option>
                  <option value="Certification Support">Certification Support</option>
                  <option value="General Inquiry">General Engineering Inquiry</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact_message">Message Details</label>
                <textarea id="contact_message" class="form-textarea" rows="4" placeholder="Tell us about your aircraft concept, facility needs, or production brief." required></textarea>
              </div>

              <button type="submit" class="btn btn-gold btn-lg w-full" id="contact-submit-btn" style="width: 100%;">
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function afterRenderContactPage() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('contact-submit-btn');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Sending Message...';

    const payload = {
      full_name: document.getElementById('contact_name').value,
      email: document.getElementById('contact_email').value,
      phone: document.getElementById('contact_phone').value,
      subject: document.getElementById('contact_subject').value,
      message: document.getElementById('contact_message').value,
      created_at: new Date().toISOString()
    };

    const res = await submitContactMessage(payload);
    if (res.success) {
      showAlert('Your message has been sent successfully. An advisor will contact you.', 'info');
      form.reset();
    } else {
      showAlert('Error sending message. Please try again.', 'error');
    }

    btn.disabled = false;
    btn.textContent = 'Send Message';
  });
}
