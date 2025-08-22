"use client";

import { Scene } from "@/components/ui/rubik-s-cube";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import React from 'react';
import ProfileCard from '@/components/ProfileCard';
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/Auth/AuthModal";
import { User, LogOut } from "lucide-react";

// Squash Racket Card Component
const Card = () => {
  return (
    <div className="racket-card-wrapper">
      <div className="racket-card">
        {/* Squash Racket Image */}
        <img 
          className="racket-img" 
          src="/Untitled design (2).png" 
          alt="Carboflex Pro Squash Racket"
        />
        
        <div className="racket-textBox">
          <p className="racket-text racket-head">Carboflex Pro</p>
          <span className="racket-span">Premium Squash Racket</span>
          <p className="racket-text racket-price">€299.99</p>
        </div>
      </div>

      <style jsx>{`
        .racket-card {
          width: 195px;
          height: 285px;
          background: #313131;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          transition: 0.2s ease-in-out;
          position: relative;
          overflow: hidden;
        }

        .racket-img {
          height: 80%;
          width: 90%;
          object-fit: cover;
          border-radius: 10px;
          position: absolute;
          transition: 0.2s ease-in-out;
          z-index: 1;
        }

        .racket-textBox {
          opacity: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          transition: 0.2s ease-in-out;
          z-index: 2;
          background: rgba(0, 0, 0, 0.8);
          padding: 20px;
          border-radius: 10px;
        }

        .racket-text {
          font-weight: bold;
          margin: 0;
        }

        .racket-head {
          font-size: 20px;
        }

        .racket-price {
          font-size: 17px;
          color: #4ade80;
        }

        .racket-span {
          font-size: 12px;
          color: lightgrey;
        }

        .racket-card:hover .racket-textBox {
          opacity: 1;
        }

        .racket-card:hover .racket-img {
          height: 100%;
          width: 100%;
          filter: blur(3px);
          animation: racketAnim 3s infinite;
        }

        @keyframes racketAnim {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        .racket-card:hover {
          transform: scale(1.04) rotate(-1deg);
        }
      `}</style>
    </div>
  );
}

