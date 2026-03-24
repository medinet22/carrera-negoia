#!/usr/bin/env node
/**
 * Create Supabase tables for carrera.negoia.com
 * Uses Management API with PAT
 */

const PROJECT_REF = 'zpxumldfblbmgqjmlnon'
const SUPABASE_PAT = 'sbp_7a433d0db85fb9754590791b5ac04eeef1bb81bb'

const SQL = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  country TEXT DEFAULT 'ES',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- CARRERA_PROFILES (prefixed to avoid collision with Scout's profiles)
CREATE TABLE IF NOT EXISTS carrera_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  cv_text TEXT,
  intake_answers JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_carrera_profiles_user ON carrera_profiles(user_id);

-- SKILLS_MAPS
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

-- ROLES_CATALOG
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

-- ROLE_MATCHES
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

-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending',
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- DOCUMENTS
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES carrera_profiles(id) ON DELETE CASCADE,
  role_id TEXT,
  doc_type TEXT NOT NULL,
  content JSONB DEFAULT '{}',
  html TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_documents_profile ON documents(profile_id);

-- ASSESSMENT_JOBS
CREATE TABLE IF NOT EXISTS assessment_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES carrera_profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  error_message TEXT,
  skills_count INTEGER,
  roles_matched INTEGER,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_assessment_jobs_user ON assessment_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_jobs_status ON assessment_jobs(status);
`

async function runSQL() {
  console.log('Creating tables via Supabase Management API...')
  
  const response = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_PAT}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: SQL })
  })
  
  const result = await response.text()
  console.log('Status:', response.status)
  
  if (response.ok) {
    console.log('✅ Tables created successfully!')
  } else {
    console.log('Response:', result)
    
    // Alternative: Try pg-direct if Management API doesn't work
    console.log('\nTrying alternative method with direct connection...')
    try {
      const { execSync } = await import('child_process')
      // Use pg_isready to check if we can connect
      execSync('which psql', { encoding: 'utf8' })
      console.log('psql found, could use direct connection')
    } catch {
      console.log('psql not available')
    }
  }
}

runSQL().catch(console.error)
