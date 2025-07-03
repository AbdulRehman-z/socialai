import { config } from "@/lib/config";
import { useTRPC } from "@/trpc/client";
import { Call, CallingState, StreamCall, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { CallUI } from "./callUi";

type CallConnectProps = {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
};

export const CallConnect = ({ meetingId, meetingName, userName, userId, userImage }: CallConnectProps) => {
  const trpc = useTRPC()
  const { mutateAsync: generateToken } = useMutation(trpc.meetings.generateToken.mutationOptions())
  const [client, setClient] = useState<StreamVideoClient>()
  const [call, setCall] = useState<Call>()

  useEffect(() => {
    const _client = new StreamVideoClient({
      apiKey: config.env.STREAM_API_KEY,
      tokenProvider: generateToken,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      }
    })

    setClient(_client)

    return () => {
      _client.disconnectUser()
      setClient(undefined)
    }
  }, [userId, userImage, userName, generateToken])

  useEffect(() => {
    if (!client) return

    const _call = client.call("default", meetingId)
    _call.camera.disable()
    _call.microphone.disable()
    setCall(_call)

    return () => {
      if (_call.state.callingState !== CallingState.LEFT) {
        _call.leave()
        _call.endCall()
        setCall(undefined)
      }
    }
  }, [client, meetingId])

  if (!call || !client) {
    return (
      <div className="min-h-screen flex flex-1 items-center justify-center">
        <Loader2Icon className="size-6" />
      </div>
    )
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
};
