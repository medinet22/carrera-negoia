#!/usr/bin/env node
/**
 * Seed roles_catalog from roles-catalog.json
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SUPABASE_URL = 'https://zpxumldfblbmgqjmlnon.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpweHVtbGRmYmxibWdxam1sbm9uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjQ3MDYzMiwiZXhwIjoyMDg4MDQ2NjMyfQ.Oabsb6KCDfpMhS0IoQmZXrGGPgCBJh5Kw2-CMYBa1KA'

async function seedRoles() {
  const rolesPath = path.join(__dirname, '..', 'data', 'roles-catalog.json')
  const roles = JSON.parse(fs.readFileSync(rolesPath, 'utf8'))
  
  console.log(`Seeding ${roles.length} roles into roles_catalog...`)
  
  // Transform roles to match table schema
  const transformed = roles.map(role => ({
    id: role.id,
    title: role.title,
    category: role.category,
    tier: role.tier || null,
    headline: role.title_es || role.title,
    salary_range_es: role.salary_ranges?.ES ? `€${role.salary_ranges.ES.min}-${role.salary_ranges.ES.max}` : null,
    salary_range_mx: role.salary_ranges?.MX ? `${role.salary_ranges.MX.min}-${role.salary_ranges.MX.max} MXN` : null,
    salary_range_co: role.salary_ranges?.CO ? `${role.salary_ranges.CO.min}-${role.salary_ranges.CO.max} COP` : null,
    salary_range_ar: role.salary_ranges?.AR ? `${role.salary_ranges.AR.min}-${role.salary_ranges.AR.max} ARS` : null,
    demand_level: role.demand_level,
    required_skills: role.required_hard_skills || [],
    nice_to_have_skills: role.required_soft_skills || [],
    typical_titles: role.companies_hiring || [],
    day_in_life: role.day_to_day,
    career_path: { 
      growth_trend: role.growth_trend,
      growth_percentage: role.growth_percentage,
      remote_friendly: role.remote_friendly
    },
    resources: role.transition_from || []
  }))
  
  // Upsert in batches of 10
  const batchSize = 10
  for (let i = 0; i < transformed.length; i += batchSize) {
    const batch = transformed.slice(i, i + batchSize)
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/roles_catalog`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(batch)
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error(`Error in batch ${i}: ${error}`)
    } else {
      console.log(`✅ Batch ${i/batchSize + 1}/${Math.ceil(transformed.length/batchSize)} inserted`)
    }
  }
  
  // Verify count
  const countResponse = await fetch(`${SUPABASE_URL}/rest/v1/roles_catalog?select=id`, {
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
    }
  })
  const count = (await countResponse.json()).length
  console.log(`\n✅ Total roles in database: ${count}`)
}

seedRoles().catch(console.error)
