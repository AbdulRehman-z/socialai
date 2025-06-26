import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type DataPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const DataPagination = ({ page, totalPages, onPageChange }: DataPaginationProps) => {

  return (
    <div className="flex items-center justify-between md:px-8 px-3 pt-5">
      <div>
        <h2 className="text-muted-foreground">Page {page} of {totalPages}</h2>
      </div>
      <div className="flex items-center gap-x-2">
        <Button variant={"outline"} size={"sm"} onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>
          <ChevronLeftIcon />
        </Button>
        <Button variant={"outline"} size={"sm"} onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages || totalPages === 0}>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};
