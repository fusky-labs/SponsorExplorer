"use client"

import { YouTube } from "../YouTube"
import { useTimelineContext } from "@/context"

export default function Monitor() {
  const { youtubeId } = useTimelineContext()

  return (
    <div data-tl-monitor="" className="flex-shrink-0 flex flex-col w-1/2">
      <div className="aspect-video h-full w-full">
        <YouTube id={youtubeId as string} />
      </div>
      <div>controls</div>
    </div>
  )
}
