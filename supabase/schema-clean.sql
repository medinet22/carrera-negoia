-- =====================================================
-- CARRERA.NEGOIA.COM — Schema for Supabase
-- Proyecto dedicado: zpxumldfblbmgqjmlnon
-- Tablas SIN prefijo carrera_ (proyecto es solo carrera)
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS — Usuarios registrados
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  country TEXT DEFAULT 'ES',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- =====================================================
-- PROFILES — Perfiles con assessment y skills
-- =====================================================
CREATE TABLE IF NOT EXISTS carrera_profiles (
  -- Note: Using carrera_profiles to avoid conflict with Scout's profiles table
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  cv_text TEXT,
  intake_answers JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_user ON carrera_profiles(user_id);

-- =====================================================
-- SKILLS_MAPS — Mapa de habilidades extraídas
-- =====================================================
CREATE TABLE IF NOT EXISTS skills_maps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES carrera_profiles(id) ON DELETE CASCADE,
  hard_skills JSONB DEFAULT '[]',
  soft_skills JSONB DEFAULT '[]',
  domain_knowledge JSONB DEFAULT '[]',
  superpower JSONB DEFAULT '{}',
  narrative_text TEXT,
  radar_data JSONB DEFAULT '[]',
  summary_one_liner TEXT,
  employability_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skills_maps_profile ON skills_maps(profile_id);

-- =====================================================
-- ROLES_CATALOG — Catálogo de roles disponibles
-- =====================================================
CREATE TABLE IF NOT EXISTS roles_catalog (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  tier TEXT,
  headline TEXT,
  salary_range_es TEXT,
  salary_range_mx TEXT,
  salary_range_co TEXT,
  salary_range_ar TEXT,
  demand_level TEXT,
  required_skills JSONB DEFAULT '[]',
  nice_to_have_skills JSONB DEFAULT '[]',
  typical_titles JSONB DEFAULT '[]',
  day_in_life TEXT,
  career_path JSONB DEFAULT '{}',
  resources JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ROLE_MATCHES — Matches usuario-rol calculados
-- =====================================================
CREATE TABLE IF NOT EXISTS role_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES carrera_profiles(id) ON DELETE CASCADE,
  role_id TEXT REFERENCES roles_catalog(id) ON DELETE CASCADE,
  match_percentage INTEGER,
  match_type TEXT,
  why_you_fit TEXT,
  why_now TEXT,
  gaps JSONB DEFAULT '[]',
  strengths JSONB DEFAULT '[]',
  quick_wins JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, role_id)
);

CREATE INDEX IF NOT EXISTS idx_role_matches_profile ON role_matches(profile_id);
CREATE INDEX IF NOT EXISTS idx_role_matches_percentage ON role_matches(match_percentage DESC);

-- =====================================================
-- ORDERS — Pedidos de pago
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL CHECK (plan IN ('basic', 'complete')),
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- =====================================================
-- DOCUMENTS — Documentos generados (CV, carta, etc.)
-- =====================================================
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES carrera_profiles(id) ON DELETE CASCADE,
  role_id TEXT,
  doc_type TEXT NOT NULL CHECK (doc_type IN ('cv_generic', 'cv_specific', 'cover_letter', 'linkedin_bullets')),
  content JSONB DEFAULT '{}',
  html TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_profile ON documents(profile_id);

-- =====================================================
-- ASSESSMENT_JOBS — Jobs de análisis en background
-- =====================================================
CREATE TABLE IF NOT EXISTS assessment_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES carrera_profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'done', 'error')),
  error_message TEXT,
  skills_count INTEGER,
  roles_matched INTEGER,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assessment_jobs_user ON assessment_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_jobs_status ON assessment_jobs(status);

-- =====================================================
-- RLS POLICIES (Optional - enable as needed)
-- =====================================================
-- For MVP, using service_role key bypasses RLS
-- Enable RLS later for production security
