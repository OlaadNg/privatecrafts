import { getCurrentUser, signOutUser } from '../js/auth.js';
import { supabase, navigate } from '../js/config.js';
import { getFallbackAircraftData } from '../js/database.js';

// ─────────────────────────────────────────────────────────────────────────────
// Render shell (tab content injected after auth check)
// ─────────────────────────────────────────────────────────────────────────────
export function renderAdminPage() {
  return `
    <div id="admin-root" style="min-height:100vh; padding-top: var(--header-height); display:flex; flex-direction:column;">
      <!-- Auth-check overlay while loading -->
      <div id="admin-auth-loader" style="
        flex:1; display:flex; align-items:center; justify-content:center;
        flex-direction:column; gap:1rem;">
        <div class="spinner-ring"></div>
        <p class="text-cloud" style="font-size:0.875rem;">Verifying credentials…</p>
      </div>

      <!-- Admin shell (hidden until auth confirmed) -->
      <div id="admin-shell" style="display:none; flex:1; display:none;">

        <!-- Top bar -->
        <div style="
          position:sticky; top:var(--header-height); z-index:90;
          background:rgba(8,10,13,0.97); backdrop-filter:blur(12px);
          border-bottom:1px solid var(--color-card-border);
          padding:0 2rem; height:56px;
          display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <span style="font-size:0.625rem; letter-spacing:0.2em; color:var(--color-gold); font-weight:700; text-transform:uppercase;">
              Admin Console
            </span>
            <span style="width:1px; height:14px; background:var(--color-card-border);"></span>
            <span id="admin-user-label" class="text-cloud" style="font-size:0.8125rem;"></span>
          </div>
          <button id="admin-signout-btn" class="btn btn-ghost btn-sm" style="font-size:0.8125rem;">
            Sign Out
          </button>
        </div>

        <div style="display:flex; flex:1;">

          <!-- Sidebar -->
          <aside style="
            width:220px; flex-shrink:0;
            background:rgba(8,10,13,0.6);
            border-right:1px solid var(--color-card-border);
            padding:1.5rem 0;
            position:sticky; top:calc(var(--header-height) + 56px);
            height:calc(100vh - var(--header-height) - 56px);
            overflow-y:auto;">

            <nav style="display:flex; flex-direction:column; gap:0.25rem; padding:0 0.75rem;">
              ${[
      { id: 'overview', icon: '◉', label: 'Overview' },
      { id: 'bookings', icon: '✈', label: 'Manufacturing Enquiries' },
      { id: 'messages', icon: '✉', label: 'Contact Messages' },
      { id: 'aircraft', icon: '◈', label: 'Aircraft Listings' },
      { id: 'users', icon: '◎', label: 'Users' },
      { id: 'settings', icon: '⚙', label: 'Settings' },
    ].map((item, i) => `
                <button class="admin-nav-btn ${i === 0 ? 'active' : ''}"
                  data-tab="${item.id}"
                  style="
                    display:flex; align-items:center; gap:0.75rem;
                    padding:0.625rem 0.875rem; border-radius:6px;
                    background:${i === 0 ? 'rgba(212,175,55,0.12)' : 'transparent'};
                    color:${i === 0 ? 'var(--color-gold)' : 'var(--color-cloud)'};
                    border:${i === 0 ? '1px solid rgba(212,175,55,0.25)' : '1px solid transparent'};
                    font-size:0.8125rem; font-weight:${i === 0 ? '600' : '400'};
                    cursor:pointer; width:100%; text-align:left; transition:all 0.2s;">
                  <span>${item.icon}</span>
                  <span>${item.label}</span>
                </button>
              `).join('')}
            </nav>
          </aside>

          <!-- Main content area -->
          <main id="admin-main" style="flex:1; padding:2rem 2.5rem; overflow-x:hidden;">
            <!-- Filled by tab renderer -->
          </main>
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// After render: auth guard + wire everything up
// ─────────────────────────────────────────────────────────────────────────────
export async function afterRenderAdminPage() {
  const loader = document.getElementById('admin-auth-loader');
  const shell = document.getElementById('admin-shell');

  const user = await getCurrentUser();

  // ── Not logged in at all ─────────────────────────────────────────────────
  if (!user) {
    navigate('/login');
    return;
  }

  // ── Check 1: Supabase app_metadata.role (set by SQL on auth.users) ───────
  const appMetaRole = user.app_metadata?.role;

  // ── Check 2: profiles table role column ─────────────────────────────────
  let profileRole = null;
  try {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    profileRole = data?.role || null;
  } catch { /* table may not exist yet — rely on app_metadata */ }

  const isAdmin = appMetaRole === 'admin' || profileRole === 'admin';

  if (!isAdmin) {
    // Show access denied instead of blank screen
    const root = document.getElementById('admin-root');
    if (root) {
      root.innerHTML = `
        <div style="
          min-height:100vh;
          padding-top:var(--header-height);
          display:flex;
          align-items:center;
          justify-content:center;
          flex-direction:column;
          gap:1.5rem;
          text-align:center;
          padding:2rem;
        ">
          <div style="font-size:3rem;">🔒</div>
          <h1 class="heading-lg text-ivory">Access Denied</h1>
          <p class="text-cloud" style="max-width:440px; font-size:0.9375rem; line-height:1.7;">
            Your account does not have administrator privileges.
            Contact the site owner if you believe this is an error.
          </p>
          <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;">
            <a href="/" class="btn btn-gold" data-link>Return Home</a>
            <button class="btn btn-ghost" onclick="import('../js/auth.js').then(m=>m.signOutUser())">
              Sign Out
            </button>
          </div>
        </div>
      `;
      // Re-attach data-link clicks
      root.querySelector('[data-link]')?.addEventListener('click', e => {
        e.preventDefault();
        navigate('/');
      });
    }
    return;
  }

  // Show shell, hide loader
  loader.style.display = 'none';
  shell.style.display = 'flex';
  shell.style.flexDirection = 'column';

  // Set username in top bar
  const label = document.getElementById('admin-user-label');
  if (label) label.textContent = user.email;

  // Sign out
  document.getElementById('admin-signout-btn')?.addEventListener('click', signOutUser);

  // Sidebar navigation
  document.querySelectorAll('.admin-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav-btn').forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'var(--color-cloud)';
        b.style.border = '1px solid transparent';
        b.style.fontWeight = '400';
        b.classList.remove('active');
      });
      btn.style.background = 'rgba(212,175,55,0.12)';
      btn.style.color = 'var(--color-gold)';
      btn.style.border = '1px solid rgba(212,175,55,0.25)';
      btn.style.fontWeight = '600';
      btn.classList.add('active');
      loadTab(btn.dataset.tab);
    });
  });

  // Load default tab
  loadTab('overview');
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab loader
// ─────────────────────────────────────────────────────────────────────────────
async function loadTab(tab) {
  const main = document.getElementById('admin-main');
  if (!main) return;

  main.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:200px;">
      <div class="spinner-ring"></div>
    </div>`;

  switch (tab) {
    case 'overview': main.innerHTML = await renderOverviewTab(); break;
    case 'bookings': main.innerHTML = await renderBookingsTab(); break;
    case 'messages': main.innerHTML = await renderMessagesTab(); break;
    case 'aircraft': main.innerHTML = await renderAircraftTab(); break;
    case 'users': main.innerHTML = await renderUsersTab(); break;
    case 'settings': main.innerHTML = renderSettingsTab(); break;
    default: main.innerHTML = await renderOverviewTab();
  }

  // Wire up tab-level interactions after render
  wireTabInteractions(tab);
}

