-- 1. Private schema for internal helper functions (not exposed to the API)
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
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

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 2. Repoint all policies to the private helper
DROP POLICY IF EXISTS "Admins can read page events" ON public.page_events;
CREATE POLICY "Admins can read page events" ON public.page_events
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete posts" ON public.posts;
CREATE POLICY "Admins can delete posts" ON public.posts
  FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update posts" ON public.posts;
CREATE POLICY "Admins can update posts" ON public.posts
  FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can insert posts" ON public.posts;
CREATE POLICY "Admins can insert posts" ON public.posts
  FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Anyone can read published posts" ON public.posts;
CREATE POLICY "Anyone can read published posts" ON public.posts
  FOR SELECT TO anon, authenticated
  USING (status = 'published' OR private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete contacts" ON public.contacts;
CREATE POLICY "Admins can delete contacts" ON public.contacts
  FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update contacts" ON public.contacts;
CREATE POLICY "Admins can update contacts" ON public.contacts
  FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can read contacts" ON public.contacts;
CREATE POLICY "Admins can read contacts" ON public.contacts
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

-- 3. Remove the public SECURITY DEFINER function from the exposed API schema
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 4. Hide non-public objects from the GraphQL/REST schema for anonymous visitors
REVOKE SELECT ON public.contacts FROM anon;
REVOKE SELECT ON public.page_events FROM anon;
REVOKE ALL ON public.user_roles FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;