-- =====================================================
-- CARRERA.NEGOIA.COM — Schema Completo Sprint 2
-- =====================================================

-- Usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  country TEXT, -- ES, MX, CO, AR, etc.
  source TEXT, -- google_ads, organic, referral, social
  utm_campaign TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Perfiles (datos del intake/assessment)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  cv_raw_text TEXT,
  cv_file_url TEXT,
  intake_answers JSONB, -- Todas las respuestas del assessment
  parsed_cv JSONB, -- Output del parsing de CV por IA
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Mapas de habilidades generados
CREATE TABLE IF NOT EXISTS skills_maps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id),
  hard_skills JSONB, -- [{name, level (1-5), confidence, evidence}]
  soft_skills JSONB, -- [{name, level (1-5), confidence, evidence}]
  domain_knowledge JSONB, -- [{name, level (1-5), confidence}]
  narrative_text TEXT, -- Texto motivacional 300-500 palabras
  summary_one_liner TEXT, -- Resumen de una línea
  radar_data JSONB, -- Datos para el radar chart
  share_image_url TEXT, -- PNG generado para compartir
  status TEXT DEFAULT 'processing', -- processing, done, error
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Catálogo de roles (curado, ~50-100 roles)
CREATE TABLE IF NOT EXISTS roles_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_es TEXT NOT NULL,
  category TEXT, -- tech, business, creative, operations, consulting
  day_to_day TEXT NOT NULL, -- Descripción real del día a día (200-300 palabras)
  pros TEXT[] NOT NULL,
  cons TEXT[] NOT NULL, -- Honestos, no marketing
  required_hard_skills JSONB, -- [{skill, level (1-5)}]
  required_soft_skills JSONB, -- [{skill, level (1-5)}]
  salary_ranges JSONB, -- {ES: {min, max, currency}, MX: {...}, ...}
  demand_level TEXT, -- alta, media, baja
  growth_trend TEXT, -- growing, stable, declining
  growth_percentage INTEGER,
  remote_friendly BOOLEAN DEFAULT false,
  companies_hiring TEXT[], -- Empresas conocidas que contratan
  linkedin_search_template TEXT,
  infojobs_search_template TEXT,
  indeed_search_template TEXT,
  transition_from TEXT[], -- Roles desde los que típicamente se transiciona
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Matches usuario-rol
CREATE TABLE IF NOT EXISTS role_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skills_map_id UUID REFERENCES skills_maps(id),
  role_id UUID REFERENCES roles_catalog(id),
  match_percentage INTEGER, -- 0-100
  match_type TEXT, -- high_affinity, opportunity, stretch
  why_you_fit TEXT, -- Narrativa personalizada de por qué encaja
  gaps JSONB, -- [{skill, current_level, required_level, how_to_close, resources, time_weeks}]
  strengths JSONB, -- [{skill, level, evidence}]
  user_status TEXT DEFAULT 'pending', -- pending, interested, discarded, priority
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Pedidos
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  plan TEXT NOT NULL, -- basic, complete
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  status TEXT DEFAULT 'pending', -- pending, paid, refunded
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Documentos generados
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id),
  doc_type TEXT NOT NULL, -- cv_generic, cv_specific, cover_letter, linkedin_bullets, elevator_pitch, gap_plan
  role_id UUID REFERENCES roles_catalog(id), -- NULL para genérico
  content JSONB, -- Contenido estructurado
  content_text TEXT, -- Contenido en texto plano para copiar
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Assessment processing status (para polling)
CREATE TABLE IF NOT EXISTS assessment_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'processing', -- processing, skills_extracted, mapping_roles, done, error
  current_step TEXT, -- cv_parsed, skills_extracted, generating_map, matching_roles
  skills_count INTEGER DEFAULT 0,
  roles_matched INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_maps_user_id ON skills_maps(user_id);
CREATE INDEX IF NOT EXISTS idx_role_matches_user_id ON role_matches(user_id);
CREATE INDEX IF NOT EXISTS idx_role_matches_status ON role_matches(user_status);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_jobs_user_id ON assessment_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_roles_catalog_active ON roles_catalog(is_active);

-- RLS Policies (opcional - para cuando añadamos auth)
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- etc.
