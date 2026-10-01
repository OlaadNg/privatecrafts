import { createClient } from '@supabase/supabase-js';

// ---------------------------------------------------------------------------
// Supabase – read from Vite env vars (defined in .env in project root)
// VITE_SUPABASE_URL=https://xxxx.supabase.co
// VITE_SUPABASE_ANON_KEY=eyJ...
// ---------------------------------------------------------------------------
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY; // legacy fallback

if (!supabaseUrl || !supabaseKey) {
  console.error(
    '[PRIVATECRAFT] Supabase credentials missing!\n' +
    'Create a .env file in the project root with:\n' +
    '  VITE_SUPABASE_URL=https://your-project.supabase.co\n' +
    '  VITE_SUPABASE_ANON_KEY=your-anon-key'
  );
}

export const supabase = createClient(
  supabaseUrl  || 'https://placeholder.supabase.co',
  supabaseKey  || 'placeholder-anon-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false
    }
  }
);

// ---------------------------------------------------------------------------
// SPA navigation helper – triggers the router without a full page reload
// ---------------------------------------------------------------------------
export function navigate(path) {
  window.history.pushState(null, null, path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export const SITE_CONFIG = {
  name: 'PRIVATECRAFT',
  tagline: 'Aircraft Manufacturing, Engineered for the Future',
  heroSubtitle: 'Advanced aircraft design, precision manufacturing, program execution, and tailored aerospace systems.',
  contact: {
    email: 'engineering@privatecraft.com',
    phone: '+44 20 7946 0912',
    whatsapp: '442079460912',
    address: 'Mayfair, London W1J 7NT, United Kingdom'
  }
};
