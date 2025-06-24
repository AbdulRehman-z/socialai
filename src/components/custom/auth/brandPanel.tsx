"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Users, Zap, Shield, TrendingUp, MessageSquare } from "lucide-react"

const BrandPanel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations tailored to your needs",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Work seamlessly with your team in real-time",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Track performance with detailed insights and metrics",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [features.length])

  return (
    <div className="h-full bg-gradient-to-br from-primary/95 via-primary to-primary/90 dark:from-primary/90 dark:via-primary/95 dark:to-primary relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/10 blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-40 right-32 w-24 h-24 rounded-full bg-white/15 blur-lg"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-32 left-16 w-40 h-40 rounded-full bg-white/8 blur-2xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 lg:p-12 text-center">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Image src="/logo.svg" alt="SOCIALAI" width={32} height={21} className="brightness-0 invert" />
            </div>
            <span className="text-2xl font-bold text-white">SOCIALAI</span>
          </div>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 w-80 border border-white/20">
            {/* Browser Header */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
              <div className="flex-1 bg-white/10 rounded-full h-6 ml-4" />
            </div>

            {/* Dashboard Content */}
            <div className="space-y-4">
              {[
                { color: "from-purple-400 to-pink-400", width: "w-3/4" },
                { color: "from-blue-400 to-cyan-400", width: "w-2/3" },
                { color: "from-green-400 to-emerald-400", width: "w-4/5" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} shadow-lg`} />
                  <div className="flex-1 space-y-2">
                    <div className={`h-2 bg-white/30 rounded-full ${item.width}`} />
                    <div className="h-2 bg-white/20 rounded-full w-1/2" />
                  </div>
                  <div className="w-8 h-8 bg-white/20 rounded-lg" />
                </motion.div>
              ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[Zap, Shield, MessageSquare].map((Icon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="bg-white/10 rounded-xl p-3 text-center"
                >
                  <Icon className="w-5 h-5 text-white/80 mx-auto mb-1" />
                  <div className="h-1 bg-white/20 rounded w-full" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl shadow-lg flex items-center justify-center"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl shadow-lg flex items-center justify-center"
          >
            <TrendingUp className="w-5 h-5 text-white" />
          </motion.div>
        </motion.div>

        {/* Text Content with Feature Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white max-w-md"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">AI assistants to counsel you</h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Everything you need in an easily customizable dashboard.
          </p>

          {/* Feature Carousel */}
          <div className="relative h-24 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center text-center"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 rounded-lg">{features[currentSlide].icon}</div>
                  <h3 className="font-semibold text-lg">{features[currentSlide].title}</h3>
                </div>
                <p className="text-white/70 text-sm">{features[currentSlide].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white w-6" : "bg-white/40"
                  }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BrandPanel
