import { Button } from "@/components/ui/button";
import { EmptyStateSvg } from "../emptyStateSvg";
import { GenericEmptyState } from "../genericEmptyState";
import { UpcomingStateSvg } from "../upcomingStateSvg";
import Link from "next/link";
import { BanIcon, VideoIcon } from "lucide-react";

type CompletedStatusProps = {
  meetingId: string;
};

export const CompletedStatus = ({ meetingId }: CompletedStatusProps) => {
  return (
    <div className="flex items-center justify-center flex-col px-4 py-5 ">
      <GenericEmptyState
        title="Meeting is completed"
        description="This meeting is completed, a summary will appear soon"
        type="completed"
      />
    </div>
  );
};
