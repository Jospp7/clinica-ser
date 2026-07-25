ALTER TABLE public.contacts ALTER COLUMN status SET DEFAULT 'nuevo';
UPDATE public.contacts SET status = 'nuevo' WHERE status = 'new';