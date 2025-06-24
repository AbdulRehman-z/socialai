"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FIELD_NAMES, FIELD_TYPES } from "@/lib/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Mail, User, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { type DefaultValues, type Path, type SubmitHandler, useForm, type UseFormReturn } from "react-hook-form"
import { FaFacebook } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"
import type { z, ZodType } from "zod"
import { authClient } from "@/lib/auth-client"
import { motion } from "framer-motion"

type AuthFormProps<T extends z.ZodType<any, any, any>> = {
  type: "SIGN_UP" | "SIGN_IN"
  schema: T
  defaultValues: z.infer<T>
  onSubmit: (formData: z.infer<T>) => Promise<{ success: boolean; error?: string }>
}

const getFieldIcon = (fieldName: string) => {
  switch (fieldName) {
    case "email":
      return <Mail className="w-5 h-5 text-muted-foreground" />
    case "password":
    case "confirmPassword":
      return <Lock className="w-5 h-5 text-muted-foreground" />
    case "name":
      return <User className="w-5 h-5 text-muted-foreground" />
    default:
      return null
  }
}

export default function SplitScreenAuthForm<T extends ZodType<any, any, any>>({
  type,
  defaultValues,
  schema,
  onSubmit,
}: AuthFormProps<T>) {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [socialPending, setSocialPending] = useState("")
  // const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const isSignedIn = type === "SIGN_IN"

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const socialSubmit = (provider: "google" | "facebook") => {
    setPending(true)
    setError(null)
    setSocialPending(provider)

    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",

      },
      {
        onSuccess: () => {
          setPending(false)
          setSocialPending("")
        },
        onError: ({ error }) => {
          setError(error.message)
          setPending(false)
          setSocialPending("")
        },
      },
    )
  }

  const submit: SubmitHandler<T> = async (data: T) => {
    setPending(true)
    setError(null)

    const result = await onSubmit(data)
    if (result.success) {
      toast.success("Success!", {
        description: isSignedIn
          ? "Welcome back! You've successfully signed in"
          : "We have send you a verification email at your email address. Verify your account first. ",
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

  return (
    <div className="flex w-full min-h-screen bg-background">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Image src="/logo.svg" alt="SOCIALAI" width={32} height={21} />
              </div>
              <span className="text-xl font-bold text-foreground">SOCIALAI</span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3 text-foreground">
              {isSignedIn ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {isSignedIn ? "Sign in to access your dashboard" : "Join thousands of users already using SOCIALAI"}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-8">
            <Button
              disabled={pending}
              onClick={() => socialSubmit("google")}
              type="button"
              variant="outline"
              className="w-full h-12 border-2 hover:bg-accent/50 transition-all duration-200 flex items-center justify-center gap-3 font-medium"
            >
              {socialPending === "google" ? <Loader2 className="w-5 h-5 animate-spin" /> : <FcGoogle className="w-5 h-5" />}
              Continue with Google
            </Button>

            <Button
              disabled={pending || socialPending}
              onClick={() => socialSubmit("facebook")}
              type="button"
              variant="outline"
              className="w-full h-12 border-2 hover:bg-accent/50 transition-all duration-200 flex items-center justify-center gap-3 font-medium"
            >
              {socialPending === "facebook" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <FaFacebook className="w-5 h-5 text-blue-600" />
              )}
              Continue with Facebook
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground font-medium">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
              {Object.keys(defaultValues).map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as Path<T>}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative group">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 group-focus-within:text-primary">
                            {getFieldIcon(formField.name)}
                          </div>
                          <Input
                            {...formField}
                            disabled={pending}
                            type={
                              FIELD_TYPES[formField.name as keyof typeof FIELD_TYPES]
                            }
                            placeholder={FIELD_NAMES[formField.name as keyof typeof FIELD_NAMES]}
                            className="pl-12 pr-12 h-14 border-2  transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-destructive text-sm ml-1" />
                    </FormItem>
                  )}
                />
              ))}

              {/* Remember Me & Forgot Password */}
              {isSignedIn && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox className="border-2" />
                    <label htmlFor="remember" className="text-sm font-medium text-muted-foreground cursor-pointer">
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-xl"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={pending}
                className="w-full h-14 text-base font-semibold"
              >
                {pending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isSignedIn ? "Signing in..." : "Creating account..."}
                  </div>
                ) : isSignedIn ? (
                  "Sign in"
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              {isSignedIn ? "Don't have an account? " : "Already have an account? "}
              <Link
                className="font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                href={isSignedIn ? "/sign-up" : "/sign-in"}
              >
                {isSignedIn ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
