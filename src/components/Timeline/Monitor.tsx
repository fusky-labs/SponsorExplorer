"use client"

import { YouTube } from "../YouTube"
import { useVideoInfoContext } from "@/context"

export default function Monitor() {
  const {
    videoDetails: { id },
  } = useVideoInfoContext()

  return (
    <div data-tl-monitor="" className="flex-shrink-0 flex flex-col w-1/2">
      <div className="aspect-video h-full w-full">
        <YouTube id={id} />
      </div>
      <div>controls</div>
    </div>
  )
}
