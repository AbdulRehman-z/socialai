"use server"

import { auth } from "@/lib/auth";
import { signupSchema } from "@/lib/validations";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { z } from "zod";


export const signupAction = async (formData: z.infer<typeof signupSchema>) => {
  const validatedData = signupSchema.safeParse(formData)

  if (!validatedData.success) {
    return {
      success: false,
      error: "Invalid data passed"
    }
  }

  const { name, email, password } = validatedData.data

  try {
    await auth.api.signUpEmail({
      body: {
        name: name,
        email: email,
        password: password,
      }
    })


    return {
      success: true,
      message: "Signed up successfully"
    }
  } catch (error) {
    if (error instanceof APIError) {
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
