'use client'

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import AuthModal from "@/components/Auth/AuthModal"
import Link from 'next/link'

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { user, signOut, loading } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  // Handle scroll-based header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show header when at top, hide when scrolling down
      if (currentScrollY <= 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 transition-all duration-300 ease-in-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          {/* Logo - Responsive sizing */}
          <div className="flex-1 relative">
            <img 
              src="/Untitled design (1).png" 
              alt="Untitled Design" 
              className="h-32 sm:h-48 md:h-64 w-auto absolute -top-4 sm:-top-6 md:-top-8 -left-24 sm:-left-48 md:-left-96 z-[9999]"
              style={{ 
                position: 'absolute',
                zIndex: 9999,
                pointerEvents: 'auto',
                display: 'block'
              }}
            />
        </div>

          {/* Navigation Links - Mobile responsive */}
          <nav className="hidden sm:flex items-center space-x-4 md:space-x-8 lg:space-x-12 mt-8 sm:mt-12 md:mt-16">
            <Link 
              href="/" 
              className="text-white font-bold text-sm sm:text-lg md:text-xl lg:text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
            >
              Home
            </Link>
          <Link 
            href="#about" 
            className="text-white font-bold text-sm sm:text-lg md:text-xl lg:text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            About
          </Link>
          <Link 
            href="#what-we-do" 
            className="text-white font-bold text-sm sm:text-lg md:text-xl lg:text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            What We Do
          </Link>
          <Link 
            href="#mission" 
            className="text-white font-bold text-sm sm:text-lg md:text-xl lg:text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            Our Mission
          </Link>
        </nav>

        {/* Mobile Navigation Menu Button */}
        <div className="sm:hidden mt-8">
          <button className="text-white p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Right Side - Empty for balance on larger screens */}
        <div className="hidden sm:block flex-1" />
      </div>
    </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  )
}
