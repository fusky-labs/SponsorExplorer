"use client"

import { LuFilter, LuHelpCircle, LuMoreVertical, LuInfo } from "react-icons/lu"
import { LockedSegmentsNotice } from "./LockedSegmentsNotice"
import { SegmentTable } from "./tables"
import { Notice } from "./Notice"
import { useSegmentStoreContext } from "@/context"

export function SegmentClientWrapper() {
  const { segmentData } = useSegmentStoreContext()

  const isEmptySubmission = segmentData?.segments?.length === 0

  const hasLocks = !(
    segmentData?.lock?.skip.length === 0 &&
    segmentData?.lock?.mute.length === 0 &&
    segmentData?.lock?.full.length === 0
  )

  return (
    <>
      {/* Lock notices */}
      <div className="my-4">{hasLocks ? <LockedSegmentsNotice /> : null}</div>
      <div className="relative flex flex-col gap-y-2.5">
        {/* Filter stuff */}
        <div
          className="bg-white sticky top-14 w-full h-16 -mb-16 z-10"
          aria-hidden
        />
        <div className="bg-white sticky top-16 z-20 flex gap-x-2.5">
          <div className="rounded-md border flex p-1 border-neutral-200">
            <button className="rounded-md px-2 py-1 bg-neutral-300 font-medium">
              All
            </button>
            <button className="rounded-md px-2.5 py-1">Segments</button>
            <button className="rounded-md px-2.5 py-1">Chapters</button>
          </div>
          <div className="flex-1 relative flex rounded-md border">
            <div className="absolute left-2 inset-y-0 flex items-center">
              <LuFilter size={19} />
            </div>
          </div>
          <button>
            <LuMoreVertical size={19} />
          </button>
          <button>
            <LuHelpCircle size={19} />
          </button>
        </div>
        {/* Tables */}
        {!isEmptySubmission ? (
          <SegmentTable segments={segmentData!.segments!} />
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
