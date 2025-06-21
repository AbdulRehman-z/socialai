
import { signupAction } from "@/app/actions/auth/sign-up-action";
import AuthForm from "@/components/custom/auth/authForm";
import SignupView from "@/components/custom/views/auth/signupView";
import { auth } from "@/lib/auth";
import { signupSchema } from "@/lib/validations";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignupPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!!session) {
    redirect("/")
  }

  return (
    <SignupView />
  )
}

export default SignupPage;
