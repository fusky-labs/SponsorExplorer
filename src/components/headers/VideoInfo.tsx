"use client"

import dynamic from "next/dynamic"

const YouTube = dynamic(() => import("../YouTube").then((c) => c.YouTube), {
  ssr: false,
})

interface VideoInfoProps {
  id: string
}

export function VideoInfo(props: VideoInfoProps) {
  return (
    <div className="overflow-hidden rounded-md flex">
      <div className="aspect-video 2xl:w-[48rem] xl:w-[38rem] lg:w-[32rem] w-full h-full overflow-hidden relative">
        <YouTube id={props.id} />
      </div>
    </div>
  )
}
