import { AlertCircleIcon } from "lucide-react"

type GenericErrorProps = {
  title: string,
  description: string
}

export const GenericError = ({ title, description }: GenericErrorProps) => {
  return (
    <div className="flex flex-1 items-center justify-center py-4 px-8">
      <div className="flex flex-col items-center justify-center gap-y-6 p-6">
        <AlertCircleIcon className="size-7 text-destructive" />
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h1 className="text-xl font-semibold text-destructive">{title}</h1>
          <p className="text-sm text-destructive/84">{description}</p>
        </div>
      </div>
    </div>
  )
}
