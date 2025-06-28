"use client"

import { DataTable } from "@/components/custom/dataTable";
import { GenericEmptyState } from "@/components/custom/genericEmptyState";
import { columns } from "@/components/custom/meetings/columns";
import { MeetingsListsHeader } from "@/components/custom/meetings/meetingsListHeader";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
  const trpc = useTRPC()
  const { data: meetings } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

  return (
    <>
      <MeetingsListsHeader />
      <DataTable data={meetings.items} columns={columns} />
      {meetings.items.length === 0 && <GenericEmptyState dialog="meeting" title="Create your first meeting"
        description="Schedule a meeting to connect with others.Each meeting lets you collaborate,interact and share your ideas with participants in realtime" />}
    </>
  );
}
