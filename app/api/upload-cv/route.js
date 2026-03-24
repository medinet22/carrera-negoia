import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ error: 'File too large. Max 5MB.' }, { status: 400 })
    }

    // Validate type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!validTypes.includes(file.type)) {
      return Response.json({ error: 'Invalid file type. Only PDF and Word allowed.' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomSuffix = Math.random().toString(36).substring(2, 8)
    const ext = file.name.split('.').pop()
    const filename = `cv_${timestamp}_${randomSuffix}.${ext}`

    // Convert to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('cvs')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false
      })

    if (error) {
      console.error('Supabase Storage error:', error)
      // Fallback: return filename only, ask to send by email
      return Response.json({ 
        url: null, 
        filename: file.name, 
        fallback: 'email',
        message: 'Storage unavailable. Please attach CV by email.'
      })
    }

    // Get public URL (signed URL for private bucket)
    const { data: urlData } = await supabase.storage
      .from('cvs')
      .createSignedUrl(filename, 60 * 60 * 24 * 7) // 7 days

    return Response.json({ 
      url: urlData?.signedUrl || null,
      filename: file.name,
      storagePath: filename
    })

  } catch (err) {
    console.error('Upload CV error:', err)
    return Response.json({ 
      url: null, 
      filename: null, 
      fallback: 'email',
      error: 'Upload failed'
    }, { status: 500 })
  }
}
