"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

const ResetPasswordContent = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)
  const [tokenError, setTokenError] = useState("")

  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenValid(false)
        setTokenError("Invalid or missing reset token")
        return
      }

      try {
        const response = await fetch("/api/auth/verify-reset-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })

        const result = await response.json()

        if (response.ok) {
          setTokenValid(true)
        } else {
          setTokenValid(false)
          setTokenError(result.error || "Invalid or expired reset token")
        }
      } catch (error) {
        setTokenValid(false)
        setTokenError("Failed to verify reset token")
      }
    }

    verifyToken()
  }, [token])

  const onSubmit = async (data: ResetPasswordForm) => {
    setPending(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        toast.success("Password reset successful!", {
          description: "You can now sign in with your new password.",
        })
      } else {
        toast.error("Error", {
          description: result.error || "Failed to reset password. Please try again.",
        })
      }
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setPending(false)
    }
  }

  // Loading state while verifying token
  if (tokenValid === null) {
    return (
      <div className="flex w-full min-h-screen">
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 bg-white">
          <div className="w-full max-w-md mx-auto text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Verifying reset token...</p>
          </div>
        </div>
      </div>
    )
  }

  // Invalid token state
  if (!tokenValid) {
    return (
      <div className="flex w-full min-h-screen">
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 bg-white">
          <div className="w-full max-w-md mx-auto text-center">
            <div className="mb-8">
              <div className="flex items-center gap-3 justify-center mb-6">
                <Image src="/logo.svg" alt="SOCIALAI" width={40} height={27} />
                <span className="text-xl font-semibold text-gray-900">SOCIALAI</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Invalid Reset Link</h1>
              <p className="text-gray-600">{tokenError}</p>
            </div>

            <div className="space-y-4">
              <Link
                href="/forgot-password"
                className=" w-full h-12 bg-blue-600  rounded-lg flex items-center justify-center transition-colors"
              >
                Request New Reset Link
              </Link>
              <Link href="/sign-in" className="block text-blue-600 hover:text-blue-500 font-medium">
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full min-h-screen">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="SOCIALAI" width={40} height={27} />
              <span className="text-xl font-semibold text-gray-900">SOCIALAI</span>
            </div>
          </div>

          {!isSubmitted ? (
            <div>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Reset your password</h1>
                <p className="text-gray-600">Enter your new password below to complete the reset process.</p>
              </div>

              {/* Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                              <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="New Password"
                              className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                              <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm New Password"
                              className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  {/* Password Requirements */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="text-sm text-gray-600 font-medium mb-2">Password requirements:</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Include at least one number</li>
                      <li>• Include at least one special character</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    disabled={pending}
                    className="w-full h-12  "
                  >
                    {pending ? "Resetting..." : "Reset Password"}
                  </Button>
                </form>
              </Form>
            </div>
          ) : (
            <div className="text-center">
              {/* Success Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>

              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Password Reset Complete</h1>
                <p className="text-gray-600">
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
              </div>

              {/* Sign In Button */}
              <Button
                onClick={() => router.push("/sign-in")}
                className="w-full h-12  "
              >
                Continue to Sign In
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Brand */}
      <div className="flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/20 blur-xl" />
          <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-white/15 blur-lg" />
          <div className="absolute bottom-32 left-16 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center text-white">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Secure & Protected</h2>
            <p className="text-blue-100 text-lg max-w-md">
              Your new password will be encrypted and stored securely. We take your account security seriously.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ResetPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex w-full min-h-screen">
          <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 bg-white">
            <div className="w-full max-w-md mx-auto text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  )
}

export default ResetPasswordPage
