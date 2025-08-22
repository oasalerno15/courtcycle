'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Plus, Heart, Star, DollarSign, User, LogOut, Home, Bell, MessageCircle, Settings } from 'lucide-react'

interface RacketListing {
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

// Sample data - later this will come from Supabase
const sampleRackets: RacketListing[] = [
  {
    id: '1',
    title: 'Technifibre Carboflex 125 X-Speed',
    brand: 'Technifibre',
    price: 185,
    condition: 'Like New',
    images: [
      '/Untitled design (2).png',
      '/Untitled design (2).png',
      '/Untitled design (2).png',
      '/Untitled design (2).png'
    ],
    description: 'Professional squash racket used by top players. Excellent condition, barely used.',
    seller: 'ProSquashPlayer',
    rating: 4.8,
    location: 'New York, NY',
    specifications: {
      weight: '125g',
      headSize: '500cm²',
      stringPattern: '14x18',
      balance: 'Head Light'
    }
  },
  {
    id: '2',
    title: 'Prince Pro Beast 750',
    brand: 'Prince',
    price: 220,
    condition: 'New',
    images: [
      '/Untitled design (2).png',
      '/Untitled design (2).png',
      '/Untitled design (2).png'
    ],
    description: 'Brand new Prince Pro Beast 750. Never used, comes with original packaging.',
    seller: 'SquashGearPro',
    rating: 4.9,
    location: 'Boston, MA',
    specifications: {
      weight: '135g',
      headSize: '750cm²',
      stringPattern: '16x19',
      balance: 'Even'
    }
  },
  {
    id: '3',
    title: 'Dunlop Biomimetic Pro GTS 130',
    brand: 'Dunlop',
    price: 150,
    condition: 'Good',
    images: [
      '/Untitled design (2).png',
      '/Untitled design (2).png'
    ],
    description: 'Great intermediate racket. Some wear but still plays excellently.',
    seller: 'SquashLover23',
    rating: 4.5,
    location: 'Chicago, IL',
    specifications: {
      weight: '130g',
      headSize: '500cm²',
      stringPattern: '14x18',
      balance: 'Head Light'
    }
  }
]

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
            className="hidden lg:flex items-center justify-center gap-16 absolute left-1/2 transform -translate-x-1/2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              { name: 'Browse', href: '/marketplace', active: true },
              { name: 'Sell', href: '/sell', active: false },
              { name: 'My Listings', href: '/marketplace/my-listings', active: false },
              { name: 'Favorites', href: '/marketplace/favorites', active: false }
            ].map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`nav-button relative px-6 py-4 whitespace-nowrap ${
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

          {/* User Menu - Far Right */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Notifications */}
            <motion.button 
              className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell size={24} />
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
            
            {/* Messages */}
            <motion.button 
              className="p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle size={24} />
            </motion.button>

            {/* User Profile */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 hover:bg-white/15 transition-colors duration-200"
                whileHover={{ y: -1 }}
              >
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <User size={18} className="text-white" />
                </motion.div>
                <span className="text-white text-sm font-medium hidden sm:block">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                </span>
              </motion.div>
              
              {/* Sign Out */}
              <motion.button
                onClick={handleSignOut}
                className="flex items-center justify-center w-9 h-9 bg-white/10 hover:bg-red-500/20 backdrop-blur-sm border border-white/20 hover:border-red-500/40 rounded-full text-white transition-all duration-200"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut size={16} />
              </motion.button>
            </motion.div>

            {/* Exit Button */}
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

export default function MarketplacePage() {
  const { user, loading } = useAuth()
  const [rackets, setRackets] = useState<RacketListing[]>(sampleRackets)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [filterCondition, setFilterCondition] = useState('all')
  const [selectedRacket, setSelectedRacket] = useState<RacketListing | null>(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/'
    }
  }, [user, loading])

  // Reset image index when modal opens
  useEffect(() => {
    if (selectedRacket) {
      setCurrentImageIndex(0)
    }
  }, [selectedRacket])

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoadingMore) {
        return
      }
      loadMoreRackets()
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoadingMore])

  const loadMoreRackets = async () => {
    setIsLoadingMore(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Add more sample rackets (duplicating existing ones with new IDs and multiple images)
    const moreRackets = sampleRackets.map((racket, index) => ({
      ...racket,
      id: `${racket.id}-${Date.now()}-${index}`,
      title: `${racket.title} - ${Math.floor(Math.random() * 100)}`,
      price: racket.price + Math.floor(Math.random() * 50) - 25,
      images: [
        racket.images[0],
        racket.images[0], // Duplicate for demo - in real app these would be different images
        racket.images[0],
        racket.images[0]
      ]
    }))
    
    setRackets(prev => [...prev, ...moreRackets])
    setIsLoadingMore(false)
  }

  const nextImage = () => {
    if (selectedRacket && currentImageIndex < selectedRacket.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1)
    }
  }

  const filteredRackets = rackets.filter(racket => {
    const matchesSearch = racket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         racket.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCondition = filterCondition === 'all' || racket.condition === filterCondition
    return matchesSearch && matchesCondition
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Marketplace Header */}
      <MarketplaceHeader />

      {/* Main Content */}
      <div className="pt-28">
        {/* Welcome Section */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'User'}!
            </h2>
            <p className="text-gray-400">Discover premium squash rackets from trusted sellers</p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search rackets, brands, or models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {/* Condition Filter */}
              <select
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
              >
                <option value="all">All Conditions</option>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </motion.div>
        </div>

        {/* Racket Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRackets.map((racket, index) => (
              <motion.div
                key={racket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedRacket(racket)}
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
                  <img
                    src={racket.images[0]}
                    alt={racket.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button 
                    className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-red-400 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Add to favorites logic here
                    }}
                  >
                    <Heart size={16} />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                    {racket.condition}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-white line-clamp-1">{racket.title}</h3>
                      <p className="text-sm text-gray-400">{racket.brand}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">${racket.price}</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">{racket.description}</p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-3">
                    <div>Weight: {racket.specifications.weight}</div>
                    <div>Head: {racket.specifications.headSize}</div>
                    <div>String: {racket.specifications.stringPattern}</div>
                    <div>Balance: {racket.specifications.balance}</div>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {racket.seller[0]}
                      </div>
                      <span className="text-sm text-gray-400">{racket.seller}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-current" size={12} />
                      <span className="text-xs text-gray-400">{racket.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Loading indicator */}
          {isLoadingMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading more rackets...</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Racket Detail Modal */}
      {selectedRacket && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedRacket(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">{selectedRacket.title}</h2>
              <button
                onClick={() => setSelectedRacket(null)}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="relative h-[500px] bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden">
                  <img
                    src={selectedRacket.images[currentImageIndex]}
                    alt={selectedRacket.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Condition Badge */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white">
                    {selectedRacket.condition}
                  </div>

                  {/* Image Navigation Arrows */}
                  {selectedRacket.images.length > 1 && (
                    <>
                      {/* Previous Arrow */}
                      {currentImageIndex > 0 && (
                        <motion.button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10 border border-white/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.button>
                      )}

                      {/* Next Arrow */}
                      {currentImageIndex < selectedRacket.images.length - 1 && (
                        <motion.button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10 border border-white/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.button>
                      )}

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {selectedRacket.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                {/* Price and Brand */}
                <div>
                  <div className="text-3xl font-bold text-white mb-2">${selectedRacket.price}</div>
                  <div className="text-lg text-gray-400">{selectedRacket.brand}</div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300">{selectedRacket.description}</p>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Specifications</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Weight:</span>
                      <span className="text-white ml-2">{selectedRacket.specifications.weight}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Head Size:</span>
                      <span className="text-white ml-2">{selectedRacket.specifications.headSize}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">String Pattern:</span>
                      <span className="text-white ml-2">{selectedRacket.specifications.stringPattern}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Balance:</span>
                      <span className="text-white ml-2">{selectedRacket.specifications.balance}</span>
                    </div>
                  </div>
                </div>

                {/* Seller Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Seller</h3>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedRacket.seller[0]}
                    </div>
                    <div>
                      <div className="text-white font-medium">{selectedRacket.seller}</div>
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-400 fill-current" size={14} />
                        <span className="text-sm text-gray-400">{selectedRacket.rating} rating</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Contact Seller
                  </button>
                  <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                    <Heart size={20} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 