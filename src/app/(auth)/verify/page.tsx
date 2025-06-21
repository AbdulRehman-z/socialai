import { RedirectTimer } from "@/components/custom/auth/redirectTimer"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { redirect } from "next/navigation"

type PageProps = {
  searchParams: Promise<{ error?: string }>
}

const REDIRECT_INTERVAL = 5000

const getErrorMessage = (error: string): string => {
  switch (error) {
    case 'invalid_token':
      return 'Invalid token! The verification link has been tampered with.'
    case 'expired_token':
      return 'Token expired! Please try signing in again to receive a new verification email.'
    default:
      return 'An unknown error occurred during verification.'
  }
}

const VerifyPage = async ({ searchParams }: PageProps) => {
  const { error } = await searchParams

  // If no error, this means verification was successful
  // For server-side redirect after success, we need a different approach
  if (!error) {
    // Option 1: Immediate redirect (uncomment if you want immediate redirect)
    // redirect("/sign-in")

    // Option 2: Show success message with client-side redirect timer
    return (
      <div className="min-h-screen flex justify-center items-center p-4">
        <div className="flex flex-col justify-center items-center space-y-4 max-w-md w-full">
          <div className="flex justify-center items-center size-20 rounded-full bg-green-100">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold text-center text-gray-900">
            Email Verified Successfully
          </h1>

          <Alert variant="default" className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your email has been verified successfully. You can now close this page and try signing in.
            </AlertDescription>
          </Alert>

          <RedirectTimer
            redirectUrl="/sign-in"
            intervalMs={REDIRECT_INTERVAL}
          />
        </div>
      </div>
    )
  }

  // Error state
  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="flex flex-col justify-center items-center space-y-4 max-w-md w-full">
        <AlertCircle className="w-16 h-16 text-red-500" />

        <h1 className="text-4xl font-bold text-center text-gray-900">
          Email Verification Failed
        </h1>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {getErrorMessage(error)}
          </AlertDescription>
        </Alert>

        <p className="text-sm text-gray-600 text-center">
          Please return to the sign-in page and try again.
        </p>
      </div>
    </div>
  )
}

export default VerifyPage
