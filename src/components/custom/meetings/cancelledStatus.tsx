import { Button } from "@/components/ui/button";
import { EmptyStateSvg } from "../emptyStateSvg";
import { GenericEmptyState } from "../genericEmptyState";
import { UpcomingStateSvg } from "../upcomingStateSvg";
import Link from "next/link";
import { BanIcon, VideoIcon } from "lucide-react";

type CancelledStatusProps = {
  meetingId: string;
};

export const CancelledStatus = ({ meetingId }: CancelledStatusProps) => {
  return (
    <div className="flex items-center justify-center flex-col px-4 py-5 ">
      <GenericEmptyState
        title="Meeting cancelled"
        description="This meeting was cancelled"
        type="cancelled"
      />
    </div>
  );
};
