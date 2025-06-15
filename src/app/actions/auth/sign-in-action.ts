"use server"

import { auth } from "@/lib/auth";
import { signinSchema } from "@/lib/validations";
import { BetterAuthError } from "better-auth";
import { APIError } from "better-auth/api";
import { z } from "zod";


export const signinAction = async (formData: z.infer<typeof signinSchema>) => {
  const validatedData = signinSchema.safeParse(formData)

  if (!validatedData.success) {
    return {
      success: false,
      error: "Invalid data passed"
    }
  }

  const { email, password } = validatedData.data

  try {
    await auth.api.signInEmail({
      body: {
        email: email,
        password: password
      }
    })

    return {
      success: true,
      message: "Signed in successfully"
    }
  } catch (error) {
    if (error instanceof APIError || error instanceof BetterAuthError) {
      console.error(error)
      return {
        success: false,
        error: error.message
      }
    }
    return {
      success: false,
      error: "An unexpected error occurred"
    }
  }
};
