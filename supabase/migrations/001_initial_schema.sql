-- ETUDIET Database Schema
-- BTS Diététique et Nutrition - Nouveau référentiel 2027

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES (extension de auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  exam_year INT NOT NULL DEFAULT 2027,
  current_year INT NOT NULL DEFAULT 1 CHECK (current_year IN (1, 2)),
  program_duration TEXT NOT NULL DEFAULT '12months' CHECK (program_duration IN ('1month', '3months', '6months', '12months', '24months')),
  subscription_status TEXT NOT NULL DEFAULT 'free' CHECK (subscription_status IN ('free', 'monthly', 'yearly', 'lifetime')),
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- MODULES
-- ============================================
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  coefficient INT NOT NULL DEFAULT 1,
  exam_type TEXT NOT NULL CHECK (exam_type IN ('written', 'oral', 'practical')),
  exam_duration TEXT NOT NULL DEFAULT '',
  order_index INT NOT NULL DEFAULT 0
);

-- ============================================
-- CHAPTERS
-- ============================================
CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  priority INT NOT NULL DEFAULT 2 CHECK (priority BETWEEN 1 AND 3),
  order_index INT NOT NULL DEFAULT 0,
  estimated_hours DECIMAL NOT NULL DEFAULT 1.0,
  content_html TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- QUESTIONS
-- ============================================
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'true_false', 'open_short', 'drag_drop')),
  question_text TEXT NOT NULL,
  options JSONB,
  correct_answer TEXT NOT NULL DEFAULT '',
  explanation TEXT NOT NULL DEFAULT '',
  difficulty INT NOT NULL DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 3),
  priority INT NOT NULL DEFAULT 2 CHECK (priority BETWEEN 1 AND 3),
  tags TEXT[] NOT NULL DEFAULT '{}',
  exam_link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- EXAM EXERCISES
-- ============================================
CREATE TABLE exam_exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  exercise_type TEXT NOT NULL CHECK (exercise_type IN ('full_exam', 'mini_case', 'oral_prep')),
  duration_minutes INT NOT NULL DEFAULT 60,
  subject_html TEXT NOT NULL DEFAULT '',
  model_answer_html TEXT NOT NULL DEFAULT '',
  grading_criteria_html TEXT NOT NULL DEFAULT '',
  common_mistakes_html TEXT NOT NULL DEFAULT '',
  priority INT NOT NULL DEFAULT 2 CHECK (priority BETWEEN 1 AND 3),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- USER PROGRESS
-- ============================================
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  completion_percentage INT NOT NULL DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
  quiz_score DECIMAL,
  last_studied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, chapter_id)
);

-- ============================================
-- USER QUESTION HISTORY
-- ============================================
CREATE TABLE user_question_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  answered_correctly BOOLEAN NOT NULL,
  answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  next_review_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  review_interval_days INT NOT NULL DEFAULT 1,
  ease_factor DECIMAL NOT NULL DEFAULT 2.5
);

-- ============================================
-- USER EXERCISE ATTEMPTS
-- ============================================
CREATE TABLE user_exercise_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES exam_exercises(id) ON DELETE CASCADE,
  self_score INT CHECK (self_score BETWEEN 0 AND 20),
  notes TEXT,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- WEEKLY OBJECTIVES
-- ============================================
CREATE TABLE weekly_objectives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_duration TEXT NOT NULL CHECK (program_duration IN ('1month', '3months', '6months', '12months', '24months')),
  week_number INT NOT NULL,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  chapter_ids UUID[] NOT NULL DEFAULT '{}',
  exercise_ids UUID[] NOT NULL DEFAULT '{}',
  target_score INT NOT NULL DEFAULT 80
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_question_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exercise_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_objectives ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only see/edit their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Modules: readable by all authenticated users
CREATE POLICY "Authenticated users can read modules" ON modules FOR SELECT USING (auth.role() = 'authenticated');

-- Chapters: readable by all authenticated users
CREATE POLICY "Authenticated users can read chapters" ON chapters FOR SELECT USING (auth.role() = 'authenticated');

-- Questions: readable by all authenticated users
CREATE POLICY "Authenticated users can read questions" ON questions FOR SELECT USING (auth.role() = 'authenticated');

-- Exam exercises: readable by all authenticated users
CREATE POLICY "Authenticated users can read exercises" ON exam_exercises FOR SELECT USING (auth.role() = 'authenticated');

-- Weekly objectives: readable by all authenticated users
CREATE POLICY "Authenticated users can read objectives" ON weekly_objectives FOR SELECT USING (auth.role() = 'authenticated');

-- User progress: CRUD only for owner
CREATE POLICY "Users can manage own progress" ON user_progress FOR ALL USING (auth.uid() = user_id);

-- User question history: CRUD only for owner
CREATE POLICY "Users can manage own question history" ON user_question_history FOR ALL USING (auth.uid() = user_id);

-- User exercise attempts: CRUD only for owner
CREATE POLICY "Users can manage own exercise attempts" ON user_exercise_attempts FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS for updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER chapters_updated_at BEFORE UPDATE ON chapters FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER user_progress_updated_at BEFORE UPDATE ON user_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- AUTO-CREATE PROFILE on signup
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- SEED DATA: BTS Diététique modules
-- ============================================
INSERT INTO modules (code, title, description, coefficient, exam_type, exam_duration, order_index) VALUES
  ('E1', 'Biologie et physiopathologie appliquées', 'Biochimie, physiologie, physiopathologie des grandes fonctions et des pathologies nutritionnelles.', 4, 'written', '4h', 1),
  ('E2', 'Connaissance des aliments et nutrition', 'Composition des aliments, valeur nutritionnelle, technologie alimentaire, qualité et sécurité.', 4, 'written', '4h', 2),
  ('E3', 'Économie et gestion', 'Économie de la santé, gestion budgétaire, management des équipes en restauration collective.', 1, 'written', '3h', 3),
  ('E4', 'Mise en oeuvre d''activités technologiques d''alimentation', 'Techniques culinaires adaptées, préparations diététiques, ateliers pratiques.', 1, 'practical', '3h30', 4),
  ('E5', 'Activités professionnelles de synthèse', 'Étude de cas, prise en charge nutritionnelle, éducation thérapeutique du patient.', 4, 'oral', '45min', 5);
