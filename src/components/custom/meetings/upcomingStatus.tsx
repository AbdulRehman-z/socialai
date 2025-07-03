import { Button } from "@/components/ui/button";
import { EmptyStateSvg } from "../emptyStateSvg";
import { GenericEmptyState } from "../genericEmptyState";
import { UpcomingStateSvg } from "../upcomingStateSvg";
import Link from "next/link";
import { BanIcon, VideoIcon } from "lucide-react";

type UpcomingStatusProps = {
  meetingId: string;
  onCancelMeeting: () => void;
  isCanceling: boolean;
};

export const UpcomingStatus = ({ meetingId, onCancelMeeting, isCanceling }: UpcomingStatusProps) => {

  return (
    <div className="flex items-center justify-center flex-col px-4 py-5 ">
      <GenericEmptyState
        title="Not started yet"
        description="Once you start this meeting, a summary will appear here."
        type="upcoming"
      />
      <div className="flex lg:flex-row max-lg:gap-y-4 flex-col-reverse items-center justify-center gap-x-4">
        <Button
          variant={"secondary"}
          onClick={onCancelMeeting}
          disabled={isCanceling}
          className="lg:w-auto w-full">
          <BanIcon />
          Cancel Meeting
        </Button>
        <Button
          disabled={isCanceling}
          asChild
          className="lg:w-auto w-full">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
