'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, DollarSign, Info, Home, CheckCircle } from 'lucide-react'

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

export default function SellPage() {
  const { user, loading } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    price: '',
    condition: 'Like New',
    type: 'squash',
    email: '',
    description: '',
    images: [] as File[],
    imageDataUrls: [] as string[]
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Allow access without authentication for now
  // useEffect(() => {
  //   if (!loading && !user) {
  //     window.location.href = '/'
  //   }
  // }, [user, loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate minimum image requirement
    if (formData.imageDataUrls.length < 3) {
      alert('Please upload at least 3 images of your racket before listing.')
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Store the listing in localStorage for now (until we have a proper backend)
    const existingListings = JSON.parse(localStorage.getItem('userListings') || '[]')
    const newListing = {
      id: Date.now().toString(),
      title: formData.title,
      brand: formData.brand,
      price: parseInt(formData.price),
      condition: formData.condition as 'New' | 'Like New' | 'Good' | 'Fair',
      type: formData.type as 'squash' | 'tennis' | 'padel',
      email: formData.email,
      images: formData.imageDataUrls, // Use base64 data URLs for persistence
      description: formData.description,
      seller: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Anonymous',
      rating: 4.8,
      location: 'Location not specified',
      specifications: {
        weight: 'Not specified',
        headSize: 'Not specified', 
        stringPattern: 'Not specified',
        balance: 'Not specified'
      },
      dateAdded: new Date().toISOString()
    }
    existingListings.push(newListing)
    localStorage.setItem('userListings', JSON.stringify(existingListings))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleListAnother = () => {
    setIsSubmitted(false)
    setFormData({
      title: '',
      brand: '',
      price: '',
      condition: 'Like New',
      description: '',
      images: []
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      
      // Convert files to base64 data URLs
      const processFiles = async () => {
        const base64Images: string[] = []
        
        for (const file of files) {
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.readAsDataURL(file)
          })
          base64Images.push(base64)
        }
        
        setFormData({ ...formData, images: files, imageDataUrls: base64Images })
      }
      
      processFiles()
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">Sell Your Racket</h1>
            <p className="text-gray-400 text-lg sm:text-xl">List your squash racket and connect with buyers</p>
          </motion.div>

          {/* Form or Success State */}
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-4 sm:p-6 lg:p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-2">Success!</h2>
                <p className="text-gray-400 text-lg">Your racket has been listed successfully</p>
              </motion.div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <motion.button
                  onClick={handleListAnother}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-black py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  List Another Racket
                </motion.button>
                <motion.a
                  href="/marketplace"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white py-3 px-6 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300"
                >
                  View Marketplace
                </motion.a>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-4 sm:p-6 lg:p-8"
            >
            {/* Basic Information Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-white">
                <Info size={28} />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-white">Racket Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Technifibre Carboflex 125 X-Speed"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-medium text-white">Brand</label>
                  <select
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white text-lg focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
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

                <div className="space-y-2">
                  <label className="block text-lg font-medium text-white">Racket Type</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white text-lg focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                  >
                    <option value="squash">Squash</option>
                    <option value="tennis">Tennis</option>
                    <option value="padel">Padel</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-medium text-white">List Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-medium text-white">Price (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                    <input
                      type="number"
                      required
                      placeholder="150"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-medium text-white">Condition</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white text-lg focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
                  >
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              {/* Description - Full Width */}
              <div className="mt-6 space-y-2">
                <label className="block text-lg font-medium text-white">Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your racket's condition, history, and any notable features..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all resize-none"
                />
              </div>
            </div>

            {/* Photos Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-white">
                <Upload size={28} />
                Photos
              </h2>
              
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/30 transition-colors">
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-400 mb-2 text-lg">Upload photos of your racket</p>
                <p className="text-yellow-400 mb-4 text-sm font-medium">
                  ⚠️ Minimum 3 images required
                </p>
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
                  className="bg-white text-black px-8 py-3 rounded-xl font-semibold cursor-pointer hover:bg-gray-100 transition-colors inline-block text-lg"
                >
                  Choose Files
                </label>
                {formData.imageDataUrls.length > 0 && (
                  <div className="mt-3">
                    <p className={`text-sm font-medium ${
                      formData.imageDataUrls.length >= 3 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {formData.imageDataUrls.length} of 3 images uploaded
                      {formData.imageDataUrls.length >= 3 ? ' ✅' : ' ❌'}
                    </p>
                    {formData.imageDataUrls.length < 3 && (
                      <p className="text-xs text-gray-400 mt-1">
                        Please upload {3 - formData.imageDataUrls.length} more image(s)
                      </p>
                    )}
                  </div>
                )}
                
                {/* Image Preview */}
                {formData.imageDataUrls.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white mb-3">Image Preview:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {formData.imageDataUrls.map((imageUrl, index) => (
                        <div key={index} className="relative">
                          <img
                            src={imageUrl}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-white/20"
                          />
                          <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <motion.button
                type="submit"
                disabled={isSubmitting || formData.imageDataUrls.length < 3}
                whileHover={{ scale: (isSubmitting || formData.imageDataUrls.length < 3) ? 1 : 1.02 }}
                whileTap={{ scale: (isSubmitting || formData.imageDataUrls.length < 3) ? 1 : 0.98 }}
                className={`py-4 px-8 sm:px-12 rounded-xl font-bold text-lg sm:text-xl transition-colors shadow-lg min-w-[180px] sm:min-w-[200px] disabled:opacity-70 disabled:cursor-not-allowed ${
                  formData.imageDataUrls.length < 3 
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Listing...
                  </div>
                ) : formData.imageDataUrls.length < 3 ? (
                  `Upload ${3 - formData.imageDataUrls.length} More Image${3 - formData.imageDataUrls.length === 1 ? '' : 's'}`
                ) : (
                  'List My Racket'
                )}
              </motion.button>
            </div>
          </motion.form>
          )}
        </div>
      </div>
    </div>
  )
} 