"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { authClient } from "@/lib/auth-client"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { useState } from "react"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(4, {
    message: "Your password must be at least 4 characters.",
  }),
  confirmPassword: z.string().min(4, {
    message: "Your password must be at least 4 characters.",
  }),
})

export function InputOTPForm() {
  const [isPending, setIsPending] = useState(false)
  const [success, setSuccess] = useState(false)


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      pin: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsPending(true)

    const response = await authClient.emailOtp.resetPassword({
      email: data.email,
      otp: data.pin,
      password: data.password,
    })

    if (response.error) {
      toast.error("Error", {
        description: response.error.message,
      })
    }

    if (response.data) {
      toast.success("Password reset successful", {
        description: "You can now login with your new password.",
      })
      setSuccess(true)
    }

    setIsPending(false)
  }

  return (
    <Form {...form}>
      <div className="">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reset-Password</h2>
        <InputOTPForm />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" mx-auto space-y-6 w-fit">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem >
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <div className="w-full flex  items-center">
                    <InputOTPGroup className="mx-auto">
                      <InputOTPSlot className="size-12" index={0} />
                      <InputOTPSlot className="size-12" index={1} />
                      <InputOTPSlot className="size-12" index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className="mx-auto">
                      <InputOTPSlot className="size-12" index={3} />
                      <InputOTPSlot className="size-12" index={4} />
                      <InputOTPSlot className="size-12" index={5} />
                    </InputOTPGroup>
                  </div>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 h-12 "
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="********"
                  className="h-12 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="********"
                  className="h-12 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size={"lg"} disabled={isPending} className="w-full  mx-auto" type="submit">
          {isPending ? 'Submitting...' : 'Submit'}
          {success && 'Password changed successfully'}
        </Button>
      </form>
    </Form>
  )
}
