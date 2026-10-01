export function renderFaqPage() {
  const faqs = [
    { q: 'What kind of aircraft manufacturing services does PRIVATECRAFT provide?', a: 'We support modern aircraft and aerospace programs across design engineering, structural development, production planning, systems integration, interiors, and certification coordination.' },
    { q: 'Can PRIVATECRAFT support custom aircraft programs?', a: 'Yes. We tailor programs around mission profile, cabin configuration, operational requirements, certification path, and production timeline.' },
    { q: 'How does the manufacturing process begin?', a: 'Every project starts with a discovery phase covering concept fit, engineering requirements, performance targets, and priority milestones before we scope design and production work.' },
    { q: 'Do you support certification and regulatory compliance?', a: 'Yes. Our team works with compliance, validation, and airworthiness planning to move concept work toward production and regulatory sign-off.' },
    { q: 'What sectors do you serve?', a: 'We work across executive aviation, premium aircraft completion, specialised mission platforms, and advanced aerospace manufacturing programs.' }
  ];

  return `
    <section class="section-padding" style="padding-top: calc(var(--header-height) + 3rem);">
      <div class="container" style="max-width: 900px;">
        <div style="text-align: center; margin-bottom: 4rem;">
          <span class="eyebrow">Client Support</span>
          <h1 class="heading-xl text-ivory" style="margin-top: 0.5rem; margin-bottom: 1rem;">
            Frequently Asked Questions
          </h1>
          <p class="text-cloud" style="font-size: 1.0625rem;">
            Answers to common queries regarding aircraft engineering, manufacturing workflows, program delivery, and certification support.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          ${faqs.map(faq => `
            <div class="glass-panel" style="padding: 2rem;">
              <h3 style="font-size: 1.25rem; margin-bottom: 0.75rem;" class="text-ivory">${faq.q}</h3>
              <p class="text-cloud" style="font-size: 0.9375rem; line-height: 1.7;">${faq.a}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
