"use client"

import dynamic from "next/dynamic"
import TimelinePane from "./Pane"

const TlMonitor = dynamic(() => import("./Monitor"), {
  ssr: false,
})

export function TimelineClient() {
  return (
    <div className="w-full flex flex-col">
      <div className="flex-1 flex">
        <div className="flex-1">segment view</div>
        <TlMonitor />
      </div>
      <TimelinePane />
    </div>
  )
}
