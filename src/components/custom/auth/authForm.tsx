"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FIELD_NAMES, FIELD_TYPES } from "@/lib/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { type DefaultValues, type Path, type SubmitHandler, useForm, type UseFormReturn } from "react-hook-form"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"
import type { z, ZodType } from "zod"
import BrandPanel from "./brandPanel"

type AuthFormProps<T extends z.ZodType<any, any, any>> = {
  type: "SIGN_UP" | "SIGN_IN"
  schema: T
  defaultValues: z.infer<T>
  onSubmit: (formData: z.infer<T>) => Promise<{ success: boolean; error?: string }>
}

const getFieldIcon = (fieldName: string) => {
  switch (fieldName) {
    case "email":
      return <Mail className="w-5 h-5 text-gray-400" />
    case "password":
    case "confirmPassword":
      return <Lock className="w-5 h-5 text-gray-400" />
    case "name":
      return <User className="w-5 h-5 text-gray-400" />
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
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const isSignedIn = type === "SIGN_IN"

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const submit: SubmitHandler<T> = async (data: T) => {
    setPending(true)
    setError(null)

    const result = await onSubmit(data)
    if (result.success) {
      toast("Success!", {
        description: isSignedIn
          ? "Welcome back! You've successfully signed in."
          : "Account created! Welcome to SOCIALAI.",
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

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }))
  }

  return (
    <div className="flex w-full min-h-screen">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 ">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="SOCIALAI" width={40} height={27} />
              <span className="text-xl font-semibold text-gray-900">SOCIALAI</span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {isSignedIn ? "Log in to your Account" : "Create your Account"}
            </h1>
            <p className="text-gray-600">
              {isSignedIn
                ? "Welcome back! Select method to log in:"
                : "Welcome! Please fill in the details to get started."}
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-gray-300 flex items-center justify-center gap-3"
            >
              <FcGoogle className="size-5" />
              Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-gray-300 flex items-center justify-center gap-3"
            >
              <FaGithub className="size-5" />
              Github
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
              {Object.keys(defaultValues).map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as Path<T>}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2">{getFieldIcon(formField.name)}</div>
                          <Input
                            {...formField}
                            type={
                              (formField.name === "password" || formField.name === "confirmPassword") &&
                                !showPassword[formField.name]
                                ? "password"
                                : FIELD_TYPES[formField.name as keyof typeof FIELD_TYPES]
                            }
                            placeholder={FIELD_NAMES[formField.name as keyof typeof FIELD_NAMES]}
                            className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                          {(formField.name === "password" || formField.name === "confirmPassword") && (
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(formField.name)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword[formField.name] ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              ))}

              {/* Remember Me & Forgot Password */}
              {isSignedIn && (
                <div className="flex items-center justify-end">
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                    Forgot Password?
                  </Link>
                </div>
              )}

              {/* Error Message */}
              {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">{error}</div>}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={pending}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                {pending ? "Processing..." : isSignedIn ? "Log In" : "Create Account"}
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignedIn ? "Don't have an account? " : "Already have an account? "}
              <Link
                className="text-blue-600 hover:text-blue-500 font-medium"
                href={isSignedIn ? "/sign-up" : "/sign-in"}
              >
                {isSignedIn ? "Create an account" : "Sign In"}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Brand */}
      {/* <BrandPanel /> */}
    </div>
  )
}
