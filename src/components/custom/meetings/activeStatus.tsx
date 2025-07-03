import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";
import { GenericEmptyState } from "../genericEmptyState";

type ActiveStatusProps = {
  meetingId: string;
};

export const ActiveStatus = ({ meetingId }: ActiveStatusProps) => {
  return (
    <div className="flex items-center justify-center flex-col px-4 py-5 ">
      <GenericEmptyState
        title="Meeting is active"
        description="Meeting will end once all participants have left"
        type="active"
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
