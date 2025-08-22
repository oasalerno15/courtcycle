'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'

export default function ConditionalHeader() {
  const pathname = usePathname()
  
  // Don't show header on marketplace or sell pages
  const isMarketplacePage = pathname.startsWith('/marketplace') || 
                           pathname.startsWith('/sell')
  
  if (isMarketplacePage) {
    return null
  }
  
  return <Header />
} 