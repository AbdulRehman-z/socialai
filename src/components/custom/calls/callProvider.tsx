"use client"

import { authClient } from "@/lib/auth-client"
import { Loader2Icon } from "lucide-react"
import { CallConnect } from "./callConnect"
import { generateAvatarUri } from "@/lib/avatar"

type CallProviderProps = {
  meetingId: string,
  meetingName: string
}

export const CallProvider = ({ meetingId, meetingName }: CallProviderProps) => {
  const { data, isPending } = authClient.useSession()

  if (!data || isPending) {
    return <div className="min-h-screen flex items-center justify-center bg-radial from-sidebar-accent to-sidebar">
      <Loader2Icon className="size-6 animate-spin" />
    </div>
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={data.user.image ??
        generateAvatarUri({ seed: data.user.name, variant: "initials" })}
    />
  )
}
