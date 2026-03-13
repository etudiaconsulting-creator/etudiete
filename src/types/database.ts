export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ProgramDuration = '1month' | '3months' | '6months' | '12months' | '24months';
export type SubscriptionStatus = 'free' | 'monthly' | 'yearly' | 'lifetime';
export type ExamType = 'written' | 'oral' | 'practical';
export type QuestionType = 'mcq' | 'true_false' | 'open_short' | 'drag_drop';
export type ExerciseType = 'full_exam' | 'mini_case' | 'oral_prep';

export interface McqOption {
  id: string;
  text: string;
  is_correct: boolean;
}

// Row types
export interface Profile {
  id: string;
  full_name: string;
  exam_year: number;
  current_year: number;
  program_duration: ProgramDuration;
  subscription_status: SubscriptionStatus;
  stripe_customer_id: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  code: string;
  title: string;
  description: string;
  coefficient: number;
  exam_type: ExamType;
  exam_duration: string;
  order_index: number;
}

export interface Chapter {
  id: string;
  module_id: string;
  title: string;
  description: string;
  priority: number;
  order_index: number;
  estimated_hours: number;
  content_html: string;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  chapter_id: string;
  module_id: string;
  question_type: QuestionType;
  question_text: string;
  options: McqOption[] | null;
  correct_answer: string;
  explanation: string;
  difficulty: number;
  priority: number;
  tags: string[];
  exam_link: string | null;
  created_at: string;
}

export interface ExamExercise {
  id: string;
  module_id: string;
  title: string;
  description: string;
  exercise_type: ExerciseType;
  duration_minutes: number;
  subject_html: string;
  model_answer_html: string;
  grading_criteria_html: string;
  common_mistakes_html: string;
  priority: number;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  chapter_id: string;
  completion_percentage: number;
  quiz_score: number | null;
  last_studied_at: string;
  updated_at: string;
}

export interface UserQuestionHistory {
  id: string;
  user_id: string;
  question_id: string;
  answered_correctly: boolean;
  answered_at: string;
  next_review_at: string;
  review_interval_days: number;
  ease_factor: number;
}

export interface UserExerciseAttempt {
  id: string;
  user_id: string;
  exercise_id: string;
  self_score: number | null;
  notes: string | null;
  completed_at: string;
}

export interface WeeklyObjective {
  id: string;
  program_duration: ProgramDuration;
  week_number: number;
  module_id: string;
  title: string;
  chapter_ids: string[];
  exercise_ids: string[];
  target_score: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  related_terms: string[];
  module_id: string | null;
  created_at: string;
}

export type MistakeImpact = 'critical' | 'major' | 'minor';

export interface CommonMistake {
  id: string;
  module_code: string;
  title: string;
  description: string;
  impact: MistakeImpact;
  tip: string;
  related_chapter_id: string | null;
  order_index: number;
  created_at: string;
}

export type BookmarkContentType = 'chapter' | 'question' | 'exercise' | 'glossary_term';

export interface UserBookmark {
  id: string;
  user_id: string;
  content_type: BookmarkContentType;
  content_id: string;
  note: string | null;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_html: string;
  cover_image_url: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// Database interface for Supabase client
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
      };
      modules: {
        Row: Module;
        Insert: Module;
        Update: Partial<Module>;
      };
      chapters: {
        Row: Chapter;
        Insert: Partial<Chapter> & { id: string; module_id: string; title: string };
        Update: Partial<Chapter>;
      };
      questions: {
        Row: Question;
        Insert: Partial<Question> & { id: string; chapter_id: string; module_id: string; question_type: QuestionType; question_text: string };
        Update: Partial<Question>;
      };
      exam_exercises: {
        Row: ExamExercise;
        Insert: Partial<ExamExercise> & { id: string; module_id: string; title: string; exercise_type: ExerciseType };
        Update: Partial<ExamExercise>;
      };
      user_progress: {
        Row: UserProgress;
        Insert: Partial<UserProgress> & { id: string; user_id: string; chapter_id: string };
        Update: Partial<UserProgress>;
      };
      user_question_history: {
        Row: UserQuestionHistory;
        Insert: UserQuestionHistory;
        Update: Partial<UserQuestionHistory>;
      };
      user_exercise_attempts: {
        Row: UserExerciseAttempt;
        Insert: UserExerciseAttempt;
        Update: Partial<UserExerciseAttempt>;
      };
      weekly_objectives: {
        Row: WeeklyObjective;
        Insert: WeeklyObjective;
        Update: Partial<WeeklyObjective>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Partial<BlogPost> & { title: string; slug: string };
        Update: Partial<BlogPost>;
      };
      glossary_terms: {
        Row: GlossaryTerm;
        Insert: Partial<GlossaryTerm> & { term: string; definition: string; category: string };
        Update: Partial<GlossaryTerm>;
      };
      common_mistakes: {
        Row: CommonMistake;
        Insert: Partial<CommonMistake> & { module_code: string; title: string; description: string; impact: MistakeImpact; tip: string };
        Update: Partial<CommonMistake>;
      };
      user_bookmarks: {
        Row: UserBookmark;
        Insert: Partial<UserBookmark> & { user_id: string; content_type: BookmarkContentType; content_id: string };
        Update: Partial<UserBookmark>;
      };
    };
  };
}
