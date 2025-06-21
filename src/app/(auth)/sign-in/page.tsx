
import { signinAction } from "@/app/actions/auth/sign-in-action";
import AuthForm from "@/components/custom/auth/authForm";
import SigninView from "@/components/views/auth/signinView";
import { auth } from "@/lib/auth";
import { signinSchema } from "@/lib/validations";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SigninPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!!session) {
    redirect("/")
  }

  return (
    <SigninView />
  )
}

export default SigninPage;
