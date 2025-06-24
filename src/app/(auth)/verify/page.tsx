import { RedirectTimer } from "@/components/custom/auth/redirectTimer"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { AlertCircle, CheckCircle, ArrowLeft, Mail } from "lucide-react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"

type PageProps = {
  searchParams: Promise<{ error?: string }>
}

const REDIRECT_INTERVAL = 5000

const getErrorMessage = (error: string): string => {
  switch (error) {
    case "invalid_token":
      return "Invalid token! The verification link has been tampered with."
    case "expired_token":
      return "Token expired! Please try signing in again to receive a new verification email."
    default:
      return "An unknown error occurred during verification."
  }
}

const VerifyPage = async ({ searchParams }: PageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!!session) {
    redirect("/")
  }

  const { error } = await searchParams

  // Success state
  if (!error) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <div className="flex flex-col justify-center items-center space-y-6 max-w-md w-full">
          {/* Success Icon */}
          <div className="relative">
            <div className="flex justify-center items-center w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 shadow-lg">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Email Verified!</h1>
            <p className="text-muted-foreground text-lg">Your account has been successfully verified</p>
          </div>

          {/* Success Alert */}
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Great! You can now access all features of your account. You'll be redirected to the sign-in page shortly.
            </AlertDescription>
          </Alert>

          {/* Redirect Timer */}
          <RedirectTimer redirectUrl="/sign-in" intervalMs={REDIRECT_INTERVAL} />

          {/* Action Button */}
          <Button asChild className="w-full h-12 font-semibold">
            <Link href="/sign-in">Continue to Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Error state
  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20">
      <div className="flex flex-col justify-center items-center space-y-6 max-w-md w-full">
        {/* Error Icon */}
        <div className="flex justify-center items-center w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 shadow-lg">
          <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Verification Failed</h1>
          <p className="text-muted-foreground text-lg">We couldn't verify your email address</p>
        </div>

        {/* Error Alert */}
        <Alert variant="destructive" className="border-red-200 dark:border-red-800">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription className="text-red-800 dark:text-red-200">{getErrorMessage(error)}</AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Button asChild className="w-full h-12 font-semibold">
            <Link href="/sign-in">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full h-12 font-semibold">
            <Link href="/sign-up">Try Again</Link>
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-muted-foreground text-center">
          If you continue to experience issues, please contact our support team.
        </p>
      </div>
    </div>
  )
}

export default VerifyPage
