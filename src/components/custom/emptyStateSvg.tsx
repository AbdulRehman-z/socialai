"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { delay } from "@/lib/utils"

interface EmptyStateSvgProps {
  width?: number
  height?: number
  className?: string
}

export const EmptyStateSvg: React.FC<EmptyStateSvgProps> = ({
  width = 166,
  height = 135,
  className = ""
}) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // delay(5000)
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
    bgCircle: isDark ? 'hsl(240.1 83.3% 57.8% / 0.1)' : 'hsl(210 40% 96%)',
    cardBg: isDark ? 'hsl(224 71% 4%)' : 'hsl(0 0% 100%)',
    cardStroke: isDark ? 'hsl(215 27.9% 16.9% / 0.8)' : 'hsl(214.3 31.8% 91.4%)',
    avatarBg: isDark ? 'hsl(215 27.9% 16.9% / 0.5)' : 'hsl(210 40% 96%)',
    primaryBar: isDark ? 'hsl(262.1 83.3% 57.8% / 0.8)' : 'hsl(262.1 83.3% 57.8% / 0.8)',
    secondaryBar: isDark ? 'hsl(215 20.2% 65.1% / 0.3)' : 'hsl(215 20.2% 65.1% / 0.3)',
    tertiaryBar: isDark ? 'hsl(215 20.2% 65.1% / 0.15)' : 'hsl(215 20.2% 65.1% / 0.15)'
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

      <g filter="url(#filter0_d)">
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

      <g filter="url(#filter1_dd)">
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

      <rect x="20" y="45" width="34" height="34" rx="6" fill={colors.avatarBg} />
      <rect x="63" y="49" width="72" height="4" rx="2" fill={colors.primaryBar} />
      <rect x="63" y="61" width="64" height="4" rx="2" fill={colors.secondaryBar} />
      <rect x="63" y="73" width="94" height="4" rx="2" fill={colors.tertiaryBar} />

      <defs>
        <filter id="filter0_d" x="20.125" y="25.0625" width="148.75" height="75.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.1 0 0 0 0 0.15 0 0 0 0 0.14 0 0 0 0.04 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter id="filter1_dd" x="0" y="37" width="190" height="73" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
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
