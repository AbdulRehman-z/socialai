"use client"

import { DataPagination } from "@/components/custom/dataPagination";
import { DataTable } from "@/components/custom/dataTable";
import { GenericEmptyState } from "@/components/custom/genericEmptyState";
import { columns } from "@/components/custom/meetings/columns";
import { MeetingsListsHeader } from "@/components/custom/meetings/meetingsListHeader";
import { useMeetingsFilters } from "@/hooks/meetings/use-meetings-filters";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const MeetingsView = () => {
  const [filters, setFilters] = useMeetingsFilters()
  const router = useRouter()
  const trpc = useTRPC()
  const { data: meetings } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters
  }))

  return (
    <>
      <DataTable data={meetings.items} columns={columns} onRowClick={(row) => router.push(`/meetings/${row.id}`)} />
      <DataPagination totalPages={meetings.totalPages} page={filters.page} onPageChange={(value) => setFilters({ page: value })} />
      {meetings.items.length === 0 && <GenericEmptyState dialog="meeting" title="No meetings found"
        description="Schedule a meeting to connect with others.Each meeting lets you collaborate,interact and share your ideas with participants in realtime" />}
    </>
  );
}