// Authentication Buttons Component
const AuthButtons = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, signOut, loading } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  // Automatically redirect to marketplace when user logs in
  useEffect(() => {
    if (user) {
      window.location.href = '/marketplace'
    }
  }, [user])

  return (
    <>
      <div className="z-10 relative flex items-center justify-center gap-4">
        {loading ? (
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        ) : user ? (
          // This will never show because user gets redirected immediately
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  )
}

const DemoOne = () => {
  const whatWeDoRef = useRef(null);
  const aboutUsRef = useRef(null);
  const missionRef = useRef(null);
  const isWhatWeDoInView = useInView(whatWeDoRef, { once: true, amount: 0.3 });
  const isAboutUsInView = useInView(aboutUsRef, { once: true, amount: 0.3 });
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const boxVariants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const spotlightVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5
    },
    visible: {
      opacity: [0, 0.3, 0.1],
      scale: [0.5, 1.2, 1],
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-screen relative">
      {/* First Section - 3D Scene */}
    <div className="h-screen w-screen relative flex flex-col justify-center items-center">
      <div className="absolute inset-0">
        <Scene />
      </div>
      
      {/* Gooey Text Effect */}
      <div className="z-10 relative mb-16">
        <GooeyText
          texts={["Buy.", "Sell.", "Play."]}
          morphTime={1.2}
          cooldownTime={0.3}
          className="font-bold"
          textClassName="text-white mix-blend-difference"
        />
      </div>
      
      {/* Subtitle */}
        <p className="text-lg md:text-xl text-white mix-blend-exclusion max-w-2xl px-6 leading-relaxed text-center z-10 relative mb-8">
        The ultimate marketplace for buying, selling, and trading premium squash rackets.
      </p>

        {/* Authentication Buttons */}
        <AuthButtons />
      </div>

      {/* What We Do Section */}
      <section ref={whatWeDoRef} id="what-we-do" className="h-screen w-screen relative bg-black flex flex-col justify-center items-center">
        {/* Animated Dramatic Spotlight Effect */}
        <div className="absolute inset-0 bg-black">
          {/* Upper left transitional spotlight - extended to cover whole section */}
          <motion.div 
            className="absolute top-0 left-0 w-[1800px] h-[1400px] bg-white opacity-20 rounded-full blur-3xl transform -translate-x-1/3 -translate-y-1/3"
            initial={{ opacity: 0, scale: 0.3, x: -300, y: -300 }}
            animate={isWhatWeDoInView ? { opacity: 0.2, scale: 1, x: -200, y: -200 } : { opacity: 0, scale: 0.3, x: -300, y: -300 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute top-10 left-10 w-[1400px] h-[1100px] bg-white opacity-25 rounded-full blur-2xl transform -translate-x-1/4 -translate-y-1/4"
            initial={{ opacity: 0, scale: 0.4, x: -250, y: -250 }}
            animate={isWhatWeDoInView ? { opacity: 0.25, scale: 1, x: -150, y: -150 } : { opacity: 0, scale: 0.4, x: -250, y: -250 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute top-20 left-20 w-[1000px] h-[800px] bg-white opacity-30 rounded-full blur-xl transform -translate-x-1/5 -translate-y-1/5"
            initial={{ opacity: 0, scale: 0.5, x: -200, y: -200 }}
            animate={isWhatWeDoInView ? { opacity: 0.3, scale: 1, x: -100, y: -100 } : { opacity: 0, scale: 0.5, x: -200, y: -200 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Animated Content */}
        <motion.div 
          className="z-10 relative max-w-6xl mx-auto px-6 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isWhatWeDoInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-6xl md:text-8xl font-bold text-white mb-12 tracking-wider"
            variants={titleVariants}
          >
            WHAT WE DO
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-12 mt-16"
            variants={containerVariants}
          >
            {/* Buy */}
            <motion.div 
              className="text-center"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ 
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
              >
                <span className="text-black font-bold text-2xl">B</span>
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">BUY</h3>
              <p className="text-gray-300 leading-relaxed">
                Discover premium squash rackets from top brands and trusted sellers. Find your perfect match with our curated marketplace.
              </p>
            </motion.div>

            {/* Sell */}
            <motion.div 
              className="text-center"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ 
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
              >
                <span className="text-black font-bold text-2xl">S</span>
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">SELL</h3>
              <p className="text-gray-300 leading-relaxed">
                Turn your unused equipment into cash. List your rackets and reach serious players looking for quality gear.
              </p>
            </motion.div>

            {/* Play */}
            <motion.div 
              className="text-center"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ 
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
              >
                <span className="text-black font-bold text-2xl">P</span>
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">PLAY</h3>
              <p className="text-gray-300 leading-relaxed">
                Connect with the squash community. Find playing partners, join tournaments, and elevate your game.
              </p>
            </motion.div>
          </motion.div>

          {/* Squash Racket Card Section */}
          <motion.div 
            className="flex justify-center mt-16"
            variants={cardVariants}
          >
            <Card />
          </motion.div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section ref={aboutUsRef} id="about" className="h-screen w-screen relative bg-black flex items-center">
        {/* Dramatic Spotlight Effect - matched to What We Do section */}
        <div className="absolute inset-0 bg-black">
          <motion.div 
            className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[900px] bg-white opacity-8 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isAboutUsInView ? { opacity: 0.08, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white opacity-12 rounded-full blur-2xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isAboutUsInView ? { opacity: 0.12, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          />
        </div>

        {/* Content */}
        <div className="z-10 relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text */}
          <motion.div 
            className="text-left"
            variants={textVariants}
            initial="hidden"
            animate={isAboutUsInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-wider"
              variants={titleVariants}
            >
              ABOUT COURTCYCLE
            </motion.h2>
            
            <motion.p 
              className="text-2xl text-gray-300 leading-relaxed mb-8"
              variants={textVariants}
              transition={{ delay: 0.2 }}
            >
              I'm Ali, a lifelong squash player who's seen firsthand how expensive this sport can be. I created CourtCycle because I wanted to give players a reason to keep playing by making gear more affordable.
            </motion.p>
            
            <motion.p 
              className="text-xl text-gray-400 leading-relaxed mb-8"
              variants={textVariants}
              transition={{ delay: 0.4 }}
            >
              What started with a few friends and a couple extra rackets has grown into a larger mission: reduce waste, support youth programs, and help players across the world find what they need to compete.
            </motion.p>

            <motion.p 
              className="text-xl text-gray-400 leading-relaxed mb-8"
              variants={textVariants}
              transition={{ delay: 0.6 }}
            >
              This is not just a marketplace. It&apos;s a community built for the game, built to empower the next generation.
            </motion.p>
          </motion.div>

          {/* Right Side - ProfileCard */}
          <motion.div 
            className="flex justify-center"
            variants={boxVariants}
            initial="hidden"
            animate={isAboutUsInView ? "visible" : "hidden"}
          >
            <ProfileCard
              name="Ali Hamdard"
              title="Founder"
              handle="alihamdard"
              status="Founder & CEO"
              contactText="Contact Ali"
              avatarUrl="/Untitled design (3).png"
              miniAvatarUrl="/Untitled design (3).png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log('Contact clicked')}
            />
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section ref={missionRef} id="mission" className="h-screen w-screen relative bg-black flex items-center">
        {/* Dramatic Spotlight Effect - unique to Mission section */}
        <div className="absolute inset-0 bg-black">
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1000px] bg-white opacity-10 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isMissionInView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-white opacity-15 rounded-full blur-2xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isMissionInView ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          />
        </div>

        {/* Content */}
        <div className="z-10 relative max-w-6xl mx-auto px-6 text-center">
          <motion.div 
            className="max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isMissionInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-6xl md:text-8xl font-bold text-white mb-12 tracking-wider"
              variants={titleVariants}
            >
              OUR MISSION
            </motion.h2>
            
            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 mb-12"
              variants={textVariants}
              transition={{ delay: 0.2 }}
            >
              <motion.p 
                className="text-2xl text-gray-300 leading-relaxed mb-8"
                variants={textVariants}
                transition={{ delay: 0.4 }}
              >
                CourtCycle was built to break down barriers in racket sports. No player should be priced out of the game. By making it easy to buy and sell used gear, we are keeping equipment in play, not in closets.
              </motion.p>

              <motion.h3 
                className="text-3xl text-white font-bold mb-6"
                variants={textVariants}
                transition={{ delay: 0.6 }}
              >
                Our mission is simple:
              </motion.h3>

              <motion.div 
                className="grid md:grid-cols-3 gap-8 mb-8"
                variants={containerVariants}
                transition={{ delay: 0.8 }}
              >
                <motion.div 
                  className="text-center p-6 bg-white/5 rounded-2xl border border-white/10"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold text-2xl">💰</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Affordable</h4>
                  <p className="text-gray-400">Make racket sports more affordable for everyone</p>
                </motion.div>

                <motion.div 
                  className="text-center p-6 bg-white/5 rounded-2xl border border-white/10"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold text-2xl">🌱</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Sustainable</h4>
                  <p className="text-gray-400">Make gear more sustainable through reuse</p>
                </motion.div>

                <motion.div 
                  className="text-center p-6 bg-white/5 rounded-2xl border border-white/10"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold text-2xl">🤝</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Inclusive</h4>
                  <p className="text-gray-400">Make the game more inclusive for all players</p>
                </motion.div>
              </motion.div>

              <motion.p 
                className="text-xl text-gray-400 leading-relaxed mb-8"
                variants={textVariants}
                transition={{ delay: 1.0 }}
              >
                And we are giving back while we do it. A portion of every sale helps fund programs like StreetSquash, supporting youth players who deserve the same opportunities we have had.
              </motion.p>

              <motion.div 
                className="text-center"
                variants={textVariants}
                transition={{ delay: 1.2 }}
              >
                <motion.p 
                  className="text-4xl text-white font-bold leading-relaxed"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  Buy. Sell. Play. Give back. That&apos;s the cycle.
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export { DemoOne };
