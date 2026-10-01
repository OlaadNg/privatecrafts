import { signInUser, signUpUser } from '../js/auth.js';
import { navigate, supabase } from '../js/config.js';

export function renderLoginPage() {
  return `
    <!-- Page Header Banner -->
    <section class="hero-section" style="min-height: 38vh; padding-top: calc(var(--header-height) + 2rem);">
      <img src="/assets/cockpit-detail.png" alt="Client Portal" class="hero-bg-media" />
      <div class="overlay-dark"></div>
      <div class="container hero-content animate-fade-in" style="text-align: center; margin: 0 auto;">
        <span class="eyebrow" style="margin-bottom: 0.5rem;">Client Portal</span>
        <h1 class="heading-xl text-ivory">PRIVATECRAFT Login</h1>
      </div>
    </section>

    <section class="section-padding">
      <div class="container" style="max-width: 480px;">
        <div class="glass-panel" style="padding: 2.5rem; border-radius: var(--radius-md);">

          <div style="text-align: center; margin-bottom: 2rem;">
            <h2 class="heading-md text-ivory" id="auth-title">Sign In to Your Account</h2>
            <p class="text-cloud" style="font-size: 0.875rem; margin-top: 0.5rem;">
              Access your private advisory dashboard, bookings and enquiry history.
            </p>
          </div>

          <!-- Inline error / success banner -->
          <div id="auth-message" style="display:none; padding: 0.875rem 1.25rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; font-size: 0.875rem; font-weight: 500;"></div>

          <form id="auth-form" novalidate>
            <!-- Sign-up only: full name -->
            <div class="form-group" id="name-group" style="display: none;">
              <label class="form-label" for="auth_name">Full Name</label>
              <input type="text" id="auth_name" class="form-input" placeholder="Your Full Name" autocomplete="name" />
            </div>

            <div class="form-group">
              <label class="form-label" for="auth_email">Email Address</label>
              <input type="email" id="auth_email" class="form-input" placeholder="name@domain.com" required autocomplete="email" />
            </div>

            <div class="form-group">
              <label class="form-label" for="auth_password">Password</label>
              <input type="password" id="auth_password" class="form-input" placeholder="••••••••" required autocomplete="current-password" />
            </div>

            <button type="submit" class="btn btn-gold btn-lg" id="auth-submit-btn"
              style="width: 100%; margin-top: 1.25rem; position: relative;">
              <span id="auth-btn-label">Sign In</span>
              <span id="auth-btn-spinner" style="display:none; margin-left: 0.5rem;">⏳</span>
            </button>
          </form>

          <div style="text-align: center; margin-top: 1.5rem; font-size: 0.875rem;" class="text-cloud">
            <span id="auth-toggle-msg">Don't have a portal account?</span>
            <button id="auth-toggle-btn"
              style="color: var(--color-gold); font-weight: 600; text-decoration: underline; margin-left: 0.5rem; background: none; border: none; cursor: pointer;">
              Create Account
            </button>
          </div>

          <!-- Forgot password (sign-in mode only) -->
          <div id="forgot-wrap" style="text-align: center; margin-top: 0.75rem;">
            <button id="forgot-btn"
              style="color: var(--color-muted); font-size: 0.8125rem; background: none; border: none; cursor: pointer; text-decoration: underline;">
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function afterRenderLoginPage() {
  const form       = document.getElementById('auth-form');
  const title      = document.getElementById('auth-title');
  const nameGroup  = document.getElementById('name-group');
  const submitBtn  = document.getElementById('auth-submit-btn');
  const btnLabel   = document.getElementById('auth-btn-label');
  const btnSpinner = document.getElementById('auth-btn-spinner');
  const toggleBtn  = document.getElementById('auth-toggle-btn');
  const toggleMsg  = document.getElementById('auth-toggle-msg');
  const msgBox     = document.getElementById('auth-message');
  const forgotWrap = document.getElementById('forgot-wrap');
  const forgotBtn  = document.getElementById('forgot-btn');

  let isSignUp = false;

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------
  function showMsg(text, type = 'error') {
    msgBox.textContent = text;
    msgBox.style.display = 'block';
    if (type === 'error') {
      msgBox.style.background = 'rgba(220,38,38,0.15)';
      msgBox.style.border     = '1px solid rgba(220,38,38,0.4)';
      msgBox.style.color      = '#fca5a5';
    } else {
      msgBox.style.background = 'rgba(212,175,55,0.12)';
      msgBox.style.border     = '1px solid rgba(212,175,55,0.4)';
      msgBox.style.color      = 'var(--color-gold)';
    }
  }

  function clearMsg() {
    msgBox.style.display = 'none';
    msgBox.textContent = '';
  }

  function setLoading(loading) {
    submitBtn.disabled    = loading;
    btnSpinner.style.display = loading ? 'inline' : 'none';
  }

  // -------------------------------------------------------------------------
  // Toggle sign-in / sign-up
  // -------------------------------------------------------------------------
  toggleBtn?.addEventListener('click', () => {
    isSignUp = !isSignUp;
    clearMsg();
    if (isSignUp) {
      title.textContent            = 'Create a Client Account';
      nameGroup.style.display      = 'block';
      btnLabel.textContent         = 'Create Account';
      toggleMsg.textContent        = 'Already have an account?';
      toggleBtn.textContent        = 'Sign In';
      forgotWrap.style.display     = 'none';
      document.getElementById('auth_password').setAttribute('autocomplete', 'new-password');
    } else {
      title.textContent            = 'Sign In to Your Account';
      nameGroup.style.display      = 'none';
      btnLabel.textContent         = 'Sign In';
      toggleMsg.textContent        = "Don't have a portal account?";
      toggleBtn.textContent        = 'Create Account';
      forgotWrap.style.display     = 'block';
      document.getElementById('auth_password').setAttribute('autocomplete', 'current-password');
    }
  });

  // -------------------------------------------------------------------------
  // Forgot password
  // -------------------------------------------------------------------------
  forgotBtn?.addEventListener('click', async () => {
    const email = document.getElementById('auth_email').value.trim();
    if (!email) {
      showMsg('Enter your email address above, then click "Forgot password?".');
      return;
    }
    forgotBtn.disabled = true;
    forgotBtn.textContent = 'Sending reset link…';
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password'
      });
      if (error) {
        showMsg(error.message, 'error');
      } else {
        showMsg('Password reset email sent! Check your inbox.', 'success');
      }
    } catch (e) {
      showMsg('Could not send reset email. Check your internet connection.', 'error');
    }
    forgotBtn.disabled = false;
    forgotBtn.textContent = 'Forgot password?';
  });

  // -------------------------------------------------------------------------
  // Form submit
  // -------------------------------------------------------------------------
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMsg();

    const email    = document.getElementById('auth_email').value.trim();
    const password = document.getElementById('auth_password').value;

    if (!email || !password) {
      showMsg('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    btnLabel.textContent = isSignUp ? 'Creating account…' : 'Signing in…';

    if (isSignUp) {
      const name = document.getElementById('auth_name').value.trim();
      const res  = await signUpUser(email, password, name);

      if (res.success) {
        showMsg(
          'Account created! Please check your email to verify before signing in.',
          'success'
        );
      } else {
        showMsg(res.error || 'Failed to create account. Please try again.');
      }
    } else {
      const res = await signInUser(email, password);

      if (res.success) {
        showMsg('Welcome back! Redirecting…', 'success');
        setTimeout(() => navigate('/dashboard'), 800);
      } else {
        showMsg(res.error || 'Sign in failed. Please check your credentials.');
      }
    }

    setLoading(false);
    btnLabel.textContent = isSignUp ? 'Create Account' : 'Sign In';
  });
}
