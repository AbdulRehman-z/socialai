"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const BrandPanel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/20 blur-xl" />
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-white/15 blur-lg" />
        <div className="absolute bottom-32 left-16 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center">
        {/* Floating UI Elements */}
        <div className="relative mb-12">
          {/* Main Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-80 h-64 relative"
          >
            {/* Browser Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            {/* Dashboard Content */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                <div className="flex-1 space-y-1">
                  <div className="h-2 bg-gray-200 rounded w-3/4" />
                  <div className="h-2 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
                <div className="flex-1 space-y-1">
                  <div className="h-2 bg-gray-200 rounded w-2/3" />
                  <div className="h-2 bg-gray-100 rounded w-3/4" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400" />
                <div className="flex-1 space-y-1">
                  <div className="h-2 bg-gray-200 rounded w-1/2" />
                  <div className="h-2 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating App Icons */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -left-16 top-8 space-y-4"
          >
            {/* SOCIALAI Logo */}
            <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Image src="/logo.svg" alt="SOCIALAI" width={24} height={16} />
            </div>

            {/* Slack Icon */}
            <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded" />
            </div>

            {/* Google Icon */}
            <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full" />
            </div>
          </motion.div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              d="M 60 80 Q 120 60 180 120"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.7 }}
              d="M 60 140 Q 120 120 180 160"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
          </svg>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white"
        >
          <h2 className="text-3xl font-bold mb-4">AI assistants to counsel you</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-md">
            Everything you need in an easily customizable dashboard.
          </p>

        </motion.div>
      </div>
    </div>
  )
}

export default BrandPanel
