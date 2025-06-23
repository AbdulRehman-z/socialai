"use client"
import { InputOTPForm } from "@/components/custom/auth/optForm"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, ArrowLeft, CheckCircle, Mail, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const ResetPasswordView = () => {
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Panel - Main Content */}
      <div className="flex-2 flex flex-col justify-center p-8 lg:px-16 lg:py-8">
        <div className="w-full mx-auto ">

          <AnimatePresence mode="wait">
            <motion.div
              key="otp-verification"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8"
            >

              {/* Status Indicator */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                  className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Mail className="w-10 h-10 text-blue-600" />
                </motion.div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">Verify Your Identity</h1>
                <p className="text-gray-600 text-lg">We've sent a verification code to your email</p>
              </div>

              <div className="grid grid-cols-2 ">
                {/* OTP Form Section */}
                <div className="max-w-lg">

                  {/* OTP Input */}
                  <div className="">
                    <InputOTPForm />
                  </div>

                  {/* Navigation */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                    <Link
                      href="/sign-in"
                      className="inline-flex items-center justify-center gap-2 text-blue-500 hover:text-blue-900 font-medium transition-colors"
                    >
                      <ArrowLeft className="size-4" />
                      Back to Sign In
                    </Link>

                  </div>
                </div>

                {/* Help Section */}
                <div className="flex">
                  <Alert className="border-blue-200 bg-blue-50 ">
                    <AlertCircle className="size-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Didn't receive the code?</strong> Check your spam folder, or{" "}
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => router.push("/forgot-password")}
                        className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium underline underline-offset-2"
                      >
                        request a new code
                      </Button>
                    </AlertDescription>
                  </Alert>

                  {/* Security Notice */}
                  <div className="bg-amber-50  border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-amber-900 mb-1">Security Notice</h3>
                        <p className="text-sm text-amber-800">
                          Never share your verification code with anyone. SOCIALAI will never ask for your code via phone or
                          email.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div >
      </div >

      {/* Right Panel - Brand */}
      < div className="flex-1 min-h-screen items-center flex-col justify-center bg-gradient-to-br from-primary/90 via-primary to-primary/87 relative overflow-hidden" >
        {/* Background Elements */}
        < div className="absolute inset-0 opacity-10" >
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/20 blur-xl" />
          <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-primary/15 blur-lg" />
          <div className="absolute bottom-32 left-16 w-40 h-40 rounded-full bg-primary/10 blur-2xl" />
        </div >

        {/* Content */}
        < div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center text-white" >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-md"
          >
            {/* Icon */}
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
              <Shield className="w-12 h-12 text-white" />
            </div>

            {/* Content */}
            <h2 className="text-3xl font-bold mb-4">Secure Verification</h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              We use multi-factor authentication to keep your account secure and protect your personal information.
            </p>

            {/* Features */}
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-blue-100">End-to-end encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-blue-100">Time-limited codes</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-blue-100">Secure password reset</span>
              </div>
            </div>
          </motion.div>
        </div >
      </div >
    </div >
  )
}

export default ResetPasswordView
