"use client"

import { signupAction } from "@/app/actions/auth/sign-up-action";
import AuthForm from "@/components/custom/auth/authForm";
import { signupSchema } from "@/lib/validations";

const SignupView = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      defaultValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      }}
      schema={signupSchema}
      onSubmit={signupAction}
    />
  )
}

export default SignupView;
