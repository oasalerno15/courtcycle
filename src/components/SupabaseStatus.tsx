'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function SupabaseStatus() {
  const [status, setStatus] = useState<{
    hasUrl: boolean
    hasKey: boolean
    canConnect: boolean
    error?: string
  }>({
    hasUrl: false,
    hasKey: false,
    canConnect: false
  })

  useEffect(() => {
    const checkStatus = async () => {
      const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL && 
                     process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'
      const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
                     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-key'

      let canConnect = false
      let error: string | undefined

      if (hasUrl && hasKey) {
        try {
          // Try to query the listings table
          const { data, error: queryError } = await supabase
            .from('listings')
            .select('count')
            .limit(1)

          if (queryError) {
            error = queryError.message
            canConnect = false
          } else {
            canConnect = true
          }
        } catch (e) {
          error = e instanceof Error ? e.message : 'Unknown error'
          canConnect = false
        }
      }

      setStatus({ hasUrl, hasKey, canConnect, error })
    }

    checkStatus()
  }, [])

  // Only show in development or if there's an issue
  if (process.env.NODE_ENV === 'production' && status.canConnect) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className={`rounded-lg border p-4 shadow-lg backdrop-blur-sm ${
        status.canConnect 
          ? 'bg-green-950/90 border-green-500/50' 
          : 'bg-red-950/90 border-red-500/50'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 h-3 w-3 rounded-full ${
            status.canConnect ? 'bg-green-500' : 'bg-red-500'
          } ${status.canConnect ? 'animate-pulse' : ''}`} />
          <div className="flex-1">
            <h3 className={`font-semibold text-sm mb-2 ${
              status.canConnect ? 'text-green-300' : 'text-red-300'
            }`}>
              {status.canConnect ? '✓ Supabase Connected' : '✗ Supabase Configuration Issue'}
            </h3>
            <div className="space-y-1 text-xs">
              <div className={status.hasUrl ? 'text-green-400' : 'text-red-400'}>
                {status.hasUrl ? '✓' : '✗'} NEXT_PUBLIC_SUPABASE_URL
              </div>
              <div className={status.hasKey ? 'text-green-400' : 'text-red-400'}>
                {status.hasKey ? '✓' : '✗'} NEXT_PUBLIC_SUPABASE_ANON_KEY
              </div>
              <div className={status.canConnect ? 'text-green-400' : 'text-red-400'}>
                {status.canConnect ? '✓' : '✗'} Database Connection
              </div>
            </div>
            {status.error && (
              <div className="mt-2 text-xs text-red-300 border-t border-red-500/30 pt-2">
                <strong>Error:</strong> {status.error}
              </div>
            )}
            {!status.canConnect && (
              <div className="mt-3 text-xs text-gray-300">
                <strong>Fix:</strong>{' '}
                {process.env.NODE_ENV === 'production' 
                  ? 'Add environment variables in your deployment settings and redeploy. See DEPLOYMENT_GUIDE.md'
                  : 'Create .env.local with your Supabase credentials. See SUPABASE_SETUP.md'
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

