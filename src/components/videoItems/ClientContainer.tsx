"use client"

import { useViewItemStateContext, type ViewItemContext } from "@/context"
import { cn } from "@/utils"
import VideoItemGrid from "./VideoItemGrid"

interface VideoItemContainerProps {
  queryView?: ViewItemContext["view"]
}

export function VideoItemContainer(props: VideoItemContainerProps) {
  const { view, setView } = useViewItemStateContext()

  return (
    <div className={cn("grid gap-1.5", view === "grid" ? "grid-cols-4" : "")}>
      {[...Array(21)].map((_, i) => (
        <VideoItemGrid key={i} />
      ))}
    </div>
  )
}
