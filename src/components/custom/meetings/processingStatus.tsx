import { Button } from "@/components/ui/button";
import { EmptyStateSvg } from "../emptyStateSvg";
import { GenericEmptyState } from "../genericEmptyState";
import { UpcomingStateSvg } from "../upcomingStateSvg";
import Link from "next/link";
import { BanIcon, VideoIcon } from "lucide-react";

type ProcessingStatusProps = {
  meetingId: string;
};

export const ProcessingStatus = ({ meetingId }: ProcessingStatusProps) => {
  return (
    <div className="flex items-center justify-center flex-col px-4 py-5 ">
      <GenericEmptyState
        title="Meeting is processing"
        description="Meeting will start once all participants have joined"
        type="processing"
      />
      <div className="flex items-center justify-center gap-x-4">
        <Button
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
