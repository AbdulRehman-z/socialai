import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { CallLobby } from "./callLobby";
import { CallActive } from "./callActive";


type CallUIProps = {
  meetingName: string;
};

export const CallUI = ({ meetingName }: CallUIProps) => {
  const call = useCall()
  const [callStatus, setCallStatus] = useState<"lobby" | "call" | "ended">("lobby")

  const handleLeaveCall = () => {
    if (!call) return

    call.leave()
    setCallStatus("ended")
  }

  const handleCallJoin = async () => {
    if (!call) return

    try {
      await call.join()

    } catch (error) {
      console.error(error)
    }

    setCallStatus("call")
  }

  return (
    <StreamTheme>
      {callStatus === "lobby" && <CallLobby onJoin={handleCallJoin} />}
      {callStatus === "call" && <CallActive meetingName={meetingName} onLeave={handleLeaveCall} />}
    </StreamTheme>
  )
}
