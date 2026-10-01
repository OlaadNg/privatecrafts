import { getCurrentUser, signOutUser } from '../js/auth.js';

export function renderDashboardPage() {
  return `
    <section class="section-padding" style="padding-top: calc(var(--header-height) + 3rem);">
      <div class="container">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 3rem;">
          <div>
            <span class="eyebrow">Client Portal</span>
            <h1 class="heading-lg text-ivory" style="margin-top: 0.5rem;" id="user-greeting">Welcome, Esteemed Client</h1>
          </div>
          <button class="btn btn-outline btn-sm" id="signout-btn">Sign Out</button>
        </div>

        <div class="grid-3" style="margin-bottom: 3rem;">
          <div class="card glass-panel" style="padding: 2rem;">
            <div style="font-size: 0.75rem; color: var(--color-gold); font-weight: 600;">ACTIVE MANUFACTURING BRIEFS</div>
            <div style="font-family: var(--font-heading); font-size: 3rem;" class="text-ivory">01</div>
            <p class="text-cloud" style="font-size: 0.875rem;">Executive aircraft concept review • Pending engineering assessment</p>
          </div>

          <div class="card glass-panel" style="padding: 2rem;">
            <div style="font-size: 0.75rem; color: var(--color-gold); font-weight: 600;">SAVED AIRCRAFT</div>
            <div style="font-family: var(--font-heading); font-size: 3rem;" class="text-ivory">02</div>
            <p class="text-cloud" style="font-size: 0.875rem;">2024 Gulfstream G700 & 2023 Global 8000</p>
          </div>

          <div class="card glass-panel" style="padding: 2rem;">
            <div style="font-size: 0.75rem; color: var(--color-gold); font-weight: 600;">DEDICATED ADVISOR</div>
            <div style="font-family: var(--font-heading); font-size: 1.5rem; margin-top: 0.5rem;" class="text-ivory">Elena Rostova</div>
            <p class="text-cloud" style="font-size: 0.875rem;">Mayfair Office • +44 20 7946 0912</p>
          </div>
        </div>

        <div class="glass-panel" style="padding: 2.5rem;">
          <h2 class="heading-md text-ivory" style="margin-bottom: 1.5rem;">Recent Program Activity</h2>
          <table style="width: 100%; font-size: 0.875rem; border-collapse: collapse;" class="text-cloud">
            <thead style="border-bottom: 1px solid var(--color-card-border); color: var(--color-gold); text-align: left;">
              <tr>
                <th style="padding: 0.75rem;">Brief ID</th>
                <th style="padding: 0.75rem;">Program</th>
                <th style="padding: 0.75rem;">Aircraft Type</th>
                <th style="padding: 0.75rem;">Date</th>
                <th style="padding: 0.75rem;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--color-card-border);">
                <td style="padding: 1rem 0.75rem;" class="text-ivory">#PC-9842</td>
                <td style="padding: 1rem 0.75rem;">Executive platform concept</td>
                <td style="padding: 1rem 0.75rem;">Long-range aircraft</td>
                <td style="padding: 1rem 0.75rem;">Sep 15, 2026</td>
                <td style="padding: 1rem 0.75rem;"><span class="badge badge-gold">In Processing</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

export function afterRenderDashboardPage() {
  getCurrentUser().then(user => {
    const greeting = document.getElementById('user-greeting');
    if (user && greeting) {
      greeting.textContent = `Welcome, ${user.user_metadata?.full_name || user.email}`;
    }
  });

  const signoutBtn = document.getElementById('signout-btn');
  signoutBtn?.addEventListener('click', () => {
    signOutUser();
  });
}
