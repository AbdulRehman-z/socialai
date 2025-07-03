import { botttsNeutral, initials } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type GeneratedAvatarProps = {
  seed: string,
  variant: "botttsNeutral" | "initials"
  className?: string,
}

export const GeneratedAvatar = ({ seed, variant, className }: GeneratedAvatarProps) => {
  let avatar

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, {
      seed
    })
  } else {
    avatar = createAvatar(initials, {
      seed: seed,
      fontSize: 42,
      fontWeight: 500
    })
  }

  return (
    <Avatar className={className}>
      <AvatarImage src={avatar.toDataUri()} />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
