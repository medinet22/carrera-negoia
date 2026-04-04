import { createClient } from '@supabase/supabase-js'
import { sendAbandonmentEmail } from '../../../../lib/email'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

/**
 * Cron endpoint to send abandonment emails
 * Finds users who:
 * - Have profile_ready_at set (assessment completed)
 * - profile_ready_at is more than 24h ago
 * - No paid order exists
 * - abandonment_email_sent is false/null
 * 
 * Run this endpoint via Vercel Cron, external service, or manual trigger
 * Recommended: Every 6 hours
 */
export async function GET(request) {
  try {
    // Verify cron secret if configured
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    
    // Find users with completed profile but no payment
    // Using raw query to handle the NOT EXISTS properly
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, name, profile_ready_at, abandonment_email_sent')
      .not('profile_ready_at', 'is', null)
      .lt('profile_ready_at', twentyFourHoursAgo)
      .or('abandonment_email_sent.is.null,abandonment_email_sent.eq.false')
      .limit(50) // Process max 50 per run to avoid timeout

    if (usersError) {
      console.error('Error fetching users:', usersError)
      return Response.json({ error: 'Database error' }, { status: 500 })
    }

    if (!users || users.length === 0) {
      return Response.json({ 
        message: 'No users to process',
        processed: 0
      })
    }

    const results = {
      processed: 0,
      sent: 0,
      skipped: 0,
      errors: []
    }

    for (const user of users) {
      try {
        // Check if user has a paid order
        const { data: paidOrder } = await supabase
          .from('orders')
          .select('id')
          .eq('user_id', user.id)
          .eq('status', 'paid')
          .limit(1)
          .single()

        if (paidOrder) {
          // User has paid, mark to skip future checks
          await supabase.from('users').update({
            abandonment_email_sent: true
          }).eq('id', user.id)
          
          results.skipped++
          results.processed++
          continue
        }

        // Send abandonment email
        const emailResult = await sendAbandonmentEmail(user.email, user.name, user.id)
        
        if (emailResult.success) {
          // Mark email as sent
          await supabase.from('users').update({
            abandonment_email_sent: true,
            abandonment_email_sent_at: new Date().toISOString()
          }).eq('id', user.id)
          
          results.sent++
          
          if (process.env.NODE_ENV !== 'production') {
            console.log(`📧 Abandonment email sent to ${user.email}`)
          }
        } else {
          results.errors.push({ userId: user.id, error: emailResult.error })
        }
        
        results.processed++
        
        // Small delay between emails to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 200))
        
      } catch (err) {
        results.errors.push({ userId: user.id, error: err.message })
        results.processed++
      }
    }

    console.log(`[Abandonment Cron] Processed: ${results.processed}, Sent: ${results.sent}, Skipped: ${results.skipped}`)

    return Response.json({
      success: true,
      ...results
    })

  } catch (err) {
    console.error('Abandonment cron error:', err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}

// Also support POST for manual triggers
export async function POST(request) {
  return GET(request)
}
