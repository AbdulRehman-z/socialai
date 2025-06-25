import Image from "next/image"

type GenericEmptyStateProps = {
  title: string,
  description: string
}

export const GenericEmptyState = ({ title, description }: GenericEmptyStateProps) => {
  return (
    <div className="flex items-center justify-center py-4 px-8">
      <Image src={""} width={240} height={240} alt="empty" />
      <div className="flex flex-col items-center justify-center max-w-md mx-auto text-center gap-y-2">
        <h1 className="text-lg font-medium ">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
