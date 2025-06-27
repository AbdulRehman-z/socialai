import { ResponsiveDialog } from "@/components/custom/responsiveDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { JSX } from "react/jsx-runtime";

type useConfirmProps = {
  title: string;
  description: string;
}

export const useConfirm = ({ title, description }: useConfirmProps): [() => JSX.Element, () => Promise<unknown>] => {

  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  }

  const handleClose = () => {
    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const ConfirmationDialog = () => (
    <ResponsiveDialog
      open={promise !== null}
      onOpenChange={handleClose}
      title={title}
      description={description}
    >
      <div className="flex flex-col-reverse items-center justify-end w-full lg:flex-row gap-2">
        <Button variant={"outline"} className="w-full lg:w-auto" onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="w-full lg:w-auto" onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </ResponsiveDialog>
  )

  return [
    ConfirmationDialog,
    confirm
  ];
}
