-- PRIVATECRAFT Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aircraft ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Public profile creation" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Aircraft Inventory Policies (Public Read, Admin Write)
CREATE POLICY "Allow public read access on aircraft" ON public.aircraft FOR SELECT USING (true);
CREATE POLICY "Allow admin write on aircraft" ON public.aircraft FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. Booking Requests Policies (Public Insert, Owner/Admin Read)
CREATE POLICY "Allow public flight request submission" ON public.booking_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Users view own flight requests" ON public.booking_requests FOR SELECT USING (
  user_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 4. Contact Messages Policies (Public Insert, Admin Read)
CREATE POLICY "Allow public contact message submission" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin view on contact messages" ON public.contact_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 5. Destinations Policies (Public Read)
CREATE POLICY "Allow public read access on destinations" ON public.destinations FOR SELECT USING (true);
