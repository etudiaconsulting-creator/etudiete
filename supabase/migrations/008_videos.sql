-- ═══ TABLE VIDEOS ═══
CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID REFERENCES modules(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  youtube_video_id TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'cours'
    CHECK (category IN ('cours', 'methode', 'annale', 'conseil', 'temoignage')),
  order_index INT DEFAULT 0,
  is_free BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ═══ RLS ═══
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Tous les utilisateurs authentifiés peuvent lire les vidéos
CREATE POLICY "Authenticated users can read videos"
  ON videos FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Admin CRUD (réutilise is_admin() de 007_admin_rls.sql)
CREATE POLICY "Admins can insert videos"
  ON videos FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update videos"
  ON videos FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete videos"
  ON videos FOR DELETE
  USING (is_admin());
