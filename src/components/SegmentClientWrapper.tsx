"use client"

import { useVideoInfoContext } from "@/context"
import { LockedSegmentsNotice } from "./LockedSegmentsNotice"
import { SegmentTable } from "./Tables"
import { Notice } from "./Notice"
import { SegmentFilterBar } from "./FilterBar"
import { LuMoreVertical, LuPlay, LuRefreshCw } from "react-icons/lu"

export function SegmentClientWrapper() {
  const { segmentData } = useVideoInfoContext()
  const { segments, lockReason, hasLockedSegments } = segmentData!

  const isEmptySubmission = segments?.length === 0

  return (
    <>
      {/* Lock notices */}
      <div className="empty:my-1 my-3">
        {hasLockedSegments ? (
          <LockedSegmentsNotice reason={lockReason!} />
        ) : null}
      </div>
      <div className="relative flex flex-col gap-y-2.5 *:bg-white dark:*:bg-neutral-950">
        <div className="sticky top-14 w-full h-16 -mb-16 z-10" aria-hidden />
        {/* Filter stuff */}
        <div className="sticky top-16 z-20 flex items-center gap-x-1.5">
          <div className="rounded-md border flex p-1 border-neutral-300 dark:border-neutral-700">
            <button className="rounded-md px-2 py-1 bg-neutral-300 font-medium">
              All
            </button>
            <button className="rounded-md px-2.5 py-1">Segments</button>
            <button className="rounded-md px-2.5 py-1">Chapters</button>
          </div>
          <SegmentFilterBar />
          <button className="inline-flex items-center gap-x-2 rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-2">
            <LuPlay size={19} />
            <span>Live</span>
          </button>
          <button className="inline-flex items-center gap-x-2 rounded-md border border-neutral-300 dark:border-neutral-700 p-2">
            <LuRefreshCw size={19} />
          </button>
          <button className="border border-neutral-300 dark:border-neutral-700 p-2 rounded-md">
            <LuMoreVertical size={19} />
          </button>
        </div>
        {/* Tables */}
        {!isEmptySubmission ? (
          <SegmentTable segments={segments!} />
        ) : (
          <div className="mt-4">
            <Notice heading="No segments submitted" intent="info">
              Couldn't fetch segments, either the video ID may be invalid, or
              there are no submitted segments available for this video at this
              time. Maybe a refresh will help?
            </Notice>
          </div>
        )}
      </div>
    </>
  )
}
