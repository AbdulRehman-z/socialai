"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface RedirectTimerProps {
  redirectUrl: string
  intervalMs: number
}

export const RedirectTimer = ({ redirectUrl, intervalMs }: RedirectTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(Math.floor(intervalMs / 1000))
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
  }, [router, redirectUrl])

  const handleRedirectNow = () => {
    router.push(redirectUrl)
  }

  return (
    <div className="flex flex-col items-center space-y-3">
      <p className="text-sm text-gray-600 text-center">
        Redirecting to sign-in in: <span className="font-semibold">{timeLeft}</span> seconds
      </p>

      <Button
        onClick={handleRedirectNow}
        size="sm"
      >
        Go to Sign-in Now
      </Button>
    </div>
  )
}
