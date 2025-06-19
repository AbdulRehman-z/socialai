import { z } from "zod"
export const signupSchema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 characters" }).max(100, { message: "Name must be at most 100 characters" }),
  email: z.string().email({ message: "Provide valid email address" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters" }).max(100, { message: "Password must be at most 100 characters" }),
  confirmPassword: z.string().min(4, { message: "Confirm password must be at least 4 characters" }).max(100, { message: "Confirm password must be at most 100 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const signinSchema = z.object({
  email: z.string().email({ message: "Provide valid email address" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters" }).max(100, { message: "Password must be at most 100 characters" }),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})
