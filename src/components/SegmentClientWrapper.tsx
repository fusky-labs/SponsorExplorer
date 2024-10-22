"use client"

import { useState, useEffect } from "react"
import { LuFilter, LuHelpCircle, LuMoreVertical } from "react-icons/lu"
import { VideoSegments } from "@/types"
import { LockedSegmentsNotice } from "./LockedSegmentsNotice"
import { SegmentTable } from "./tables"

interface SegmentClientWrapperProps extends VideoSegments {}

export function SegmentClientWrapper(props: SegmentClientWrapperProps) {
  const [segmentStore, setSegmentStore] = useState([])

  const isEmptySubmission = props.segments.length === 0

  const hasLocks = !(
    props.lock.skip.length === 0 &&
    props.lock.mute.length === 0 &&
    props.lock.full.length === 0
  )

  return (
    <>
      <div className="my-4">{hasLocks ? <LockedSegmentsNotice /> : null}</div>
      <div className="relative flex flex-col gap-y-2.5">
        {/* Filter stuff */}
        <div
          className="bg-white sticky top-14 w-full h-16 -mb-16 z-10"
          aria-hidden
        />
        <div className="bg-white sticky top-16 z-20 flex gap-x-2.5">
          <div className="p-1 rounded-md border flex">
            <button className="rounded-md px-2.5 py-0.5 bg-red-200 font-medium">
              All
            </button>
            <button className="rounded-md px-2.5 py-0.5">Segments</button>
            <button className="rounded-md px-2.5 py-0.5">Chapters</button>
          </div>
          <div className="flex-1 relative flex rounded-md border">
            <div className="absolute left-2 inset-y-0 flex items-center">
              <LuFilter size={16} className="" />
            </div>
            <div className="w-8" aria-hidden />
            <input
              className="flex-1 h-full outline-none"
              type="text"
              placeholder="Filter segments"
            />
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
          <SegmentTable segments={props.segments} />
        ) : (
          <div>EMPTY</div>
        )}
      </div>
    </>
  )
}
