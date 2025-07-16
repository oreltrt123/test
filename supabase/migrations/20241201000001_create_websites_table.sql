CREATE TABLE IF NOT EXISTS public.websites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    image_url text,
    primary_color text DEFAULT '#3B82F6',
    template text DEFAULT 'modern',
    domain text,
    is_published boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own websites" ON public.websites;
CREATE POLICY "Users can view own websites"
ON public.websites FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own websites" ON public.websites;
CREATE POLICY "Users can insert own websites"
ON public.websites FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own websites" ON public.websites;
CREATE POLICY "Users can update own websites"
ON public.websites FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own websites" ON public.websites;
CREATE POLICY "Users can delete own websites"
ON public.websites FOR DELETE
USING (auth.uid() = user_id);

alter publication supabase_realtime add table websites;