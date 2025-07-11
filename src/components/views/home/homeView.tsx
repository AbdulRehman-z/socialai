"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"


const HomeView = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h2>Home</h2>
    </div>
  )
}


export default HomeView
