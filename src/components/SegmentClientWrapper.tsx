"use client"

import { useSegmentStoreContext } from "@/context"
import { LuFilter, LuHelpCircle, LuMoreVertical } from "react-icons/lu"
import { LockedSegmentsNotice } from "./LockedSegmentsNotice"
import { SegmentTable } from "./tables"
import { Notice } from "./Notice"

export function SegmentClientWrapper() {
  const { segmentData } = useSegmentStoreContext()
  const { segments, lockReason, hasLockedSegments } = segmentData!

  const isEmptySubmission = segments?.length === 0

  return (
    <>
      {/* Lock notices */}
      <div className="my-4">
        {hasLockedSegments ? (
          <LockedSegmentsNotice reason={lockReason!} />
        ) : null}
      </div>
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
          <div id="filter-container" className="flex-1"></div>
          <button>
            <LuFilter size={19} />
          </button>
          <button>
            <LuMoreVertical size={19} />
          </button>
          <button>
            <LuHelpCircle size={19} />
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
