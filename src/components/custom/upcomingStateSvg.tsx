"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface UpcomingStateSvgProps {
  width?: number
  height?: number
  className?: string
}

export const UpcomingStateSvg: React.FC<UpcomingStateSvgProps> = ({
  width = 166,
  height = 135,
  className = ""
}) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        style={{ width, height }}
        className={`flex items-center justify-center ${className}`}
      >
        <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
      </div>
    )
  }

  const isDark = resolvedTheme === 'dark'

  // Theme-aware colors
  const colors = {
    bgCircle: isDark ? '#1e293b' : '#f1f5f9',
    cardBg: isDark ? '#0f172a' : '#ffffff',
    cardStroke: isDark ? '#334155' : '#e2e8f0',
    iconBg: isDark ? '#1e293b' : '#f1f5f9',
    videoIconFill: isDark ? '#9ca3af' : '#6b7280',
    primaryBar: isDark ? '#8b5cf6' : '#7c3aed',
    secondaryBar: isDark ? '#475569' : '#cbd5e1',
    tertiaryBar: isDark ? '#475569' : '#cbd5e1'
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="12 0 166 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="94.5" cy="67.5" r="59.5" fill={colors.bgCircle} />

      <g filter="url(#filter0_d_upcoming)">
        <rect x="22" y="26" width="145" height="72" rx="6" fill={colors.cardBg} />
        <rect
          x="22.25"
          y="26.25"
          width="144.5"
          height="71.5"
          rx="5.75"
          stroke={colors.cardStroke}
          strokeWidth="0.5"
          fill="none"
        />
      </g>

      <g filter="url(#filter1_dd_upcoming)">
        <rect x="12" y="37" width="166" height="50" rx="8" fill={colors.cardBg} />
        <rect
          x="12.25"
          y="37.25"
          width="165.5"
          height="49.5"
          rx="7.75"
          stroke={colors.cardStroke}
          strokeWidth="0.5"
          fill="none"
        />
      </g>

      {/* Light gray background box */}
      <rect x="20" y="45" width="34" height="34" rx="6" fill={colors.iconBg} />

      {/* Perfectly Centered Video Camera Icon */}
      <rect x="28.5" y="56" width="13" height="10" rx="2" fill={colors.videoIconFill} />
      <path d="M41.5 58L45.5 56V66L41.5 64V58Z" fill={colors.videoIconFill} />

      {/* Lines */}
      <rect x="63" y="49" width="72" height="4" rx="2" fill={colors.primaryBar} />
      <rect x="63" y="61" width="64" height="4" rx="2" fill={colors.secondaryBar} />
      <rect x="63" y="73" width="94" height="4" rx="2" fill={colors.tertiaryBar} />

      <defs>
        <filter id="filter0_d_upcoming" x="20.125" y="25.0625" width="148.75" height="75.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.1 0 0 0 0 0.15 0 0 0 0 0.14 0 0 0 0.04 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter id="filter1_dd_upcoming" x="0" y="37" width="190" height="73" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect1_dropShadow" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.1 0 0 0 0 0.15 0 0 0 0 0.14 0 0 0 0.05 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect2_dropShadow" />
          <feOffset dy="12" />
          <feGaussianBlur stdDeviation="8" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.1 0 0 0 0 0.15 0 0 0 0 0.14 0 0 0 0.07 0" />
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}
