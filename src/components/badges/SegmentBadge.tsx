import { cn } from "@/utils"
import { Badge } from "./Badge"
import { Category } from "@/utils/SponsorBlock.types"
import { sbCategory } from "@/constants"

interface SegmentBadgeProps {
  segments: Category
  chapterLabel?: string
  layout?: "mobile" | "desktop"
}

export function SegmentBadge(props: SegmentBadgeProps) {
  const _seg = sbCategory[props.segments]

  return (
    <Badge
      className={cn(
        "whitespace-nowrap inline-flex items-center gap-x-1.5",
        props.layout === "desktop" ? "relative rounded-2xl cursor-help" : "p-0",
      )}
    >
      <span
        className={cn(_seg.bg, "rounded-full size-3 flex-shrink-0 z-[1]")}
        aria-hidden
      />
      <span
        className={cn(
          "text-sm font-semibold z-[1]",
          props.chapterLabel ? "underline decoration-dashed" : "",
        )}
      >
        {props.chapterLabel ? props.chapterLabel : _seg.label}
      </span>
      {props.layout === "desktop" ? (
        <div className={cn(_seg.bg, "z-0 absolute inset-0 opacity-25")} />
      ) : null}
    </Badge>
  )
}
