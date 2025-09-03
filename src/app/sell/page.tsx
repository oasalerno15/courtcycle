'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, DollarSign, Info, User, LogOut, Home, Bell, MessageCircle } from 'lucide-react'

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
              { name: 'Sell', href: '/sell', active: true },
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
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest'}
                </span>
              </motion.div>
              
              {/* Sign Out / Sign In */}
              <motion.button
                onClick={user ? handleSignOut : () => window.location.href = '/'}
                className="flex items-center justify-center w-9 h-9 bg-white/10 hover:bg-red-500/20 backdrop-blur-sm border border-white/20 hover:border-red-500/40 rounded-full text-white transition-all duration-200"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                title={user ? 'Sign Out' : 'Sign In'}
              >
                {user ? <LogOut size={16} /> : <User size={16} />}
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

export default function SellPage() {
  const { user, loading } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    price: '',
    condition: 'Like New',
    description: '',
    weight: '',
    headSize: '',
    stringPattern: '',
    balance: '',
    images: [] as File[]
  })

  // Allow access without authentication for now
  // useEffect(() => {
  //   if (!loading && !user) {
  //     window.location.href = '/'
  //   }
  // }, [user, loading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit to Supabase
    console.log('Listing submitted:', formData)
    alert('Racket listed successfully! (Demo)')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: Array.from(e.target.files) })
    }
  }

  // Skip loading and authentication checks for now
  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-black flex items-center justify-center">
  //       <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
  //     </div>
  //   )
  // }

  // if (!user) {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Marketplace Header */}
      <MarketplaceHeader />

      {/* Main Content */}
      <div className="pt-28">
        <div className="max-w-[1400px] mx-auto px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 mt-6"
          >
            <a 
              href="/marketplace"
              className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors mb-4 text-lg"
            >
              <ArrowLeft size={24} />
              Back to Marketplace
            </a>
            <h1 className="text-5xl font-bold mb-2">Sell Your Racket</h1>
            <p className="text-gray-400 text-xl">List your squash racket and connect with buyers</p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Basic Info */}
              <div className="md:col-span-4">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                  <Info size={28} />
                  Basic Information
                </h2>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2 text-white">Racket Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Technifibre Carboflex 125 X-Speed"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2 text-white">Brand</label>
                <select
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-lg focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                >
                  <option value="">Select Brand</option>
                  <option value="Technifibre">Technifibre</option>
                  <option value="Prince">Prince</option>
                  <option value="Dunlop">Dunlop</option>
                  <option value="Head">Head</option>
                  <option value="Wilson">Wilson</option>
                  <option value="Babolat">Babolat</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2 text-white">Price (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                  <input
                    type="number"
                    required
                    placeholder="150"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2 text-white">Condition</label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-lg focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-4">
                <label className="block text-lg font-medium mb-2 text-white">Description</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Describe your racket's condition, history, and any notable features..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all resize-none"
                />
              </div>

              {/* Specifications */}
              <div className="md:col-span-4 mt-4">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Specifications
                </h2>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2 text-white">Weight</label>
                <input
                  type="text"
                  placeholder="e.g., 125g"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2 text-white">Head Size</label>
                <input
                  type="text"
                  placeholder="e.g., 500cm²"
                  value={formData.headSize}
                  onChange={(e) => setFormData({ ...formData, headSize: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2 text-white">String Pattern</label>
                <input
                  type="text"
                  placeholder="e.g., 14x18"
                  value={formData.stringPattern}
                  onChange={(e) => setFormData({ ...formData, stringPattern: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2 text-white">Balance</label>
                <select
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-lg focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                >
                  <option value="">Select Balance</option>
                  <option value="Head Heavy">Head Heavy</option>
                  <option value="Even">Even</option>
                  <option value="Head Light">Head Light</option>
                </select>
              </div>

              {/* Images and Submit on same row */}
              <div className="md:col-span-3 mt-4">
                <label className="block text-lg font-medium mb-3 text-white">Photos</label>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-white/30 transition-colors">
                  <Upload className="mx-auto mb-3 text-gray-400" size={40} />
                  <p className="text-gray-400 mb-3 text-base">Upload photos of your racket</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="bg-white text-black px-6 py-3 rounded-xl font-semibold cursor-pointer hover:bg-gray-100 transition-colors inline-block text-base"
                  >
                    Choose Files
                  </label>
                  {formData.images.length > 0 && (
                    <p className="text-sm text-gray-400 mt-2">
                      {formData.images.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-1 mt-4 flex items-end">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-black py-20 rounded-xl font-bold text-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  List My Racket
                </motion.button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  )
} 