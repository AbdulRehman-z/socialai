import { CommandDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

type DashboardGlobalSearchCommandProps = {
  globalOpen: boolean;
  setGlobalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DashboardGlobalSearchCommand = ({ globalOpen, setGlobalOpen }: DashboardGlobalSearchCommandProps) => {
  return (
    <CommandDialog open={globalOpen} onOpenChange={setGlobalOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>
          Testing
        </CommandItem>
      </CommandList>
    </CommandDialog>
  );
};
