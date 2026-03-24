#!/usr/bin/env node
/**
 * Migration: Add expires_at column to assessment_jobs
 * Run once to fix the missing column
 */

const PROJECT_REF = 'zpxumldfblbmgqjmlnon'
const SUPABASE_PAT = 'sbp_7a433d0db85fb9754590791b5ac04eeef1bb81bb'

const SQL = `
-- Add expires_at column if it doesn't exist
ALTER TABLE assessment_jobs ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;
`

async function runMigration() {
  console.log('Running migration: add expires_at to assessment_jobs...')
  
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
    console.log('✅ Migration successful! expires_at column added.')
  } else {
    console.log('❌ Migration failed:', result)
  }
}

runMigration().catch(console.error)
