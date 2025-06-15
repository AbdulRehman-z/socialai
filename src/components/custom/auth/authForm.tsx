"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type DefaultValues, type Path, type SubmitHandler, useForm, type UseFormReturn } from "react-hook-form"
import type { z, ZodType } from "zod"
import { AlertCircleIcon, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FIELD_NAMES, FIELD_TYPES } from "@/lib/constants"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

type AuthFormProps<T extends z.ZodType<any, any, any>> = {
  type: "SIGN_UP" | "SIGN_IN"
  schema: T
  defaultValues: z.infer<T>
  onSubmit: (formData: z.infer<T>) => Promise<{ success: boolean; error?: string }>
}

const getFieldIcon = (fieldName: string) => {
  switch (fieldName) {
    case "email":
      return <Mail className="size-4" />
    case "password":
    case "confirmPassword":
      return <Lock className="size-4" />
    case "name":
      return <User className="size-4" />
    default:
      return null
  }
}

export default function InnovativeAuthForm<T extends ZodType<any, any, any>>({
  type,
  defaultValues,
  schema,
  onSubmit,
}: AuthFormProps<T>) {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const isSignedIn = type === "SIGN_IN"

  useEffect(() => {
    setMounted(true)
  }, [])

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const submit: SubmitHandler<T> = async (data: T) => {
    setPending(true)
    setError(null)

    // Add a slight delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const result = await onSubmit(data)
    if (result.success) {
      toast("Success!", {
        description: isSignedIn
          ? "Welcome back! You've successfully signed in."
          : "Account created! Welcome to Socialai.",
      })

      if (isSignedIn) {
        router.push("/")
      } else {
        router.push("/sign-in")
      }
    } else {
      setError(result.error!)
    }

    setPending(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      {/* Glassmorphism Card */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 size-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse delay-1000" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 bg-blue-400/20 rounded-full blur-md" />
            </div>
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2">
            {isSignedIn ? "Welcome Back" : "Join Socialai"}
          </h1>

          <p className="text-white/70 text-sm">
            {isSignedIn ? "Step into the universe of collaboration" : "Create your account and start your journey"}
          </p>
        </motion.div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-7">
            <AnimatePresence>
              {Object.keys(defaultValues).map((field, index) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <FormField
                    control={form.control}
                    name={field as Path<T>}
                    render={({ field: formField }) => (
                      <FormItem className="">
                        <FormLabel className="text-white/90 text-sm font-medium">
                          {FIELD_NAMES[formField.name as keyof typeof FIELD_NAMES]}
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-blue-400 transition-colors duration-200">
                              {getFieldIcon(formField.name)}
                            </div>
                            <Input
                              {...formField}
                              type={FIELD_TYPES[formField.name as keyof typeof FIELD_TYPES]}
                              className="pl-10 h-12 bg-white/5 border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-blue-400/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 outline-none"
                              placeholder={`Enter your ${FIELD_NAMES[formField.name as keyof typeof FIELD_NAMES].toLowerCase()}`}
                            />

                            {/* Smooth focus glow effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/0 to-purple-400/0 group-focus-within:from-blue-400/10 group-focus-within:via-blue-400/5 group-focus-within:to-purple-400/10 transition-all duration-300 pointer-events-none" />
                          </div>
                        </FormControl>

                        <FormMessage className=" text-xs" />
                      </FormItem>
                    )}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Error Alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert variant="destructive" className="bg-red-500/10 border-red-500/30 backdrop-blur-sm ">
                    <AlertCircleIcon className="size-4" />
                    <AlertDescription className="text-red-200">{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                type="submit"
                disabled={pending}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
              >
                <span className="flex items-center justify-center gap-2">
                  {pending ? (
                    <>
                      <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {isSignedIn ? "Sign In" : "Create Account"}
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </motion.div>
          </form>
        </Form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-white/60 text-sm">
            {isSignedIn ? "New to Socialai? " : "Already have an account? "}
            <Link
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline-offset-4 hover:underline"
              href={isSignedIn ? "/sign-up" : "/sign-in"}
            >
              {isSignedIn ? "Create an account" : "Sign In"}
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Floating Action Indicator */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      /> my-2
    </motion.div>
  )
}
