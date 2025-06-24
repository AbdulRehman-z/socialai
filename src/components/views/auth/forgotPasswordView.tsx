"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { forgotPasswordSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Loader2, CheckCircle, Sparkles, Shield, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordView = () => {
  const [pending, setPending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordForm) => {
    setPending(true)
    setError(null)

    try {
      const res = await authClient.emailOtp.sendVerificationOtp({
        email: data.email,
        type: "forget-password",
      })

      if (res.error) {
        throw new Error(res.error.message)
      }

      setEmailSent(true)
      toast.success("Verification code sent!", {
        description: "Check your email for the OTP code.",
      })
    } catch (err: any) {
      setError(err.message || "Failed to send verification code. Please try again.")
      toast.error("Failed to send OTP")
    } finally {
      setPending(false)
    }
  }

  if (emailSent) {
    return (
      <div className="flex w-full min-h-screen bg-background">
        {/* Left Panel - Success State */}
        <div className="flex-1 lg:flex-2 flex flex-col justify-center px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto text-center space-y-6"
          >
            {/* Logo */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 ">
                  <Image src="/logo.svg" alt="SOCIALAI" width={32} height={21} />
                </div>
                <span className="text-xl font-bold text-foreground">SOCIALAI</span>
              </div>
            </div>

            {/* Success Icon */}
            <div className="relative mb-6">
              <div className="flex justify-center items-center w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 shadow-lg mx-auto">
                <Mail className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-foreground">Check your email</h1>
              <p className="text-muted-foreground text-lg">
                We've sent a 6-digit verification code to{" "}
                <span className="font-semibold text-foreground">{form.getValues("email")}</span>
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-card border  p-6 space-y-3 text-left">
              <h3 className="font-semibold text-foreground text-center mb-4">What's next?</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">1</span>
                  </div>
                  Check your email inbox (and spam folder)
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">2</span>
                  </div>
                  Enter the 6-digit code on the next page
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">3</span>
                  </div>
                  Create your new secure password
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button onClick={() => router.push("/reset-password")} className="w-full h-12 font-semibold">
                Continue to Verification
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setEmailSent(false)
                  form.reset()
                  setError(null)
                }}
                className="w-full h-12 font-semibold"
              >
                Use different email
              </Button>
            </div>

            {/* Back Link */}
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </motion.div>
        </div>

        {/* Right Panel - Brand */}
        <div className="hidden lg:block lg:flex-1 bg-gradient-to-br from-primary/95 via-primary to-primary/90 relative overflow-hidden">
          {/* Background Elements */}
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
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-md"
            >
              {/* Icon */}
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Mail className="w-12 h-12 text-white" />
              </div>

              {/* Content */}
              <h2 className="text-3xl font-bold mb-4">Secure Email Verification</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                We use email verification to ensure your account security and protect your personal information.
              </p>

              {/* Features */}
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90">Encrypted email delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90">Time-limited verification codes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90">Instant password reset</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full min-h-screen bg-background">
      {/* Left Panel - Form */}
      <div className="flex-1 lg:flex-2 flex flex-col justify-center px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 ">
                <Image src="/logo.svg" alt="SOCIALAI" width={32} height={21} />
              </div>
              <span className="text-xl font-bold text-foreground">SOCIALAI</span>
            </div>

            {/* Back Button */}
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8 space-y-3">
            <h1 className="text-3xl font-bold text-foreground">Forgot your password?</h1>
            <p className="text-muted-foreground text-lg">
              No worries! Enter your email address and we'll send you a verification code to reset your password.
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 group-focus-within:text-primary">
                          <Mail className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <Input
                          {...field}
                          disabled={pending}
                          type="email"
                          placeholder="Enter your email address"
                          className="pl-12 h-14 border-2  transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-destructive text-sm ml-1" />
                  </FormItem>
                )}
              />

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 "
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={pending}
                className="w-full h-14 text-base font-semibold  "
              >
                {pending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending code...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Send verification code
                  </div>
                )}
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Remember your password?{" "}
              <Link href="/sign-in" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                Sign in instead
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Brand */}
      <div className="hidden lg:block lg:flex-1 bg-gradient-to-br from-primary/95 via-primary to-primary/90 relative overflow-hidden">
        {/* Background Elements */}
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
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-md"
          >
            {/* Icon */}
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Mail className="w-12 h-12 text-white" />
            </div>

            {/* Content */}
            <h2 className="text-3xl font-bold mb-4">Secure Password Reset</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              We'll send you a secure verification code to reset your password and get you back into your account
              safely.
            </p>

            {/* Features */}
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Bank-level security</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Quick 2-minute process</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Instant account recovery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordView
