'use client'

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import AuthModal from "@/components/Auth/AuthModal"
import { User, LogOut } from "lucide-react"

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, signOut, loading } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          {/* Logo - Very Top Left, ABSOLUTELY MASSIVE */}
          <div className="flex-1 relative">
            <img 
              src="/Untitled design (1).png" 
              alt="Untitled Design" 
              className="h-64 w-auto absolute -top-8 -left-96 z-[9999]"
              style={{ 
                position: 'absolute',
                zIndex: 9999,
                pointerEvents: 'auto',
                display: 'block'
              }}
            />
        </div>

          {/* Navigation Links - Center, moved down much more */}
          <nav className="flex items-center space-x-12 mt-16">
            <a 
              href="/" 
              className="text-white font-bold text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
            >
              Home
            </a>
          <a 
            href="#about" 
            className="text-white font-bold text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            About
          </a>
          <a 
            href="#what-we-do" 
            className="text-white font-bold text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            What We Do
          </a>
          <a 
            href="#mission" 
            className="text-white font-bold text-2xl uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            Our Mission
          </a>
        </nav>

        {/* Right Side - Empty for balance */}
        <div className="flex-1" />
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
