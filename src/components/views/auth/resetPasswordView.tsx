"use client"

import { InputOTPForm } from "@/components/custom/auth/optForm"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft, CheckCircle, Clock, Mail, RefreshCw, Shield, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const ResetPasswordView = () => {
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Panel - Main Content */}
      <div className="flex-1 lg:flex-2 flex flex-col justify-center p-6 lg:px-16 lg:py-8">
        {/* <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg mx-auto"
        > */}
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Image src="/logo.svg" alt="SOCIALAI" width={32} height={21} />
            </div>
            <span className="text-xl font-bold text-foreground">SOCIALAI</span>
          </div>

          {/* Back Button */}
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>

        {/* <AnimatePresence mode="wait">
            <motion.div
              key="otp-verification"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8"
            > */}
        {/* Status Indicator */}
        <div className="text-center mb-10">
          {/* <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                  className="relative mb-6"
                > */}
          <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Mail className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          {/* </motion.div> */}

          <h1 className="text-3xl font-bold text-foreground mb-3">Verify Your Identity</h1>
          <p className="text-muted-foreground text-lg">
            We've sent a 6-digit verification code to your email address
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* OTP Form Section */}
          <div className="space-y-6">
            <div className="bg-card border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4 text-center">Enter Verification Code</h3>
              <InputOTPForm />
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/forgot-password"
                className="inline-flex items-center justify-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Request new code
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="space-y-6">
            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                <strong>Didn't receive the code?</strong> Check your spam folder, or{" "}
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => router.push("/forgot-password")}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0 h-auto font-medium underline underline-offset-2"
                >
                  request a new code
                </Button>
              </AlertDescription>
            </Alert>

            {/* Security Notice */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Security Notice</h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                    Never share your verification code with anyone. SOCIALAI will never ask for your code via
                    phone or email.
                  </p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-muted/50 rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-3">Verification Tips</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Code expires in 10 minutes
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Check your spam/junk folder
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Make sure to enter all 6 digits
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* </motion.div> */}
        {/* </AnimatePresence> */}
        {/* </motion.div> */}
      </div>

      {/* Right Panel - Brand */}
      <div className="hidden lg:flex lg:flex-1 min-h-screen items-center flex-col justify-center bg-gradient-to-br from-primary/95 via-primary to-primary/90 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* <motion.div
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
        </div> */}

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center text-white">
            {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-md"
          > */}
            {/* Icon */}
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
              <Shield className="w-12 h-12 text-white" />
            </div>

            {/* Content */}
            <h2 className="text-3xl font-bold mb-4">Secure Verification</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              We use multi-factor authentication to keep your account secure and protect your personal information.
            </p>

            {/* Features */}
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">End-to-end encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Time-limited codes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Secure password reset</span>
              </div>
            </div>
            {/* </motion.div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordView
