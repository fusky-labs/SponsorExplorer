"use client"

import type { SegmentBank } from "@/types"
import { cn, pluralFormatter } from "@/utils"
import { LuBarChartHorizontal, LuExternalLink } from "react-icons/lu"

interface SegmentStatsInlineProps extends Partial<SegmentBank> {
  onDetailStatsShow?: React.MouseEventHandler<HTMLButtonElement>
}

export function SegmentStatsInline(props: SegmentStatsInlineProps) {
  const _submissionCount = props.submissionCount ?? 0
  const _segmentBank = props.segments ?? []

  const hasNoSubmissions = _submissionCount !== 0

  return (
    <div
      data-segment-stats-inline=""
      className="flex flex-wrap items-center gap-x-2 py-1.5 px-2.5 border border-neutral-400 rounded-md"
    >
      <span>
        <span className="font-bold">{_submissionCount ?? 0}</span>
        {pluralFormatter(_submissionCount!, " submission", " submissions", {
          noIncludeNum: true,
        })}
      </span>
      {hasNoSubmissions ? (
        <span>
          (<span className="font-bold">0s</span> of segments submitted)
        </span>
      ) : null}
      <div className="h-4 border-l-2 border-neutral-400" />
      <button
        onClick={props.onDetailStatsShow}
        className={cn(
          "py-0.5 px-1.5 flex items-center gap-x-1.5  rounded-md",
          !hasNoSubmissions
            ? "opacity-70 cursor-not-allowed"
            : "hover:bg-neutral-300",
        )}
        disabled={!hasNoSubmissions}
      >
        <LuBarChartHorizontal size={17} />
        <span>View detailed stats</span>
        <LuExternalLink size={14} />
      </button>
    </div>
  )
}
