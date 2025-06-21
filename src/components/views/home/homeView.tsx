"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"


const HomeView = () => {
  const router = useRouter()
  const session = authClient.useSession()

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h2>Hello: {session.data?.user.name}</h2>
      <Button onClick={() => authClient.signOut({
        fetchOptions: {
          onSuccess: () => router.push("/sign-in")
        }
      })}>Sign-out</Button>
    </div>

  )
}


export default HomeView
