import { supabase, navigate } from './config.js';

// ---------------------------------------------------------------------------
// Get current logged-in user (from active session)
// ---------------------------------------------------------------------------
export async function getCurrentUser() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Sign In
// ---------------------------------------------------------------------------
export async function signInUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      // Surface the real Supabase error message
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (err) {
    // Network / fetch failure
    const msg = err?.message?.toLowerCase?.() || '';

    if (msg.includes('failed to fetch') || msg.includes('networkerror') || msg.includes('network')) {
      return {
        success: false,
        error:
          'Network error: Unable to reach Supabase. ' +
          'Please check your internet connection and verify your Supabase URL in the .env file.'
      };
    }

    return { success: false, error: err.message || 'An unexpected error occurred. Please try again.' };
  }
}

// ---------------------------------------------------------------------------
// Sign Up
// ---------------------------------------------------------------------------
export async function signUpUser(email, password, fullName) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (err) {
    const msg = err?.message?.toLowerCase?.() || '';

    if (msg.includes('failed to fetch') || msg.includes('network')) {
      return {
        success: false,
        error:
          'Network error: Unable to reach Supabase. ' +
          'Please check your internet connection and verify your Supabase URL in the .env file.'
      };
    }

    return { success: false, error: err.message || 'Sign up failed. Please try again.' };
  }
}

// ---------------------------------------------------------------------------
// Sign Out
// ---------------------------------------------------------------------------
export async function signOutUser() {
  try {
    await supabase.auth.signOut();
    navigate('/');
  } catch (err) {
    console.error('Sign out error:', err);
    navigate('/');
  }
}
