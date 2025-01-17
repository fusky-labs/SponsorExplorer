"use client"

import { useState } from "react"
import { useVideoInfoContext, usePlayerStateContext } from "@/context"
import { cn } from "@/utils"
import dynamic from "next/dynamic"
import { _Link as Link } from "@/components/Link"
import { SegmentStatsInline } from "../SegmentStatsInline"

import { DetailedSegmentStatsModal } from "../Modals"
import {
  LuExternalLink,
  LuGanttChartSquare,
  LuGlasses,
  LuLink2,
  LuPin,
} from "react-icons/lu"
import { Separator } from "../Separator"
import { VideoInfoTitle } from "./VideoInfoTitle"

const YouTube = dynamic(() => import("../YouTube").then((c) => c.YouTube), {
  ssr: false,
})

export function VideoInfo() {
  const { segmentData, videoDetails } = useVideoInfoContext()
  const { isPlayerPinned, setIsPlayerPinned } = usePlayerStateContext()
  const [detailsModal, setToggleDetailsModal] = useState(false)

  const _submissionCount = segmentData.submissionCount ?? 0

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
          <VideoInfoTitle />
          <SegmentStatsInline
            submissionCount={_submissionCount}
            segments={segmentData.segments}
            onDetailStatsShow={toggleDetailsDialog}
          />
          <Link
            href={`/video/${videoDetails.id}/timeline`}
            className="py-0.5 px-1.5 flex items-center gap-x-1.5 rounded-md hover:bg-neutral-300"
          >
            <LuGanttChartSquare size={17} />
            <span>Timeline view</span>
          </Link>
          {/* Bottom content */}
          <div className="flex-1" />
          <div className="flex items-center mt-auto gap-x-2">
            <button
              className={cn(
                "inline-flex gap-x-1.5 items-center",
                isPlayerPinned ? "dark:bg-white dark:text-black" : "",
              )}
              onClick={() => setIsPlayerPinned(!isPlayerPinned)}
            >
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
