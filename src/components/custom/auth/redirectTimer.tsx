"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface RedirectTimerProps {
  redirectUrl: string
  intervalMs: number
}

export function RedirectTimer({ redirectUrl, intervalMs }: RedirectTimerProps) {
  const [timeLeft, setTimeLeft] = useState(intervalMs / 1000)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          router.push(redirectUrl)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [redirectUrl, router])

  const progress = ((intervalMs / 1000 - timeLeft) / (intervalMs / 1000)) * 100

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-3">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Redirecting in <span className="font-semibold text-foreground">{timeLeft}</span> seconds
        </p>
      </div>
      <Progress value={progress} className="h-2" />
    </motion.div>
  )
}
