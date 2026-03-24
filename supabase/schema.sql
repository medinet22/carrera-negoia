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

-- =====================================================
-- ÍNDICES PARA PERFORMANCE — Escalabilidad Score 9/10
-- =====================================================

-- Índices básicos
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_maps_user_id ON skills_maps(user_id);

-- Índices compuestos para queries comunes
CREATE INDEX IF NOT EXISTS idx_role_matches_user_id ON role_matches(user_id);
CREATE INDEX IF NOT EXISTS idx_role_matches_user_status ON role_matches(user_id, user_status);
CREATE INDEX IF NOT EXISTS idx_role_matches_skills_map ON role_matches(skills_map_id);

-- Índices para orders (crítico para checkout y verificación de pago)
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_plan_status ON orders(user_id, plan, status);

-- Índices para documents (caching de documentos generados)
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_type ON documents(user_id, doc_type);
CREATE INDEX IF NOT EXISTS idx_documents_user_role ON documents(user_id, role_id);

-- Índices para assessment_jobs (polling de estado)
CREATE INDEX IF NOT EXISTS idx_assessment_jobs_user_id ON assessment_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_jobs_status ON assessment_jobs(status, created_at);
CREATE INDEX IF NOT EXISTS idx_assessment_jobs_pending ON assessment_jobs(status) WHERE status IN ('pending', 'processing');

-- Índices para roles_catalog
CREATE INDEX IF NOT EXISTS idx_roles_catalog_active ON roles_catalog(is_active);
CREATE INDEX IF NOT EXISTS idx_roles_catalog_category ON roles_catalog(category) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_roles_catalog_demand ON roles_catalog(demand_level) WHERE is_active = true;

-- Índices para timestamps (queries de rango temporal)
CREATE INDEX IF NOT EXISTS idx_skills_maps_created ON skills_maps(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_created ON profiles(created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) — Seguridad Score 9/10
-- =====================================================

-- Enable RLS on all user-data tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills_maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only see their own data
-- Note: Using user_id match (for service role, these are bypassed)

-- Profiles: users see only their own
CREATE POLICY "profiles_user_isolation" ON profiles
  FOR ALL USING (user_id = auth.uid());

-- Skills maps: users see only their own
CREATE POLICY "skills_maps_user_isolation" ON skills_maps
  FOR ALL USING (user_id = auth.uid());

-- Role matches: users see only their own
CREATE POLICY "role_matches_user_isolation" ON role_matches
  FOR ALL USING (user_id = auth.uid());

-- Orders: users see only their own
CREATE POLICY "orders_user_isolation" ON orders
  FOR ALL USING (user_id = auth.uid());

-- Documents: users see only their own
CREATE POLICY "documents_user_isolation" ON documents
  FOR ALL USING (user_id = auth.uid());

-- Assessment jobs: users see only their own
CREATE POLICY "assessment_jobs_user_isolation" ON assessment_jobs
  FOR ALL USING (user_id = auth.uid());

-- =====================================================
-- AUDIT LOG TABLE (Seguridad adicional)
-- =====================================================

CREATE TABLE IF NOT EXISTS security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- 'rate_limit', 'injection_attempt', 'auth_failure', 'suspicious_activity'
  user_id UUID REFERENCES users(id),
  ip_address TEXT,
  user_agent TEXT,
  endpoint TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_created ON security_audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_event_type ON security_audit_log(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_ip ON security_audit_log(ip_address, created_at DESC);

-- =====================================================
-- DOCUMENT CACHING — Evitar regeneración innecesaria
-- =====================================================

-- Add column to track source skills_map version
ALTER TABLE documents ADD COLUMN IF NOT EXISTS skills_map_version TIMESTAMPTZ;

-- Function to check if document needs regeneration
CREATE OR REPLACE FUNCTION needs_document_regeneration(
  p_user_id UUID,
  p_doc_type TEXT,
  p_role_id UUID DEFAULT NULL
) RETURNS BOOLEAN AS $$
DECLARE
  v_skills_map_updated TIMESTAMPTZ;
  v_doc_created TIMESTAMPTZ;
BEGIN
  -- Get latest skills_map update time
  SELECT updated_at INTO v_skills_map_updated
  FROM skills_maps
  WHERE user_id = p_user_id
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- Get document creation time
  SELECT created_at INTO v_doc_created
  FROM documents
  WHERE user_id = p_user_id 
    AND doc_type = p_doc_type
    AND (p_role_id IS NULL OR role_id = p_role_id)
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- If no document exists, needs generation
  IF v_doc_created IS NULL THEN
    RETURN TRUE;
  END IF;
  
  -- If skills_map updated after document, needs regeneration
  IF v_skills_map_updated > v_doc_created THEN
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;
