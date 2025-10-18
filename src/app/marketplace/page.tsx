'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Plus, Heart, Star, DollarSign, Home, Settings, Truck, MapPin, CreditCard, Check, CheckCircle, AlertCircle, RefreshCw, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface RacketListing {
  id: string
  title: string
  brand: string
  price: number
  condition: 'New' | 'Like New' | 'Good' | 'Fair'
  images: string[]
  description: string
  seller: string
  seller_name?: string
  seller_email: string
  rating: number
  location: string
  type: 'squash' | 'tennis' | 'padel'
  email?: string
  specifications: {
    weight: string
    headSize: string
    stringPattern: string
    balance: string
  }
  created_at?: string
  is_active?: boolean
  is_sold?: boolean
}

// No more fake data - only real user listings

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
              { name: 'Browse', href: '/marketplace', active: true },
              { name: 'Sell', href: '/sell', active: false },
              { name: 'My Listings', href: '/marketplace/my-listings', active: false },
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

export default function MarketplacePage() {
  const { user, loading } = useAuth()
  const [rackets, setRackets] = useState<RacketListing[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [filterCondition, setFilterCondition] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [selectedRacket, setSelectedRacket] = useState<RacketListing | null>(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [selectedPurchaseRacket, setSelectedPurchaseRacket] = useState<RacketListing | null>(null)
  const [deliveryOption, setDeliveryOption] = useState<'shipping' | 'pickup'>('shipping')
  const [paymentStep, setPaymentStep] = useState<'options' | 'payment' | 'success' | 'failed'>('options')
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'confirmed' | 'failed'>('pending')
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [customerEmail, setCustomerEmail] = useState('')

  // Payment processing functions
  const handlePaymentSent = async () => {
    setPaymentStatus('confirmed')
    setPaymentStep('success')
  }

  const handleRetryPayment = () => {
    setPaymentStatus('pending')
    setPaymentStep('payment')
  }

  const handleCloseModal = () => {
    setShowBuyModal(false)
    setPaymentStep('options')
    setPaymentStatus('pending')
    setIsProcessingPayment(false)
  }

  const handleContactSeller = (racket: RacketListing) => {
    if (typeof window === 'undefined') return
    
    const subject = `Inquiry about ${racket.title} - CourtCycle Marketplace`
    const body = `Hi,\n\nI'm interested in your ${racket.title} listed on CourtCycle Marketplace.\n\nCould you please provide more information about:\n- Condition details\n- Availability\n- Any additional photos\n- Shipping options\n\nThank you!\n\nBest regards`
    
    const mailtoLink = `mailto:${racket.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, '_blank')
  }

  // Load real listings and favorites from Supabase on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load real user listings from Supabase
        const { data: listingsData, error: listingsError } = await supabase
          .from('listings')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (listingsError) {
          console.error('Error loading listings:', listingsError)
        } else {
          // Transform data to match expected format
          const transformedListings = listingsData.map((listing: any) => ({
            id: listing.id,
            title: listing.title,
            brand: listing.brand,
            price: listing.price,
            condition: listing.condition,
            images: listing.images || [],
            description: listing.description,
            seller: listing.seller_name || listing.seller_email.split('@')[0],
            seller_name: listing.seller_name,
            seller_email: listing.seller_email,
            email: listing.seller_email,
            rating: listing.rating || 4.8,
            location: listing.location || 'Location not specified',
            type: listing.type,
            specifications: listing.specifications || {
              weight: 'Not specified',
              headSize: 'Not specified',
              stringPattern: 'Not specified',
              balance: 'Not specified'
            },
            created_at: listing.created_at,
            is_active: listing.is_active,
            is_sold: listing.is_sold
          }))
          setRackets(transformedListings)
        }

        // Load favorites from localStorage for now (we can migrate to Supabase later)
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        const favoriteIds = storedFavorites.map((item: any) => item.id)
        setFavorites(favoriteIds)
      } catch (error) {
        console.error('Unexpected error loading data:', error)
      }
    }
    
    loadData()
    
    // Set up real-time subscription to listen for new listings
    const channel = supabase
      .channel('listings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'listings'
        },
        (payload) => {
          console.log('Listing change detected:', payload)
          // Reload data when changes occur
          loadData()
        }
      )
      .subscribe()

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const toggleFavorite = (racket: RacketListing) => {
    const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const isCurrentlyFavorited = favorites.includes(racket.id)
    
    if (isCurrentlyFavorited) {
      // Remove from favorites
      const updatedFavorites = currentFavorites.filter((item: any) => item.id !== racket.id)
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      setFavorites(prev => prev.filter(id => id !== racket.id))
    } else {
      // Add to favorites
      const updatedFavorites = [...currentFavorites, racket]
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
      setFavorites(prev => [...prev, racket.id])
    }
  }

  const handleBuyNow = (racket: RacketListing) => {
    setSelectedPurchaseRacket(racket)
    setShowBuyModal(true)
    setSelectedRacket(null) // Close detail modal
    setPaymentStep('options') // Reset to options step
    setDeliveryOption('shipping') // Reset delivery option
  }

  // Allow browsing without authentication
  // useEffect(() => {
  //   if (!loading && !user) {
  //     window.location.href = '/'
  //   }
  // }, [user, loading])

  // Reset image index when modal opens
  useEffect(() => {
    if (selectedRacket) {
      setCurrentImageIndex(0)
    }
  }, [selectedRacket])

  // Remove infinite scroll since we're using real data only

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
    const matchesType = filterType === 'all' || racket.type === filterType
    return matchesSearch && matchesCondition && matchesType
  })

  // Skip loading state for marketplace - allow immediate access
  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-black flex items-center justify-center">
  //       <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
  //     </div>
  //   )
  // }

  // Allow browsing without authentication
  // if (!user) {
  //   return null // Will redirect
  // }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Marketplace Header */}
      <MarketplaceHeader />

      {/* Main Content */}
      <div className="pt-20 sm:pt-24 lg:pt-28">
        {/* Welcome Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Welcome to CourtCycle Marketplace!
            </h2>
            <p className="text-sm sm:text-base text-gray-400">Discover premium squash rackets from trusted sellers</p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8"
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search rackets, brands, or models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Racket Type Filter */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-white/30 transition-colors"
                >
                  <option value="all">All Racket Types</option>
                  <option value="squash">Squash</option>
                  <option value="tennis">Tennis</option>
                  <option value="padel">Padel</option>
                </select>

                {/* Condition Filter */}
                <select
                  value={filterCondition}
                  onChange={(e) => setFilterCondition(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-white/30 transition-colors"
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
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-white/30 transition-colors"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Racket Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filteredRackets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 max-w-lg mx-auto">
                <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-4xl">🎾</div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">No racket listings yet</h3>
                <p className="text-gray-400 mb-6">Be the first to list a racket on the marketplace!</p>
                <motion.a
                  href="/sell"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-block"
                >
                  List Your Racket
                </motion.a>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-800 to-gray-900">
                  <img
                    src={racket.images?.[0] || '/new.png'}
                    alt={racket.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button 
                    className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${
                      favorites.includes(racket.id) 
                        ? 'bg-red-500/80 hover:bg-red-500 text-white' 
                        : 'bg-black/50 text-white/70 hover:text-red-400'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(racket)
                    }}
                  >
                    <Heart 
                      size={14} 
                      className={`sm:w-4 sm:h-4 ${
                        favorites.includes(racket.id) ? 'fill-current' : ''
                      }`} 
                    />
                  </button>
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                    {racket.condition}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white line-clamp-1 text-sm sm:text-base">{racket.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-400">{racket.brand}</p>
                    </div>
                    <div className="text-right ml-2">
                      <div className="text-lg sm:text-xl font-bold text-white">${racket.price}</div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 mb-3">{racket.description}</p>

                  {/* Specs */}
                  <div className="text-xs text-gray-400 mb-3">
                    <div>Weight: {racket.specifications.weight}</div>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {racket.email?.[0] || 'A'}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-400 truncate">{racket.email}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          )}
        </div>
      </div>

      {/* Racket Detail Modal */}
      {selectedRacket && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedRacket(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white pr-4">{selectedRacket.title}</h2>
              <button
                onClick={() => setSelectedRacket(null)}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
              {/* Image Section */}
              <div className="space-y-3 sm:space-y-4">
                <div className="relative h-64 sm:h-80 lg:h-[500px] bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl overflow-hidden">
                  <img
                    src={selectedRacket.images[currentImageIndex]}
                    alt={selectedRacket.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Condition Badge */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/70 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-white">
                    {selectedRacket.condition}
                  </div>

                  {/* Image Navigation Arrows */}
                  {selectedRacket.images.length > 1 && (
                    <>
                      {/* Previous Arrow */}
                      {currentImageIndex > 0 && (
                        <motion.button
                          onClick={prevImage}
                          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10 border border-white/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg width="20" height="20" className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" className="sm:stroke-[2.5] lg:stroke-3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.button>
                      )}

                      {/* Next Arrow */}
                      {currentImageIndex < selectedRacket.images.length - 1 && (
                        <motion.button
                          onClick={nextImage}
                          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10 border border-white/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg width="20" height="20" className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" className="sm:stroke-[2.5] lg:stroke-3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.button>
                      )}

                      {/* Image Indicators */}
                      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2">
                        {selectedRacket.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
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
              <div className="space-y-4 sm:space-y-6">
                {/* Price and Brand */}
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2">${selectedRacket.price}</div>
                  <div className="text-base sm:text-lg text-gray-400">{selectedRacket.brand}</div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-sm sm:text-base text-gray-300">{selectedRacket.description}</p>
                </div>

                {/* Condition */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Condition</h3>
                  <p className="text-sm sm:text-base text-gray-300">{selectedRacket.condition}</p>
                </div>


                {/* Seller Info */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Seller</h3>
                  <div className="flex items-center gap-3 p-3 sm:p-4 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      {selectedRacket.email?.[0] || 'A'}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm sm:text-base">{selectedRacket.email}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleContactSeller(selectedRacket)}
                    className="flex-1 bg-white text-black py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors"
                  >
                    Contact Seller
                  </button>
                  <button 
                    onClick={() => handleBuyNow(selectedRacket)}
                    className="flex-1 bg-green-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-green-700 transition-colors"
                  >
                    Buy Now
                  </button>
                  <button 
                    onClick={() => toggleFavorite(selectedRacket)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-colors ${
                      favorites.includes(selectedRacket.id) 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <Heart 
                      size={16} 
                      className={`sm:w-5 sm:h-5 ${
                        favorites.includes(selectedRacket.id) 
                          ? 'text-white fill-current' 
                          : 'text-white'
                      }`} 
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Buy Now Modal */}
      {showBuyModal && selectedPurchaseRacket && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowBuyModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              duration: 0.4, 
              ease: "easeOut",
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  {paymentStep === 'options' && 'Purchase Options'}
                  {paymentStep === 'payment' && 'Payment Instructions'}
                  {paymentStep === 'success' && 'Payment Confirmed!'}
                  {paymentStep === 'failed' && 'Payment Issue'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              {paymentStep === 'options' && (
                <>
                  {/* Purchase Options Content */}
              {/* Product Summary */}
              <div className="bg-gradient-to-br from-white/8 to-white/4 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                    {selectedPurchaseRacket.images && selectedPurchaseRacket.images.length > 0 ? (
                      <img 
                        src={selectedPurchaseRacket.images[0]} 
                        alt={selectedPurchaseRacket.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-2xl">🎾</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg mb-1">{selectedPurchaseRacket.title}</h3>
                    <p className="text-gray-400 mb-2">{selectedPurchaseRacket.brand}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold text-xl">${selectedPurchaseRacket.price}</span>
                      <span className="bg-gray-600/30 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                        {selectedPurchaseRacket.condition}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="text-white font-medium">Seller:</span> {selectedPurchaseRacket.seller}
                  </p>
                </div>
              </div>

              {/* Delivery Options */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Truck size={20} className="text-gray-400" />
                  Delivery Options
                </h3>
                <div className="space-y-4">
                  <div 
                    onClick={() => setDeliveryOption('shipping')}
                    className={`border rounded-xl p-4 hover:bg-white/5 transition-all duration-200 cursor-pointer ${
                      deliveryOption === 'shipping' 
                        ? 'bg-white/10 border-white/30' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-600/30 rounded-lg flex items-center justify-center">
                        <Truck size={18} className="text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">Standard Shipping</h4>
                        <p className="text-gray-400 text-sm">3-5 business days • $10 shipping fee</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        deliveryOption === 'shipping' 
                          ? 'border-white bg-white' 
                          : 'border-gray-400'
                      }`}>
                        {deliveryOption === 'shipping' && (
                          <div className="w-2 h-2 bg-gray-800 rounded-full m-0.5"></div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div 
                    onClick={() => setDeliveryOption('pickup')}
                    className={`border rounded-xl p-4 hover:bg-white/5 transition-all duration-200 cursor-pointer ${
                      deliveryOption === 'pickup' 
                        ? 'bg-white/10 border-white/30' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-600/30 rounded-lg flex items-center justify-center">
                        <MapPin size={18} className="text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">Local Pickup</h4>
                        <p className="text-gray-400 text-sm">Arrange pickup location • Free</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        deliveryOption === 'pickup' 
                          ? 'border-white bg-white' 
                          : 'border-gray-400'
                      }`}>
                        {deliveryOption === 'pickup' && (
                          <div className="w-2 h-2 bg-gray-800 rounded-full m-0.5"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-gray-400" />
                  Payment Method
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-600/30 rounded-lg flex items-center justify-center">
                      <CreditCard size={18} className="text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">Zelle</h4>
                      <p className="text-gray-400 text-sm">Quick and secure bank transfer</p>
                    </div>
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <DollarSign size={20} className="text-gray-400" />
                  Order Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-gray-400">Racket Price</span>
                    <span className="text-white">${selectedPurchaseRacket.price}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-gray-400">{deliveryOption === 'shipping' ? 'Shipping' : 'Pickup'}</span>
                    <span className="text-white">
                      {deliveryOption === 'shipping' ? '$10' : 'Free'}
                    </span>
                  </div>
                  <hr className="border-white/10 my-2" />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-white font-bold text-lg">
                      ${selectedPurchaseRacket.price + (deliveryOption === 'shipping' ? 10 : 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowBuyModal(false)}
                  className="flex-1 bg-white/10 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setPaymentStep('payment')}
                  className="flex-1 bg-white text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
              </>
              )}


              {paymentStep === 'payment' && (
                <>
                  {/* Product Summary */}
                  <div className="bg-gradient-to-br from-white/8 to-white/4 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                        {selectedPurchaseRacket.images && selectedPurchaseRacket.images.length > 0 ? (
                          <img 
                            src={selectedPurchaseRacket.images[0]} 
                            alt={selectedPurchaseRacket.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-white text-2xl">🎾</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-lg mb-1">{selectedPurchaseRacket.title}</h3>
                        <p className="text-gray-400 mb-2">{selectedPurchaseRacket.brand}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-white font-bold text-xl">${selectedPurchaseRacket.price + (deliveryOption === 'shipping' ? 10 : 0)}</span>
                          <span className="bg-gray-600/30 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                            {selectedPurchaseRacket.condition}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-gray-300 text-sm">
                        <span className="text-white font-medium">Seller:</span> {selectedPurchaseRacket.seller}
                      </p>
                    </div>
                  </div>

                  {/* Zelle Instructions */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gray-600/30 rounded-lg flex items-center justify-center">
                        <CreditCard size={24} className="text-gray-300" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Pay with Zelle</h3>
                        <p className="text-gray-400 text-sm">Quick and secure bank transfer</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-white font-medium mb-2">Your Email:</p>
                        <input
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full bg-black/30 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                          required
                        />
                      </div>
                      
                      <div>
                        <p className="text-white font-medium mb-2">Send payment to:</p>
                        <div className="bg-black/30 rounded-lg p-3">
                          <p className="text-white font-mono text-lg">9173062100</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-white font-medium mb-2">Contact Information:</p>
                        <div className="bg-black/30 rounded-lg p-3 space-y-2">
                          <p className="text-white font-mono text-sm">Phone: 646849987</p>
                          <p className="text-white font-mono text-sm">Email: ali.hamdard@icloud.com</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-white font-medium mb-2">Amount:</p>
                        <div className="bg-black/30 rounded-lg p-3">
                          <p className="text-white font-mono text-lg">
                            ${selectedPurchaseRacket.price + (deliveryOption === 'shipping' ? 10 : 0)}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-white font-medium mb-2">Include this note:</p>
                        <div className="bg-black/30 rounded-lg p-3">
                          <p className="text-gray-300 text-sm">
                            CourtCycle purchase - {selectedPurchaseRacket.title} - Order #{selectedPurchaseRacket.id}
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4">
                        <p className="text-yellow-300 text-sm">
                          <strong>Important:</strong> After sending payment, you'll receive confirmation and {deliveryOption === 'shipping' ? 'shipping' : 'pickup'} details within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      onClick={() => setPaymentStep('options')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-white/10 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
                    >
                      Back
                    </motion.button>
                    <motion.button 
                      onClick={handlePaymentSent}
                      disabled={!customerEmail.trim()}
                      whileHover={{ scale: customerEmail.trim() ? 1.02 : 1 }}
                      whileTap={{ scale: customerEmail.trim() ? 0.98 : 1 }}
                      className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                        customerEmail.trim() 
                          ? 'bg-white text-gray-900 hover:bg-gray-100' 
                          : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      I've Sent Payment
                    </motion.button>
                  </div>
                </>
              )}


              {paymentStep === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 10,
                      delay: 0.2 
                    }}
                    className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle size={48} className="text-white" />
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-white mb-4"
                  >
                    Thank You for Your Payment! 🎉
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-lg mb-8 max-w-lg mx-auto"
                  >
                    <strong className="text-white">Ali Hamdard</strong> will be in contact with you within 3-4 business days to arrange delivery and provide tracking information.
                  </motion.p>
                  
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-green-600/10 border border-green-600/30 rounded-xl p-6 max-w-md mx-auto mb-8"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle size={20} className="text-green-400" />
                      <span className="text-green-300 font-medium">What's Next:</span>
                    </div>
                    <ul className="text-left text-gray-300 space-y-2">
                      <li>• Ali will contact you within 3-4 business days</li>
                      <li>• You'll receive delivery arrangements</li>
                      <li>• Track your order progress</li>
                    </ul>
                  </motion.div>
                  
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={handleCloseModal}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              )}

              {paymentStep === 'failed' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 10,
                      delay: 0.2 
                    }}
                    className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <AlertCircle size={48} className="text-white" />
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-white mb-4"
                  >
                    Payment Not Received
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-400 text-lg mb-8"
                  >
                    The seller hasn't received your payment yet. This could be due to processing delays.
                  </motion.p>
                  
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-red-600/10 border border-red-600/30 rounded-xl p-6 max-w-md mx-auto mb-8"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <AlertCircle size={20} className="text-red-400" />
                      <span className="text-red-300 font-medium">What to do:</span>
                    </div>
                    <ul className="text-left text-gray-300 space-y-2">
                      <li>• Double-check your Zelle payment details</li>
                      <li>• Wait 5-10 minutes for processing</li>
                      <li>• Contact your bank if needed</li>
                      <li>• Try sending payment again</li>
                    </ul>
                  </motion.div>
                  
                  <div className="flex gap-3 justify-center">
                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      onClick={handleRetryPayment}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                    >
                      Try Again
                    </motion.button>
                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      onClick={handleCloseModal}
                      className="bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
                    >
                      Cancel Order
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 