// ─────────────────────────────────────────────────────────────────────────────
// OVERVIEW TAB
// ─────────────────────────────────────────────────────────────────────────────
async function renderOverviewTab() {
  // Fetch counts from Supabase (graceful fallback if tables don't exist yet)
  const [bookingsRes, messagesRes, aircraftRes] = await Promise.all([
    supabase.from('booking_requests').select('id, status', { count: 'exact' }).limit(5).order('created_at', { ascending: false }),
    supabase.from('contact_messages').select('id, created_at', { count: 'exact' }).limit(5).order('created_at', { ascending: false }),
    supabase.from('aircraft').select('id', { count: 'exact' }).limit(1),
  ]);

  const bookingCount = bookingsRes.count ?? bookingsRes.data?.length ?? '—';
  const messageCount = messagesRes.count ?? messagesRes.data?.length ?? '—';
  const aircraftCount = aircraftRes.count ?? aircraftRes.data?.length ?? getFallbackAircraftData().length;

  const recentBookings = bookingsRes.data || [];
  const recentMessages = messagesRes.data || [];

  return `
    <div>
      <div style="margin-bottom:2rem;">
        <span class="eyebrow">Admin Console</span>
        <h1 class="heading-lg text-ivory" style="margin-top:0.25rem;">Overview</h1>
        <p class="text-cloud" style="font-size:0.875rem; margin-top:0.25rem;">
          Live summary — ${new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <!-- KPI Cards -->
      <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:1.25rem; margin-bottom:2.5rem;">
        ${[
      { label: 'Manufacturing Enquiries', value: bookingCount, icon: '✈', color: 'var(--color-gold)' },
      { label: 'Contact Messages', value: messageCount, icon: '✉', color: '#60a5fa' },
      { label: 'Aircraft Listings', value: aircraftCount, icon: '◈', color: '#34d399' },
      { label: 'Active Users', value: '—', icon: '◎', color: '#f472b6' },
    ].map(k => `
          <div class="glass-panel" style="padding:1.5rem; border-radius:var(--radius-sm);">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem;">
              <span style="font-size:0.7rem; letter-spacing:0.12em; color:var(--color-muted); text-transform:uppercase; font-weight:600;">${k.label}</span>
              <span style="font-size:1.25rem; color:${k.color};">${k.icon}</span>
            </div>
            <div style="font-family:var(--font-heading); font-size:2.25rem; color:${k.color}; line-height:1;">${k.value}</div>
          </div>
        `).join('')}
      </div>

      <!-- Recent Bookings -->
      <div class="glass-panel" style="padding:1.75rem; border-radius:var(--radius-sm); margin-bottom:1.5rem;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.25rem;">
          <h2 style="font-family:var(--font-heading); font-size:1.25rem;" class="text-ivory">Recent Program Enquiries</h2>
          <button class="btn btn-outline btn-sm" onclick="document.querySelector('[data-tab=bookings]').click()">View All</button>
        </div>
        ${recentBookings.length === 0 ? `
          <p class="text-cloud" style="font-size:0.875rem; text-align:center; padding:2rem 0;">No manufacturing enquiries yet.</p>
        ` : `
          <table style="width:100%; font-size:0.8125rem; border-collapse:collapse;" class="text-cloud">
            <thead>
              <tr style="border-bottom:1px solid var(--color-card-border); color:var(--color-gold);">
                <th style="padding:0.625rem 0.75rem; text-align:left; font-weight:600;">ID</th>
                <th style="padding:0.625rem 0.75rem; text-align:left; font-weight:600;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${recentBookings.map(b => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                  <td style="padding:0.75rem;" class="text-ivory">${b.id?.slice(0, 8) || '—'}</td>
                  <td style="padding:0.75rem;"><span class="badge badge-gold">${b.status || 'Pending'}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `}
      </div>

      <!-- Recent Messages -->
      <div class="glass-panel" style="padding:1.75rem; border-radius:var(--radius-sm);">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.25rem;">
          <h2 style="font-family:var(--font-heading); font-size:1.25rem;" class="text-ivory">Recent Contact Messages</h2>
          <button class="btn btn-outline btn-sm" onclick="document.querySelector('[data-tab=messages]').click()">View All</button>
        </div>
        ${recentMessages.length === 0 ? `
          <p class="text-cloud" style="font-size:0.875rem; text-align:center; padding:2rem 0;">No messages yet.</p>
        ` : `
          <table style="width:100%; font-size:0.8125rem; border-collapse:collapse;" class="text-cloud">
            <thead>
              <tr style="border-bottom:1px solid var(--color-card-border); color:var(--color-gold);">
                <th style="padding:0.625rem 0.75rem; text-align:left; font-weight:600;">ID</th>
                <th style="padding:0.625rem 0.75rem; text-align:left; font-weight:600;">Received</th>
              </tr>
            </thead>
            <tbody>
              ${recentMessages.map(m => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                  <td style="padding:0.75rem;" class="text-ivory">${m.id?.slice(0, 8) || '—'}</td>
                  <td style="padding:0.75rem;">${m.created_at ? new Date(m.created_at).toLocaleDateString('en-GB') : '—'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `}
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// MANUFACTURING ENQUIRIES TAB
// ─────────────────────────────────────────────────────────────────────────────
async function renderBookingsTab() {
  const { data, error } = await supabase
    .from('booking_requests')
    .select('*')
    .order('created_at', { ascending: false });

  const rows = data || [];

  return `
    <div>
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <span class="eyebrow">Admin</span>
          <h1 class="heading-lg text-ivory" style="margin-top:0.25rem;">Manufacturing Enquiries</h1>
        </div>
        <span class="badge badge-gold" style="font-size:0.8125rem; padding:0.5rem 1rem;">${rows.length} Total</span>
      </div>

      ${rows.length === 0 ? `
        <div class="glass-panel" style="padding:4rem; text-align:center; border-radius:var(--radius-sm);">
          <p style="font-size:2rem; margin-bottom:0.75rem;">✈</p>
          <p class="text-cloud">No manufacturing enquiries have been submitted yet.</p>
        </div>
      ` : `
        <div style="overflow-x:auto;">
          <table id="bookings-table" style="width:100%; font-size:0.8125rem; border-collapse:collapse; min-width:800px;" class="text-cloud">
            <thead>
              <tr style="background:rgba(212,175,55,0.07); border-bottom:1px solid var(--color-card-border);">
                ${['Client', 'Email', 'Phone', 'Route', 'Pax', 'Date', 'Aircraft Pref', 'Status', 'Action'].map(h => `
                  <th style="padding:0.75rem 1rem; text-align:left; color:var(--color-gold); font-size:0.75rem; letter-spacing:0.08em; font-weight:700; text-transform:uppercase; white-space:nowrap;">${h}</th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${rows.map(b => `
                <tr data-id="${b.id}" style="border-bottom:1px solid rgba(255,255,255,0.05); transition:background 0.15s;"
                  onmouseenter="this.style.background='rgba(255,255,255,0.03)'"
                  onmouseleave="this.style.background='transparent'">
                  <td style="padding:0.875rem 1rem; font-weight:600;" class="text-ivory">${b.client_name || '—'}</td>
                  <td style="padding:0.875rem 1rem;">${b.client_email || '—'}</td>
                  <td style="padding:0.875rem 1rem;">${b.client_phone || '—'}</td>
                  <td style="padding:0.875rem 1rem;">
                    ${b.departure_location || '?'} <span style="color:var(--color-gold)">→</span> ${b.destination_location || '?'}
                  </td>
                  <td style="padding:0.875rem 1rem; text-align:center;">${b.passengers_count || '—'}</td>
                  <td style="padding:0.875rem 1rem; white-space:nowrap;">${b.departure_date ? new Date(b.departure_date).toLocaleDateString('en-GB') : '—'}</td>
                  <td style="padding:0.875rem 1rem;">${b.preferred_category || '—'}</td>
                  <td style="padding:0.875rem 1rem;">
                    <select class="status-select" data-table="booking_requests" data-id="${b.id}"
                      style="background:rgba(255,255,255,0.06); border:1px solid var(--color-card-border);
                             color:var(--color-ivory); padding:0.3rem 0.5rem; border-radius:4px; font-size:0.75rem; cursor:pointer;">
                      ${['Pending', 'In Review', 'Quoted', 'Confirmed', 'Completed', 'Cancelled'].map(s => `
                        <option value="${s}" ${(b.status || 'Pending') === s ? 'selected' : ''} >${s}</option>
                      `).join('')}
                    </select>
                  </td>
                  <td style="padding:0.875rem 1rem;">
                    <button class="btn btn-ghost btn-sm delete-row-btn" data-table="booking_requests" data-id="${b.id}"
                      style="color:#f87171; font-size:0.75rem;">Delete</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT MESSAGES TAB
// ─────────────────────────────────────────────────────────────────────────────
async function renderMessagesTab() {
  const { data } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  const rows = data || [];

  return `
    <div>
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <span class="eyebrow">Admin</span>
          <h1 class="heading-lg text-ivory" style="margin-top:0.25rem;">Contact Messages</h1>
        </div>
        <span class="badge badge-gold" style="font-size:0.8125rem; padding:0.5rem 1rem;">${rows.length} Total</span>
      </div>

      ${rows.length === 0 ? `
        <div class="glass-panel" style="padding:4rem; text-align:center; border-radius:var(--radius-sm);">
          <p style="font-size:2rem; margin-bottom:0.75rem;">✉</p>
          <p class="text-cloud">No contact messages yet.</p>
        </div>
      ` : `
        <div style="display:flex; flex-direction:column; gap:1rem;">
          ${rows.map(m => `
            <div class="glass-panel" style="padding:1.5rem; border-radius:var(--radius-sm);">
              <div style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:0.75rem; margin-bottom:0.75rem;">
                <div>
                  <div style="font-weight:700; font-size:1rem;" class="text-ivory">${m.full_name || m.name || '—'}</div>
                  <div style="font-size:0.8125rem; color:var(--color-gold);">${m.email || '—'} ${m.phone ? '· ' + m.phone : ''}</div>
                </div>
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <span style="font-size:0.75rem; color:var(--color-muted);">
                    ${m.created_at ? new Date(m.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                  </span>
                  <span class="badge" style="background:rgba(96,165,250,0.12); color:#60a5fa; border:1px solid rgba(96,165,250,0.25); font-size:0.7rem;">
                    ${m.subject || 'General'}
                  </span>
                  <button class="btn btn-ghost btn-sm delete-row-btn" data-table="contact_messages" data-id="${m.id}"
                    style="color:#f87171; font-size:0.75rem;">Delete</button>
                </div>
              </div>
              <p class="text-cloud" style="font-size:0.875rem; line-height:1.6; padding-top:0.75rem; border-top:1px solid var(--color-card-border);">
                ${m.message || '—'}
              </p>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// AIRCRAFT LISTINGS TAB
// ─────────────────────────────────────────────────────────────────────────────
async function renderAircraftTab() {
  // Try Supabase first, fall back to CSV dataset
  let rows = [];
  const { data, error } = await supabase.from('aircraft').select('*').order('featured', { ascending: false });
  rows = (data && data.length > 0) ? data : getFallbackAircraftData();

  return `
    <div>
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:2rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <span class="eyebrow">Admin</span>
          <h1 class="heading-lg text-ivory" style="margin-top:0.25rem;">Aircraft Listings</h1>
        </div>
        <div style="display:flex; gap:0.75rem;">
          <span class="badge badge-gold" style="font-size:0.8125rem; padding:0.5rem 1rem;">${rows.length} Listings</span>
        </div>
      </div>

      <div style="overflow-x:auto;">
        <table style="width:100%; font-size:0.8125rem; border-collapse:collapse; min-width:900px;" class="text-cloud">
          <thead>
            <tr style="background:rgba(212,175,55,0.07); border-bottom:1px solid var(--color-card-border);">
              ${['', 'Aircraft', 'Manufacturer', 'Category', 'Year', 'Price (USD)', 'Status', 'Range (nm)', 'Pax', 'Location'].map(h => `
                <th style="padding:0.75rem 1rem; text-align:left; color:var(--color-gold); font-size:0.7rem; letter-spacing:0.08em; font-weight:700; text-transform:uppercase; white-space:nowrap;">${h}</th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(a => `
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05); transition:background 0.15s;"
                onmouseenter="this.style.background='rgba(255,255,255,0.03)'"
                onmouseleave="this.style.background='transparent'">
                <td style="padding:0.75rem 1rem;">
                  <img src="${a.image_url || ''}" alt="${a.title}"
                    style="width:56px; height:36px; object-fit:cover; border-radius:4px; background:var(--color-bg-alt);"
                    onerror="this.style.display='none'" />
                </td>
                <td style="padding:0.75rem 1rem; font-weight:600;" class="text-ivory">${a.title}</td>
                <td style="padding:0.75rem 1rem;">${a.manufacturer}</td>
                <td style="padding:0.75rem 1rem;">${a.category}</td>
                <td style="padding:0.75rem 1rem;">${a.year}</td>
                <td style="padding:0.75rem 1rem; color:var(--color-gold); font-weight:600;">
                  $${Number(a.price_usd).toLocaleString()}
                </td>
                <td style="padding:0.75rem 1rem;">
                  <span class="badge ${a.status === 'For Sale' ? 'badge-gold' : ''}"
                    style="${a.status !== 'For Sale' ? 'background:rgba(100,116,139,0.2); color:var(--color-cloud); border:1px solid rgba(100,116,139,0.3);' : ''}">
                    ${a.status}
                  </span>
                </td>
                <td style="padding:0.75rem 1rem;">${Number(a.range_nm).toLocaleString()}</td>
                <td style="padding:0.75rem 1rem;">${a.max_passengers}</td>
                <td style="padding:0.75rem 1rem; max-width:140px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                  ${a.location || '—'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// USERS TAB
// ─────────────────────────────────────────────────────────────────────────────
async function renderUsersTab() {
  // admin.listUsers requires service_role key — show advisory note instead
  return `
    <div>
      <span class="eyebrow">Admin</span>
      <h1 class="heading-lg text-ivory" style="margin-top:0.25rem; margin-bottom:2rem;">Users</h1>

      <div class="glass-panel" style="padding:2.5rem; border-radius:var(--radius-sm); text-align:center;">
        <p style="font-size:2rem; margin-bottom:1rem;">◎</p>
        <h3 class="text-ivory" style="margin-bottom:0.75rem; font-family:var(--font-heading); font-size:1.25rem;">
          User Management via Supabase Dashboard
        </h3>
        <p class="text-cloud" style="font-size:0.875rem; max-width:480px; margin:0 auto 1.5rem auto; line-height:1.7;">
          Full user listing requires a service role key (server-side only) and cannot be safely exposed in a browser app.
          Manage your registered users directly in the Supabase Authentication dashboard.
        </p>
        <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer"
          class="btn btn-gold btn-lg">
          Open Supabase Dashboard ↗
        </a>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// SETTINGS TAB
// ─────────────────────────────────────────────────────────────────────────────
function renderSettingsTab() {
  const url = typeof import.meta !== 'undefined'
    ? (import.meta.env?.VITE_SUPABASE_URL || '—')
    : '—';

  return `
    <div>
      <span class="eyebrow">Admin</span>
      <h1 class="heading-lg text-ivory" style="margin-top:0.25rem; margin-bottom:2rem;">Settings</h1>

      <div class="glass-panel" style="padding:2rem; border-radius:var(--radius-sm); margin-bottom:1.5rem;">
        <h2 style="font-family:var(--font-heading); font-size:1.125rem; margin-bottom:1.25rem;" class="text-ivory">Supabase Configuration</h2>
        <div style="display:flex; flex-direction:column; gap:0.875rem; font-size:0.8125rem;">
          <div style="display:flex; gap:1rem; align-items:center; flex-wrap:wrap;">
            <span style="color:var(--color-muted); min-width:120px; font-weight:600;">Project URL</span>
            <code style="background:rgba(255,255,255,0.05); padding:0.375rem 0.75rem; border-radius:4px; color:var(--color-gold); font-size:0.8125rem; word-break:break-all;">
              ${url}
            </code>
          </div>
          <div style="display:flex; gap:1rem; align-items:center; flex-wrap:wrap;">
            <span style="color:var(--color-muted); min-width:120px; font-weight:600;">Auth Status</span>
            <span class="badge badge-gold" style="font-size:0.75rem;">✓ Connected</span>
          </div>
        </div>
      </div>

      <div class="glass-panel" style="padding:2rem; border-radius:var(--radius-sm); margin-bottom:1.5rem;">
        <h2 style="font-family:var(--font-heading); font-size:1.125rem; margin-bottom:1.25rem;" class="text-ivory">Quick Links</h2>
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          ${[
      { label: 'Supabase Auth Users', url: 'https://supabase.com/dashboard/project/_/auth/users' },
      { label: 'Supabase Table Editor', url: 'https://supabase.com/dashboard/project/_/editor' },
      { label: 'Supabase SQL Editor', url: 'https://supabase.com/dashboard/project/_/sql/new' },
      { label: 'Supabase Storage', url: 'https://supabase.com/dashboard/project/_/storage/buckets' },
    ].map(l => `
            <a href="${l.url}" target="_blank" rel="noopener noreferrer"
              class="btn btn-ghost btn-sm"
              style="justify-content:flex-start; font-size:0.8125rem; padding:0.75rem 1rem; border:1px solid var(--color-card-border); border-radius:6px;">
              ${l.label} ↗
            </a>
          `).join('')}
        </div>
      </div>

      <div class="glass-panel" style="padding:2rem; border-radius:var(--radius-sm);">
        <h2 style="font-family:var(--font-heading); font-size:1.125rem; margin-bottom:1.25rem;" class="text-ivory">Database Setup</h2>
        <p class="text-cloud" style="font-size:0.875rem; line-height:1.7; margin-bottom:1.25rem;">
          Run the SQL schema and seed files in your Supabase SQL editor to initialise tables, Row Level Security policies, and sample data.
        </p>
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <a href="/supabase/schema.sql" download class="btn btn-outline btn-sm">Download schema.sql</a>
          <a href="/supabase/seed.sql"   download class="btn btn-outline btn-sm">Download seed.sql</a>
          <a href="/supabase/rls.sql"    download class="btn btn-outline btn-sm">Download rls.sql</a>
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// Wire up per-tab interactions (status selects, delete buttons)
// ─────────────────────────────────────────────────────────────────────────────
function wireTabInteractions(tab) {
  // Status dropdowns
  document.querySelectorAll('.status-select').forEach(sel => {
    sel.addEventListener('change', async () => {
      const table = sel.dataset.table;
      const id = sel.dataset.id;
      const status = sel.value;

      sel.style.opacity = '0.5';
      const { error } = await supabase.from(table).update({ status }).eq('id', id);
      sel.style.opacity = '1';

      if (error) {
        showAdminAlert('Failed to update status: ' + error.message, 'error');
      } else {
        showAdminAlert('Status updated to "' + status + '"', 'success');
      }
    });
  });

  // Delete buttons
  document.querySelectorAll('.delete-row-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Delete this record permanently? This cannot be undone.')) return;

      const table = btn.dataset.table;
      const id = btn.dataset.id;

      const { error } = await supabase.from(table).delete().eq('id', id);

      if (error) {
        showAdminAlert('Delete failed: ' + error.message, 'error');
      } else {
        showAdminAlert('Record deleted.', 'success');
        btn.closest('tr, div.glass-panel')?.remove();
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline toast for admin actions
// ─────────────────────────────────────────────────────────────────────────────
function showAdminAlert(msg, type = 'success') {
  let toast = document.getElementById('admin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'admin-toast';
    toast.style.cssText = `
      position:fixed; bottom:2rem; right:2rem; z-index:9999;
      padding:0.875rem 1.5rem; border-radius:8px;
      font-size:0.875rem; font-weight:500;
      transition:all 0.3s ease; pointer-events:none;
    `;
    document.body.appendChild(toast);
  }

  const isSuccess = type === 'success';
  toast.style.background = isSuccess ? 'rgba(52,211,153,0.15)' : 'rgba(248,113,113,0.15)';
  toast.style.border = isSuccess ? '1px solid rgba(52,211,153,0.35)' : '1px solid rgba(248,113,113,0.35)';
  toast.style.color = isSuccess ? '#34d399' : '#f87171';
  toast.textContent = msg;
  toast.style.opacity = '1';

  setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}
