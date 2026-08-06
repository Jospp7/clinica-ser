-- Roles
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Bootstrap: existing accounts become admins
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users
ON CONFLICT (user_id, role) DO NOTHING;

-- CONTACTS
DROP POLICY IF EXISTS "Authenticated users can read contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can delete contacts" ON public.contacts;
DROP POLICY IF EXISTS "Anyone can insert contacts" ON public.contacts;

CREATE POLICY "Anyone can submit a contact"
ON public.contacts FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can read contacts"
ON public.contacts FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contacts"
ON public.contacts FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contacts"
ON public.contacts FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

REVOKE SELECT, UPDATE, DELETE ON public.contacts FROM anon;
GRANT INSERT ON public.contacts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contacts TO authenticated;
GRANT ALL ON public.contacts TO service_role;

-- PAGE_EVENTS
DROP POLICY IF EXISTS "Authenticated users can read page events" ON public.page_events;
DROP POLICY IF EXISTS "Anyone can insert page events" ON public.page_events;

CREATE POLICY "Anyone can log page events"
ON public.page_events FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can read page events"
ON public.page_events FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

REVOKE SELECT, UPDATE, DELETE ON public.page_events FROM anon;
GRANT INSERT ON public.page_events TO anon;
GRANT SELECT, INSERT ON public.page_events TO authenticated;
GRANT ALL ON public.page_events TO service_role;

-- POSTS
DROP POLICY IF EXISTS "Anyone can read published posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON public.posts;

CREATE POLICY "Anyone can read published posts"
ON public.posts FOR SELECT TO anon, authenticated
USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert posts"
ON public.posts FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update posts"
ON public.posts FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete posts"
ON public.posts FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;