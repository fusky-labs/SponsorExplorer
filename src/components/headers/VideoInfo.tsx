"use client"

import { useSegmentStoreContext } from "@/context"
import type { VideoInfoType } from "@/types"
import { pluralFormatter } from "@/utils"
import dynamic from "next/dynamic"
import Link from "next/link"

const YouTube = dynamic(() => import("../YouTube").then((c) => c.YouTube), {
  ssr: false,
})

interface VideoInfoProps extends VideoInfoType {
  id: string
}

export function VideoInfo(props: VideoInfoProps) {
  const { segmentData } = useSegmentStoreContext()

  const _submissionCount = segmentData.submissionCount ?? 0

  return (
    <div className="overflow-hidden rounded-lg flex lg:flex-row flex-col bg-neutral-100">
      <div className="flex-shrink-0 aspect-video 2xl:w-[48rem] xl:w-[38rem] lg:w-[32rem] w-full h-full overflow-hidden relative">
        <YouTube id={props.id} />
      </div>
      {/* Video details */}
      <div className="px-5 py-4 flex flex-col gap-y-3 prose-h1:text-2xl prose-h1:font-bold w-full">
        {/* Video title */}
        {props.videoState !== "FOUND" ? (
          <>
            <div>
              <span className="opacity-75">Segments for</span>
              <h1 className="mt-1">{props.video.title}</h1>
            </div>
            <div className="inline-flex flex-wrap gap-x-2">
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
        <div className="inline-flex flex-wrap gap-x-2 py-1.5 px-2.5 border border-neutral-400 rounded-md">
          <span>
            <span className="font-bold">{_submissionCount ?? 0}</span>
            {pluralFormatter(_submissionCount!, " submission", " submissions", {
              noIncludeNum: true,
            })}
          </span>
          {_submissionCount !== 0 ? (
            <span>
              (<span className="font-bold">N:NN</span> of segments submitted)
            </span>
          ) : null}
          <button>View detailed stats</button>
        </div>
        {/* Bottom content */}
        <div className="flex-1 flex items-end mt-1.5">
          <Link href={`https://sb.ltn.fi/video/${props.id}`} target="_blank">
            View on sb.ltn.fi
          </Link>
          <button>View logs</button>
        </div>
      </div>
    </div>
  )
}
