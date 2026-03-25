-- Create contacts table
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  message TEXT,
  source TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contacts" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read contacts" ON public.contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update contacts" ON public.contacts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete contacts" ON public.contacts FOR DELETE TO authenticated USING (true);

-- Create posts table
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT,
  excerpt TEXT,
  cover_image TEXT,
  author TEXT,
  content TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts" ON public.posts FOR SELECT USING (status = 'published' OR (SELECT auth.uid() IS NOT NULL));
CREATE POLICY "Authenticated users can insert posts" ON public.posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update posts" ON public.posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete posts" ON public.posts FOR DELETE TO authenticated USING (true);

-- Create page_events table
CREATE TABLE public.page_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  page TEXT,
  label TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.page_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page events" ON public.page_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read page events" ON public.page_events FOR SELECT TO authenticated USING (true);

-- Timestamp trigger for posts
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();