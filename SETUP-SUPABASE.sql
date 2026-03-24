-- Ejecutar en Supabase Dashboard > SQL Editor
-- URL: https://supabase.com/dashboard/project/goasfxfeaczhzgzwupzg/sql/new

-- Tabla para solicitudes de Análisis de Carrera
CREATE TABLE IF NOT EXISTS analisis_solicitudes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  nombre text,
  situacion_actual text,
  cv_texto text,
  stripe_session_id text,
  estado text DEFAULT 'pendiente_pago',
  created_at timestamptz DEFAULT now()
);

-- Índice para búsquedas por email
CREATE INDEX IF NOT EXISTS idx_analisis_email ON analisis_solicitudes(email);

-- Índice para filtrar por estado
CREATE INDEX IF NOT EXISTS idx_analisis_estado ON analisis_solicitudes(estado);

-- Habilitar Row Level Security (opcional pero recomendado)
ALTER TABLE analisis_solicitudes ENABLE ROW LEVEL SECURITY;

-- Policy para que el service key pueda hacer todo
CREATE POLICY "Service key full access" ON analisis_solicitudes
  FOR ALL USING (true) WITH CHECK (true);
