'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Heart, DollarSign, Star } from 'lucide-react'

interface FavoriteItem {
  id: string
  title: string
  brand: string
  price: number
  condition: 'New' | 'Like New' | 'Good' | 'Fair'
  images: string[]
  description: string
  seller: string
  rating: number
  location: string
  specifications: {
    weight: string
    headSize: string
    stringPattern: string
    balance: string
  }
}

// Marketplace Header Component
const MarketplaceHeader = () => {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/20"
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 lg:py-5">
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
          {/* Logo Section - Responsive sizing */}
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 lg:gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.img 
              src="/Untitled design (1).png" 
              alt="CourtCycle" 
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
            <div>
              <motion.h1 
                className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-tight"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                CourtCycle
              </motion.h1>
              <motion.p 
                className="text-xs sm:text-sm text-gray-400 font-medium leading-tight"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Marketplace
              </motion.p>
            </div>
          </motion.div>

          {/* Navigation - Hidden on mobile, responsive on larger screens */}
          <motion.nav 
            className="hidden lg:flex items-center justify-center gap-4 xl:gap-8 absolute left-1/2 transform -translate-x-1/2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              { name: 'Browse', href: '/marketplace', active: false },
              { name: 'Sell', href: '/sell', active: false },
              { name: 'My Listings', href: '/marketplace/my-listings', active: false },
              { name: 'Favorites', href: '/marketplace/favorites', active: true }
            ].map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`nav-button relative px-3 py-2 whitespace-nowrap text-sm ${
                  item.active 
                    ? 'text-white' 
                    : 'text-gray-400'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                <p className="nav-text" data-text={item.name}>{item.name}</p>
                {item.active && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"
                    layoutId="activeTab"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            ))}
            
            <style jsx>{`
              .nav-button {
                --primary-color: #9ca3af;
                --hovered-color: #ffffff;
                position: relative;
                display: flex;
                font-weight: 600;
                font-size: 20px;
                gap: 0.5rem;
                align-items: center;
                padding: 0;
                margin: 0;
                border: none;
                background: none;
                cursor: pointer;
                text-decoration: none;
                transition: all 0.3s ease-out;
              }

              .nav-button.text-white {
                --primary-color: #ffffff;
                --hovered-color: #ffffff;
              }

              .nav-text {
                margin: 0;
                position: relative;
                font-size: 20px;
                color: var(--primary-color);
                transition: color 0.3s ease-out;
              }

              .nav-button::after {
                position: absolute;
                content: "";
                width: 0;
                left: 0;
                bottom: -7px;
                background: var(--hovered-color);
                height: 2px;
                transition: 0.3s ease-out;
              }

              .nav-text::before {
                position: absolute;
                content: attr(data-text);
                width: 0%;
                inset: 0;
                color: var(--hovered-color);
                overflow: hidden;
                transition: 0.3s ease-out;
              }

              .nav-button:hover::after {
                width: 100%;
              }

              .nav-button:hover .nav-text::before {
                width: 100%;
              }

              .nav-button:hover .nav-text {
                color: var(--hovered-color);
              }

              /* Active state overrides */
              .nav-button.text-white::after {
                width: 100%;
              }
            `}</style>
          </motion.nav>

          {/* Exit Button - Mobile responsive */}
          <motion.div 
            className="flex items-center"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.a 
              href="/"
              className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-white transition-colors duration-200 bg-white/5 hover:bg-white/10 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 lg:py-2 border border-white/10 hover:border-white/20"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={16} className="sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
              <span className="text-xs sm:text-sm font-medium hidden lg:block">Exit</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default function FavoritesPage() {
  const { user, loading } = useAuth()
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(storedFavorites)
  }, [])

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter(item => item.id !== id)
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Marketplace Header */}
      <MarketplaceHeader />

      {/* Main Content */}
      <div className="pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">Favorites</h1>
            <p className="text-gray-400 text-lg sm:text-xl">Your saved rackets</p>
          </motion.div>

          {/* Favorites Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {favorites.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                  <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart size={40} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No favorites yet</h3>
                  <p className="text-gray-400 mb-6">Start browsing and save rackets you like</p>
                  <motion.a
                    href="/marketplace"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-block"
                  >
                    Browse Marketplace
                  </motion.a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {favorites.map((racket, index) => (
                  <motion.div
                    key={racket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                      <div className="text-6xl">🎾</div>
                      <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium">
                        {racket.condition}
                      </span>
                      <button
                        onClick={() => removeFavorite(racket.id)}
                        className="absolute top-3 right-3 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                      >
                        <Heart size={16} className="text-white fill-current" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                        {racket.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{racket.brand}</p>
                      
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{racket.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <DollarSign size={16} className="text-green-400" />
                          <span className="text-green-400 font-bold">${racket.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-400 fill-current" size={12} />
                          <span className="text-xs text-gray-400">{racket.rating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-3">
                        <div>Weight: {racket.specifications.weight}</div>
                        <div>Head: {racket.specifications.headSize}</div>
                        <div>String: {racket.specifications.stringPattern}</div>
                        <div>Balance: {racket.specifications.balance}</div>
                      </div>

                      <div className="text-xs text-gray-500">
                        Seller: {racket.seller}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Back to Marketplace Button */}
          {favorites.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-8"
            >
              <motion.a
                href="/marketplace"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Continue Browsing
              </motion.a>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

