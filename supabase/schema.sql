-- PRIVATECRAFT PostgreSQL Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. User Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Aircraft Inventory (Fleet & Sales)
CREATE TABLE IF NOT EXISTS public.aircraft (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  model TEXT NOT NULL,
  year INT NOT NULL,
  category TEXT NOT NULL,
  price_usd NUMERIC,
  status TEXT DEFAULT 'For Sale',
  featured BOOLEAN DEFAULT FALSE,
  slug TEXT UNIQUE NOT NULL,
  range_nm INT,
  cruise_speed_knots INT,
  max_passengers INT,
  cabin_length_ft NUMERIC,
  cabin_height_ft NUMERIC,
  baggage_cubic_ft INT,
  engine_type TEXT,
  avionics TEXT,
  total_time_hours INT,
  total_landings INT,
  location TEXT,
  registration TEXT,
  serial_number TEXT,
  exterior_finish TEXT,
  interior_description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Booking / Flight Quote Requests
CREATE TABLE IF NOT EXISTS public.booking_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  trip_type TEXT DEFAULT 'One Way',
  departure_location TEXT NOT NULL,
  destination_location TEXT NOT NULL,
  departure_date DATE NOT NULL,
  return_date DATE,
  passengers_count INT DEFAULT 1,
  preferred_category TEXT,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  additional_notes TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewed', 'Confirmed', 'Cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT DEFAULT 'General Inquiry',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'Unread' CHECK (status IN ('Unread', 'Read', 'Responded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Destinations
CREATE TABLE IF NOT EXISTS public.destinations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  city TEXT NOT NULL,
  airport TEXT NOT NULL,
  country TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_aircraft_category ON public.aircraft(category);
CREATE INDEX IF NOT EXISTS idx_aircraft_slug ON public.aircraft(slug);
CREATE INDEX IF NOT EXISTS idx_booking_user ON public.booking_requests(user_id);
