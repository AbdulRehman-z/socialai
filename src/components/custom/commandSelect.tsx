import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";
import { CommandEmpty, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "../ui/command";

type CommandSelectProps = {
  options: Array<{
    id: string,
    value: string
    children: ReactNode
  }>
  onSelect: (value: string) => void
  onSearch?: (value: string) => void
  value: string
  placeholder?: string
  isSearchable?: boolean
  className?: string
};

export const CommandSelect = ({ options, onSelect, isSearchable, onSearch, value, placeholder, className }: CommandSelectProps) => {
  const [open, setOpen] = useState(false)
  const selectedOption = options.find(option => option.value === value);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    
    if (!newOpen && onSearch) {
      onSearch("");
    }
  }

  return (
    < >
      <Button
        type="button"
        className={cn("h-9 font-normal px-2 flex items-center justify-between",
          !selectedOption && "text-muted-foreground", className)}
        variant={"outline"}
        onClick={() => setOpen(!open)}
      >
        <div>
          {selectedOption?.children ?? placeholder}
        </div>
        <ChevronsUpDownIcon />
      </Button>

      <CommandResponsiveDialog
        open={open}
        onOpenChange={handleOpenChange}
        shouldFilter={!onSearch}
      >
        <CommandInput placeholder="Search here..." onValueChange={onSearch} />
        <CommandList >
          <CommandEmpty>
            <span className="text-sm text-muted-foreground">
              {isSearchable ? "searching..." : "No results found."}
            </span>
          </CommandEmpty>
          {
            options.map((option) => (
              <CommandItem
                key={option.id}
                onSelect={() => {
                  onSelect(option.value)
                  setOpen(!open)
                }}
              >
                {option.children}
              </CommandItem>
            ))
          }
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
