import { Loader2Icon } from "lucide-react"

type LoaderProps = {
  title: string,
  description: string
}

export const GenericLoader = ({ title, description }: LoaderProps) => {
  return (
    <div className="flex flex-1 items-center justify-center py-4 px-8">
      <div className="flex flex-col items-center justify-center gap-y-6 p-6">
        <Loader2Icon className="size-7 animate-spin text-primary" />
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}
