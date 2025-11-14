import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ SUPABASE CONFIGURATION ERROR!')
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('Missing required environment variables:')
    if (!supabaseUrl) console.error('  ✗ NEXT_PUBLIC_SUPABASE_URL')
    if (!supabaseKey) console.error('  ✗ NEXT_PUBLIC_SUPABASE_ANON_KEY')
    console.error('')
    console.error('📝 LOCAL DEVELOPMENT:')
    console.error('  1. Create a .env.local file in squash-marketplace/')
    console.error('  2. Add your Supabase credentials (see SUPABASE_SETUP.md)')
    console.error('')
    console.error('🚀 PRODUCTION DEPLOYMENT:')
    console.error('  1. Add environment variables in your deployment platform')
    console.error('     (Vercel Settings → Environment Variables)')
    console.error('  2. Redeploy your application')
    console.error('  3. See DEPLOYMENT_GUIDE.md for detailed instructions')
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    
    // Return a mock client to prevent app crashes during development
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}

export const supabase = createClient() 