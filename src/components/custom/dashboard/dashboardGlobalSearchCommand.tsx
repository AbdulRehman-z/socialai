import { CommandDialog, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

type DashboardGlobalSearchCommandProps = {
  globalOpen: boolean;
  setGlobalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DashboardGlobalSearchCommand = ({ globalOpen, setGlobalOpen }: DashboardGlobalSearchCommandProps) => {
  return (
    <CommandResponsiveDialog open={globalOpen} onOpenChange={setGlobalOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>
          Testing
        </CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
