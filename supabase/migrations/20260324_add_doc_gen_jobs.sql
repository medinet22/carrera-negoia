-- Migration: Add document generation jobs table
-- Date: 2026-03-24
-- Purpose: Support async document generation via OpenClaw webhook

-- Document Generation Jobs
CREATE TABLE IF NOT EXISTS document_generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- pending, processing, done, failed
  error TEXT,
  documents_generated INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_doc_gen_jobs_user_status ON document_generation_jobs(user_id, status);
CREATE INDEX IF NOT EXISTS idx_doc_gen_jobs_pending ON document_generation_jobs(status) WHERE status = 'pending';

-- Carrera Profiles (extended profile data)
CREATE TABLE IF NOT EXISTS carrera_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  cv_raw_text TEXT,
  cv_file_url TEXT,
  intake_answers JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_carrera_profiles_user ON carrera_profiles(user_id);

-- Add missing columns to skills_maps if not exist
ALTER TABLE skills_maps ADD COLUMN IF NOT EXISTS superpower JSONB;
ALTER TABLE skills_maps ADD COLUMN IF NOT EXISTS what_others_see TEXT;
ALTER TABLE skills_maps ADD COLUMN IF NOT EXISTS fear_addressed TEXT;
ALTER TABLE skills_maps ADD COLUMN IF NOT EXISTS employability_index INTEGER;

-- Add missing columns to role_matches if not exist
ALTER TABLE role_matches ADD COLUMN IF NOT EXISTS why_now TEXT;
ALTER TABLE role_matches ADD COLUMN IF NOT EXISTS quick_wins JSONB;
ALTER TABLE role_matches ADD COLUMN IF NOT EXISTS match_type TEXT;
