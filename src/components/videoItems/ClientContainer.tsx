"use client"

import { useViewItemStateContext, type ViewItemContext } from "@/context"

interface VideoItemContainerProps {
  queryView?: ViewItemContext["view"]
}

export function VideoItemContainer(props: VideoItemContainerProps) {
  const { view, setView } = useViewItemStateContext()

  return <div>{`The damn view is ${view} boi`}</div>
}
