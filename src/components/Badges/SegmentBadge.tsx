import { cn } from "@/utils"
import { Badge } from "./Badge"
import type { Category } from "@/utils/SponsorBlock.types"
import { sbCategoryMap } from "@/utils/constants"

interface SegmentBadgeProps {
  segments: Category
  chapterLabel?: string
  layout?: "mobile" | "desktop"
}

export function SegmentBadge(props: SegmentBadgeProps) {
  const segmentMap = sbCategoryMap[props.segments]

  return (
    <Badge
      className={cn(
        "whitespace-nowrap inline-flex items-center gap-x-1.5",
        props.layout === "desktop" ? "relative rounded-2xl cursor-help" : "p-0",
      )}
    >
      <span
        className={cn(segmentMap.bg, "rounded-full size-3 flex-shrink-0 z-[1]")}
        aria-hidden
      />
      <span
        className={cn(
          "text-sm font-semibold z-[1]",
          props.chapterLabel ? "underline decoration-dashed" : "",
        )}
      >
        {props.chapterLabel ? props.chapterLabel : segmentMap.label}
      </span>
      {props.layout === "desktop" ? (
        <div className={cn(segmentMap.bg, "z-0 absolute inset-0 opacity-25")} />
      ) : null}
    </Badge>
  )
}
