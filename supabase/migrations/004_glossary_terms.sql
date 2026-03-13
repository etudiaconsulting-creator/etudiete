-- Glossary terms table
CREATE TABLE glossary_terms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('biochimie','physiologie','physiopathologie','nutrition','alimentation','sante_publique','reglementation')),
  related_terms TEXT[] DEFAULT '{}',
  module_id UUID REFERENCES modules(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE glossary_terms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read glossary"
  ON glossary_terms FOR SELECT TO authenticated USING (true);

CREATE INDEX idx_glossary_term ON glossary_terms(term);
CREATE INDEX idx_glossary_category ON glossary_terms(category);
