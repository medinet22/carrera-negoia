import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const SETUP_TOKEN = 'setup-carrera-2026'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (token !== SETUP_TOKEN) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = {
    table: null,
    bucket: null
  }

  // 1. Create table via Supabase REST API (using SQL)
  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS analisis_solicitudes (
          id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
          email text NOT NULL,
          nombre text,
          situacion_actual text,
          cv_texto text,
          cv_url text,
          linkedin_url text,
          stripe_session_id text,
          estado text DEFAULT 'pendiente_pago',
          pagado_at timestamptz,
          created_at timestamptz DEFAULT now()
        );
        
        CREATE INDEX IF NOT EXISTS idx_analisis_email ON analisis_solicitudes(email);
        CREATE INDEX IF NOT EXISTS idx_analisis_estado ON analisis_solicitudes(estado);
      `
    })
    
    if (error) {
      // Try direct approach - just check if table exists by inserting
      const { error: testError } = await supabase
        .from('analisis_solicitudes')
        .select('id')
        .limit(1)
      
      if (testError && testError.code === '42P01') {
        results.table = { error: 'Table does not exist. Create manually in Supabase dashboard.' }
      } else if (testError) {
        results.table = { error: testError.message }
      } else {
        results.table = { status: 'exists', message: 'Table already exists' }
      }
    } else {
      results.table = { status: 'created', data }
    }
  } catch (e) {
    results.table = { error: e.message }
  }

  // 2. Create storage bucket
  try {
    const { data, error } = await supabase.storage.createBucket('cvs', {
      public: false,
      fileSizeLimit: 5 * 1024 * 1024, // 5MB
      allowedMimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    })

    if (error && error.message.includes('already exists')) {
      results.bucket = { status: 'exists', message: 'Bucket already exists' }
    } else if (error) {
      results.bucket = { error: error.message }
    } else {
      results.bucket = { status: 'created', data }
    }
  } catch (e) {
    results.bucket = { error: e.message }
  }

  return Response.json({
    success: true,
    results,
    instructions: {
      table: results.table?.error ? 
        'Run this SQL in Supabase SQL Editor: CREATE TABLE analisis_solicitudes (id uuid DEFAULT gen_random_uuid() PRIMARY KEY, email text NOT NULL, nombre text, situacion_actual text, cv_texto text, cv_url text, linkedin_url text, stripe_session_id text, estado text DEFAULT \'pendiente_pago\', pagado_at timestamptz, created_at timestamptz DEFAULT now());' : 
        'Table ready',
      bucket: results.bucket?.error ?
        'Create bucket "cvs" manually in Supabase Storage' :
        'Bucket ready'
    }
  })
}
