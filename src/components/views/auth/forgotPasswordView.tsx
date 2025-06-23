"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { forgotPasswordSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordView = () => {
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordForm) => {
    setPending(true)

    const res = await authClient.emailOtp.sendVerificationOtp({
      email: data.email,
      type: "forget-password"
    })

    if (res.error) {
      toast.error("Failed to send OPT", { description: "An unexpected error occured" })
    }

    router.push("/reset-password")

    setPending(false)
  }


  return (
    <div className="flex w-full min-h-screen">
      {/* Left Panel - Form */}
      <div className="flex-2 flex px-6 flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          < div className="mb-8">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="SOCIALAI" width={40} height={27} />
              <span className="text-xl font-semibold text-gray-900">SOCIALAI</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back Button */}
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>

              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Forgot your password?</h1>
                <p className="text-gray-600">
                  No worries! Enter your email address and we'll send you an OTP to reset your password.
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
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                              <Mail className="w-5 h-5 text-gray-400" />
                            </div>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter your email address"
                              className="pl-10 h-12 border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={pending}
                    className="w-full h-12  "
                  >
                    {pending ? "Sending..." : "Send Reset OTP"}
                  </Button>
                </form>
              </Form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Remember your password?{" "}
                  <Link href="/sign-in" className="text-primary hover:text-primary/80 font-medium ease-linear">
                    Sign In
                  </Link>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Panel - Brand */}
      <div className="flex-1 bg-gradient-to-br from-primary/90 via-primary to-primary/87 relative overflow-hidden max-md:hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/20 blur-xl" />
          <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-primary/15 blur-lg" />
          <div className="absolute bottom-32 left-16 w-40 h-40 rounded-full bg-primary/10 blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center text-white">
          <div className="mb-8">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Secure Password Reset</h2>
            <p className="text-primary-100 text-lg max-w-md">
              We'll send you a secure link to reset your password and get you back into your account safely.
            </p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ForgotPasswordView
