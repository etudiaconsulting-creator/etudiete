-- Helper function to check admin role
CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin');
$$ LANGUAGE sql SECURITY DEFINER;

-- ═══ MODULES ═══
CREATE POLICY "Admins can insert modules" ON modules FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update modules" ON modules FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete modules" ON modules FOR DELETE USING (is_admin());

-- ═══ CHAPTERS ═══
CREATE POLICY "Admins can insert chapters" ON chapters FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update chapters" ON chapters FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete chapters" ON chapters FOR DELETE USING (is_admin());

-- ═══ QUESTIONS ═══
CREATE POLICY "Admins can insert questions" ON questions FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update questions" ON questions FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete questions" ON questions FOR DELETE USING (is_admin());

-- ═══ EXAM EXERCISES ═══
CREATE POLICY "Admins can insert exercises" ON exam_exercises FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update exercises" ON exam_exercises FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete exercises" ON exam_exercises FOR DELETE USING (is_admin());

-- ═══ WEEKLY OBJECTIVES ═══
CREATE POLICY "Admins can insert objectives" ON weekly_objectives FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update objectives" ON weekly_objectives FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete objectives" ON weekly_objectives FOR DELETE USING (is_admin());

-- ═══ GLOSSARY TERMS ═══
CREATE POLICY "Admins can insert glossary" ON glossary_terms FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update glossary" ON glossary_terms FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete glossary" ON glossary_terms FOR DELETE USING (is_admin());

-- ═══ COMMON MISTAKES ═══
CREATE POLICY "Admins can insert mistakes" ON common_mistakes FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update mistakes" ON common_mistakes FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete mistakes" ON common_mistakes FOR DELETE USING (is_admin());

-- ═══ BLOG POSTS ═══
CREATE POLICY "Admins can read all blog posts" ON blog_posts FOR SELECT USING (is_admin());
CREATE POLICY "Admins can insert blog posts" ON blog_posts FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update blog posts" ON blog_posts FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete blog posts" ON blog_posts FOR DELETE USING (is_admin());

-- ═══ PROFILES (admin can read all for user list) ═══
CREATE POLICY "Admins can read all profiles" ON profiles FOR SELECT USING (is_admin());
