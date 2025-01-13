"use client"

import type { SegmentBank } from "@/types"
import { cn, formatTimecode, pluralFormatter } from "@/utils"
import { LuBarChartHorizontal, LuExternalLink } from "react-icons/lu"

interface SegmentStatsInlineProps extends Partial<SegmentBank> {
  onDetailStatsShow?: React.MouseEventHandler<HTMLButtonElement>
}

export function SegmentStatsInline(props: SegmentStatsInlineProps) {
  const _submissionCount = props.submissionCount ?? 0
  const _segmentBank = props.segments ?? []

  const hasNoSubmissions = _submissionCount !== 0

  const accum = _segmentBank
    .map((seg) => seg.endTime - seg.startTime)
    .reduce((acc, prev) => acc + prev, 0)

  const totalSegmentDuration = formatTimecode(accum, {
    separator: "letters",
  }).replace(/^0m\s/g, "")

  return (
    <div
      data-segment-stats-inline=""
      className="flex flex-wrap items-center gap-x-1 py-1.5 px-2.5 border border-neutral-400 rounded-md"
    >
      <span>
        <span className="font-bold">{_submissionCount ?? 0}</span>
        {pluralFormatter(_submissionCount!, " submission", " submissions", {
          noIncludeNum: true,
        })}
      </span>
      {hasNoSubmissions ? (
        <span>
          (<strong>{totalSegmentDuration}</strong> of segment(s) accrued)
        </span>
      ) : null}
      <div className="ml-1.5 h-4 border-l-2 border-neutral-400" />
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
      </button>
    </div>
  )
}
