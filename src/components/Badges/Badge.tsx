import { cn } from "@/utils"

interface BadgeProps {
  className?: string
}

export function Badge(props: React.PropsWithChildren<BadgeProps>) {
  return (
    <div
      className={cn(
        "px-3 py-[0.175rem] rounded-md overflow-hidden",
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}
