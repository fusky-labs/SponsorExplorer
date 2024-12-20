"use client"

import dynamic from "next/dynamic"
import Link from "next/link"

const YouTube = dynamic(() => import("../YouTube").then((c) => c.YouTube), {
  ssr: false,
})

interface VideoInfoProps {
  id: string
  videoState: "FOUND" | "NOT_FOUND"
  video: {
    title: string
    publishedAt: string
    channelId: string
    channelTitle: string
  }
}

export function VideoInfo(props: VideoInfoProps) {
  return (
    <div className="overflow-hidden rounded-lg flex lg:flex-row flex-col bg-neutral-100">
      <div className="flex-shrink-0 aspect-video 2xl:w-[48rem] xl:w-[38rem] lg:w-[32rem] w-full h-full overflow-hidden relative">
        <YouTube id={props.id} />
      </div>
      {/* Video details */}
      <div className="px-5 py-4 flex flex-col gap-y-3 prose-h1:text-2xl prose-h1:font-bold w-full">
        {/* Video title */}
        {props.videoState === "FOUND" ? (
          <>
            <div>
              <span>Segments for</span>
              <h1 className="mt-1">{props.video.title}</h1>
            </div>
            <div className="space-x-3">
              <span>{props.video.channelTitle}</span>
              <span>{props.video.publishedAt}</span>
            </div>
          </>
        ) : (
          <div>
            <h1>Couldn't fetch video details</h1>
            <div className="mt-1">
              This video might be private or has been removed from YouTube.
              Maybe double check the video ID?
            </div>
          </div>
        )}
        <div className="space-x-3 py-1.5 px-2.5 border border-neutral-400 rounded-md">
          <span>N submissions</span>
        </div>
        {/* Bottom content */}
        <div className="flex-1 flex items-end mt-1.5">
          <Link href={`https://sb.ltn.fi/video/${props.id}`} target="_blank">
            View on sb.ltn.fi
          </Link>
        </div>
      </div>
    </div>
  )
}
