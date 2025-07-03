import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { DefaultVideoPlaceholder, StreamVideoParticipant, ToggleAudioPreviewButton, ToggleVideoPreviewButton, useCallStateHooks, VideoPreview } from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

type CallLobbyProps = {
  onJoin: () => void;
};

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession()

  return <DefaultVideoPlaceholder
    participant={{
      userId: data?.user.id ?? "",
      image: data?.user.image ?? generateAvatarUri({ seed: data?.user.name!, variant: 'botttsNeutral' }),
      name: data?.user.name ?? "",
    } as StreamVideoParticipant}
  />
}

const AllowBrowserPermissions = () => {
  return <div className="flex flex-col gap-y-4">
    <h2 className="text-xl font-semibold">Permissions</h2>
    <p className="text-sm text-muted-foreground">Please grant your browser a permission to access your camera and microphone.</p>
  </div>
}

export const CallLobby = ({ onJoin }: CallLobbyProps) => {
  const { useMicrophoneState, useCameraState } = useCallStateHooks()
  const { hasBrowserPermission: hasMicrophonePermission } = useMicrophoneState()
  const { hasBrowserPermission: hasCameraPermission } = useCameraState()

  const hasPermissions = hasMicrophonePermission && hasCameraPermission;

  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <div className="px-4 py-6 flex flex-1 items-center justify-center">
        <div className="bg-accent rounded-lg flex flex-col px-15 py-8 gap-y-5">
          <div className="flex flex-col text-center gap-y-4">
            <h1 className="text-3xl font-semibold">Ready to join?</h1>
            <p className="text-sm text-muted-foreground">Setup your call before joining</p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasPermissions ?
                DisabledVideoPreview :
                AllowBrowserPermissions
            }
          />
          <div className="flex items-center gap-x-2 justify-center">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div className="flex items-center justify-between">
            <Button asChild variant={"outline"}>
              <Link href={"/meetings"}>
                Cancel
              </Link>
            </Button>
            <Button onClick={onJoin}>
              <LogInIcon />
              Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
