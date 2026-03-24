#!/usr/bin/env node
/**
 * Setup Supabase Schema for carrera.negoia.com
 * Proyecto dedicado: zpxumldfblbmgqjmlnon
 * Run: node scripts/setup-supabase-schema.js
 */

const SUPABASE_URL = 'https://zpxumldfblbmgqjmlnon.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpweHVtbGRmYmxibWdxam1sbm9uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjQ3MDYzMiwiZXhwIjoyMDg4MDQ2NjMyfQ.Oabsb6KCDfpMhS0IoQmZXrGGPgCBJh5Kw2-CMYBa1KA'

async function query(path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }
  }
  if (body) opts.body = JSON.stringify(body)
  const res = await fetch(`${SUPABASE_URL}${path}`, opts)
  const text = await res.text()
  try { return JSON.parse(text) } catch { return text }
}

// Create tables one by one using REST API inserts (which auto-create if RLS allows)
// For a clean setup, we'll use the Supabase Management API

async function createUsersTable() {
  // Test if table exists by trying to select
  const test = await query('/rest/v1/users?select=id&limit=1')
  if (!test.code) {
    console.log('✅ users table exists')
    return true
  }
  console.log('❌ users table does not exist - needs creation via SQL Editor')
  return false
}

async function createAllTables() {
  console.log('Checking tables in project zpxumldfblbmgqjmlnon...\n')
  
  const tables = ['users', 'profiles', 'skills_maps', 'roles_catalog', 'role_matches', 'orders', 'documents', 'assessment_jobs']
  
  for (const table of tables) {
    const test = await query(`/rest/v1/${table}?select=*&limit=1`)
    if (test.code) {
      console.log(`❌ ${table}: NOT FOUND (error: ${test.code})`)
    } else {
      console.log(`✅ ${table}: EXISTS (${Array.isArray(test) ? test.length : '?'} rows)`)
    }
  }
  
  console.log('\n---')
  console.log('If tables are missing, please run the SQL in supabase/schema.sql')
  console.log('via the Supabase Dashboard SQL Editor at:')
  console.log('https://supabase.com/dashboard/project/zpxumldfblbmgqjmlnon/sql')
}

createAllTables().catch(console.error)
