"use client"

import { useViewItemStateContext, type ViewStateContext } from "@/context"

interface VideoItemContainerProps {
  queryView?: ViewStateContext["view"]
}

export function VideoItemContainer({ queryView }: VideoItemContainerProps) {
  const { view, setView } = useViewItemStateContext()

  return <div>{`The damn view is ${view} boi`}</div>
}
