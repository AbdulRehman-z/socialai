import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircleIcon, CheckIcon } from "lucide-react"

type PageProps = {
  searchParams: Promise<{ error: string }>
}

const page = async ({ searchParams }: PageProps) => {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex justify-center items-center">
      {error && <div className="flex flex-col justify-center items-center space-y-3">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <h1 className="text-4xl font-bold text-center">Email verification failed</h1>
        <Alert variant={"destructive"}>
          <AlertCircle />
          <AlertDescription>
            {
              (() => {
                switch (error) {
                  case 'invalid_token':
                    return 'Invalid token! Token is tampered!!!';
                  case 'expired_token':
                    return 'Token expired! Trying to signing in again will send a new verification email';
                  default:
                    return 'Unknown error';
                }
              })()
            }
          </AlertDescription>
        </Alert>
      </div>}
      {!error && <div className="flex flex-col justify-center items-center space-y-3">
        <CheckIcon className="w-10 h-10 text-green-500" />
        <h1 className="text-4xl font-bold text-center">Email verification successful</h1>
        <Alert variant={"default"}>
          <CheckCircleIcon className="w-10 h-10 text-green-500" />
          <AlertDescription className="">
            Your email has been verified successfully.You can now close this page and try signing in.
          </AlertDescription>
        </Alert>
      </div>}
    </div>
  )
}

export default page
