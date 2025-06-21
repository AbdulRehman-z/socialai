"use client"

import { signinAction } from "@/app/actions/auth/sign-in-action";
import AuthForm from "@/components/custom/auth/authForm";
import { signinSchema } from "@/lib/validations";

const SigninView = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      defaultValues={{
        email: "",
        password: "",
      }}
      schema={signinSchema}
      onSubmit={signinAction}
    />
  )
}

export default SigninView;
