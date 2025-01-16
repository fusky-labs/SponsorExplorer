"use client"

import { useState } from "react"
import { useVideoInfoContext } from "@/context"
import { parseDateStr } from "@/utils"
import dynamic from "next/dynamic"
import { _Link as Link } from "@/components/Link"
import { Notice } from "../Notice"
import { SegmentStatsInline } from "../SegmentStatsInline"

import { DetailedSegmentStatsModal } from "../Modals"
import { LuExternalLink, LuGlasses, LuLink2, LuPin } from "react-icons/lu"
import { Separator } from "../Separator"

const YouTube = dynamic(() => import("../YouTube").then((c) => c.YouTube), {
  ssr: false,
})

export function VideoInfo() {
  const { segmentData, videoDetails } = useVideoInfoContext()
  const [detailsModal, setToggleDetailsModal] = useState(false)

  const _submissionCount = segmentData.submissionCount ?? 0

  const { video } = videoDetails

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
      <div
        data-player-root-anchor=""
        className="overflow-hidden rounded-lg flex lg:flex-row flex-col bg-neutral-100 dark:bg-neutral-900"
      >
        <div className="aspect-video 2xl:w-[48rem] xl:w-[38rem] lg:w-[32rem] w-full h-full overflow-hidden relative">
          <YouTube id={videoDetails.id} />
        </div>
        {/* Video details */}
        <div className="flex-1 px-5 py-4 flex flex-col gap-y-3 prose-h1:text-2xl prose-h1:font-bold w-full">
          {/* Video title */}
          {video ? (
            <>
              <div className="space-y-1">
                <span className="opacity-75">Segments for</span>
                <h1 translate="no">{videoDetails.video.title}</h1>
              </div>
              <div className="inline-flex flex-wrap gap-x-2">
                <div className="sr-only" id="view-channel-segments-a11y">
                  {"View channel segments for "}
                  <span translate="no">{videoDetails.video.channelTitle}</span>
                </div>
                <Link
                  translate="no"
                  aria-labelledby="view-channel-segments-a11y"
                  href={`/channel/${videoDetails.video.channelId}`}
                >
                  {videoDetails.video.channelTitle}
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
          {/* Bottom content */}
          <div className="flex-1" />
          <div className="flex items-center mt-auto gap-x-2">
            <button className="inline-flex gap-x-1.5 items-center">
              <LuPin size={17} />
              <span>Pin player</span>
            </button>
            <Separator />
            <button className="inline-flex gap-x-1.5 items-center">
              <LuLink2 size={17} />
              <span>Copy link</span>
            </button>
            <Separator />
            <button className="inline-flex gap-x-1.5 items-center">
              <LuGlasses size={17} />
              <span>For nerds</span>
            </button>
            <Separator />
            <Link
              href={`https://sb.ltn.fi/video/${videoDetails.id}`}
              className="inline-flex gap-x-1.5 items-center"
            >
              <span>
                View on <span translate="no">SBbrowser</span>
              </span>
              <LuExternalLink size={17} />
            </Link>
          </div>
        </div>
      </div>
      {/* Modals */}
      <DetailedSegmentStatsModal
        open={detailsModal}
        onClose={toggleDetailsDialog}
      />
    </>
  )
}
