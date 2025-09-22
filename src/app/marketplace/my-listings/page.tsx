'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Plus, Trash2, Edit, DollarSign } from 'lucide-react'

interface UserListing {
  id: string
  title: string
  brand: string
  price: string
  condition: string
  description: string
  dateAdded: string
  seller: string
  rating: number
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
      <div className="w-full px-12 py-5">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - Far Left */}
          <motion.div 
            className="flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.img 
              src="/Untitled design (1).png" 
              alt="CourtCycle" 
              className="h-14 w-auto"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
            <div>
              <motion.h1 
                className="text-2xl font-bold text-white leading-tight"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                CourtCycle
              </motion.h1>
              <motion.p 
                className="text-sm text-gray-400 font-medium leading-tight"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Marketplace
              </motion.p>
            </div>
          </motion.div>

          {/* Navigation - Centered */}
          <motion.nav 
            className="hidden lg:flex items-center justify-center gap-8 absolute left-1/2 transform -translate-x-1/2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              { name: 'Browse', href: '/marketplace', active: false },
              { name: 'Sell', href: '/sell', active: false },
              { name: 'My Listings', href: '/marketplace/my-listings', active: true },
              { name: 'Favorites', href: '/marketplace/favorites', active: false }
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

          {/* Exit Button - Far Right */}
          <motion.div 
            className="flex items-center"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.a 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 bg-white/5 hover:bg-white/10 rounded-full px-3 py-2 border border-white/10 hover:border-white/20"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={20} />
              <span className="text-sm font-medium hidden sm:block">Exit</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default function MyListingsPage() {
  const { user, loading } = useAuth()
  const [listings, setListings] = useState<UserListing[]>([])

  useEffect(() => {
    // Load user listings from localStorage
    const storedListings = JSON.parse(localStorage.getItem('userListings') || '[]')
    setListings(storedListings)
  }, [])

  const handleDeleteListing = (id: string) => {
    const updatedListings = listings.filter(listing => listing.id !== id)
    setListings(updatedListings)
    localStorage.setItem('userListings', JSON.stringify(updatedListings))
    
    // Also remove from favorites if it exists there
    const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const updatedFavorites = currentFavorites.filter((item: any) => item.id !== id)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Marketplace Header */}
      <MarketplaceHeader />

      {/* Main Content */}
      <div className="pt-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">My Listings</h1>
            <p className="text-gray-400 text-lg sm:text-xl">Manage your racket listings</p>
          </motion.div>

          {/* Listings Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {listings.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                  <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus size={40} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No listings yet</h3>
                  <p className="text-gray-400 mb-6">Start by listing your first racket</p>
                  <motion.a
                    href="/sell"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-block"
                  >
                    List a Racket
                  </motion.a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-white text-lg mb-1">{listing.title}</h3>
                        <p className="text-gray-400 text-sm">{listing.brand}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-green-400" />
                        <span className="text-green-400 font-bold">{listing.price}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-lg text-xs font-medium">
                        {listing.condition}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{listing.description}</p>
                    
                    <div className="text-xs text-gray-500 mb-4">
                      Listed on {new Date(listing.dateAdded).toLocaleDateString()}
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit size={14} />
                        Edit
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteListing(listing.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Add New Listing Button */}
          {listings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-8"
            >
              <motion.a
                href="/sell"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <Plus size={20} />
                List Another Racket
              </motion.a>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

