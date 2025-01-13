"use client"

import { useState } from "react"
import { useSegmentStoreContext } from "@/context"
import type { VideoInfoType } from "@/types"
import { parseDateStr } from "@/utils"
import dynamic from "next/dynamic"
import { _Link as Link } from "@/components/Link"
import { Notice } from "../Notice"
import { SegmentStatsInline } from "../SegmentStatsInline"
import { DetailedStatsModal } from "../modals"
import { LuExternalLink, LuGlasses, LuGanttChartSquare } from "react-icons/lu"

const YouTube = dynamic(() => import("../YouTube").then((c) => c.YouTube), {
  ssr: false,
})

interface VideoInfoProps extends VideoInfoType {
  id: string
}

export function VideoInfo(props: VideoInfoProps) {
  const { segmentData } = useSegmentStoreContext()
  const [detailsModal, setToggleDetailsModal] = useState(false)

  const _submissionCount = segmentData.submissionCount ?? 0

  const { video } = props

  let _isoDate
  let _readableDate

  if (video) {
    const { isoDate, readableDate } = parseDateStr(video.publishedAt, {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

    _isoDate = isoDate
    _readableDate = readableDate
  }

  const toggleDetailsDialog = () => setToggleDetailsModal(!detailsModal)

  return (
    <>
      <div className="overflow-hidden rounded-lg flex lg:flex-row flex-col bg-neutral-100">
        <div className="aspect-video 2xl:w-[48rem] xl:w-[38rem] lg:w-[32rem] w-full h-full overflow-hidden relative">
          <YouTube id={props.id} />
        </div>
        {/* Video details */}
        <div className="flex-1 px-5 py-4 flex flex-col gap-y-3 prose-h1:text-2xl prose-h1:font-bold w-full">
          {/* Video title */}
          {video ? (
            <>
              <div className="space-y-1">
                <span className="opacity-75">Segments for</span>
                <h1 translate="no">{props.video.title}</h1>
              </div>
              <div className="inline-flex flex-wrap gap-x-2">
                <div className="sr-only" id="view-channel-segments-a11y">
                  {"View channel segments for "}
                  <span translate="no">{props.video.channelTitle}</span>
                </div>
                <Link
                  translate="no"
                  aria-labelledby="view-channel-segments-a11y"
                  href={`/channel/${props.video.channelId}`}
                >
                  {props.video.channelTitle}
                </Link>
                <time dateTime={_isoDate}>{_readableDate}</time>
              </div>
            </>
          ) : (
            <Notice intent="alert" heading="Couldn't fetch video details">
              This video might be private or has been removed from YouTube.
              Maybe double check the video ID?
            </Notice>
          )}
          <SegmentStatsInline
            submissionCount={_submissionCount}
            segments={segmentData.segments}
            onDetailStatsShow={toggleDetailsDialog}
          />
          <Link
            href={`/video/${props.id}/timeline`}
            className="py-0.5 px-1.5 flex items-center gap-x-1.5 rounded-md hover:bg-neutral-300"
          >
            <LuGanttChartSquare size={17} />
            <span>Timeline view</span>
          </Link>
          {/* Bottom content */}
          <div className="flex-1" />
          <div className="flex items-center mt-auto gap-x-2">
            <Link
              href={`https://sb.ltn.fi/video/${props.id}`}
              className="inline-flex gap-x-1.5 items-center"
            >
              <span>
                View on <span translate="no">SBbrowser</span>
              </span>
              <LuExternalLink size={17} />
            </Link>
            <div className="ml-1.5 h-4 border-l-2 border-neutral-400" />
            <button className="inline-flex gap-x-1.5 items-center">
              <LuGlasses size={17} />
              <span>For nerds</span>
            </button>
          </div>
        </div>
      </div>
      {/* Modals */}
      <DetailedStatsModal open={detailsModal} onClose={toggleDetailsDialog} />
    </>
  )
}
