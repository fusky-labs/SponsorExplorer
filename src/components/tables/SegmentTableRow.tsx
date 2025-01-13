"use client"

import { Category } from "@/utils/SponsorBlock.types"
import { SegmentBadge } from "../badges"
import {
  LuCopy,
  LuEyeOff,
  LuFilter,
  LuLock,
  LuTimerOff,
  LuXCircle,
} from "react-icons/lu"
import { cn, formatNumber, parseDateStr } from "@/utils"
import { LengthBadge } from "../badges/LengthBadge"
import type { Segment } from "./SegmentRow.types"
import { SegmentRowDropdown } from "./SegmentRowDropdown"

interface SegmentTableRowProps extends Segment {}

// TODO: add filter on row hover
export function SegmentTableRow(props: SegmentTableRowProps) {
  const { isoDate, readableDate } = parseDateStr(props.timeSubmitted)

  return (
    <tr
      className={cn(
        props.shadowHidden || props.hidden || props.votes <= -2
          ? "opacity-30 hover:opacity-100"
          : undefined,
      )}
    >
      <td>
        <time dateTime={isoDate} className="whitespace-nowrap">
          {readableDate}
        </time>
      </td>
      <td>
        <div className="inline-flex items-center gap-x-1">
          <span>{formatNumber(props.votes)}</span>
          {props.locked ? (
            <LuLock size={17} className="text-yellow-400" />
          ) : null}
        </div>
      </td>

      <td>
        <div className="inline-flex items-center gap-x-1">
          <span>
            {props.actionType === "full" ? "—" : formatNumber(props.views)}
          </span>
          {props.shadowHidden ? (
            <LuEyeOff size={17} className="text-red-500" />
          ) : null}
          {props.hidden ? (
            <LuTimerOff size={17} className="text-red-500" />
          ) : null}
          {props.votes <= -2 ? (
            <LuXCircle size={17} className="text-red-500" />
          ) : null}
        </div>
      </td>

      <td>
        <div className="flex items-center gap-x-0.5">
          <SegmentBadge
            segments={props.category as Category}
            chapterLabel={props.description}
            layout="desktop"
          />
          <button className="p-0.5">
            <LuFilter size={19} />
          </button>
        </div>
      </td>

      <td>
        <LengthBadge
          actionType={props.actionType}
          endTime={props.endTime}
          startTime={props.startTime}
        />
      </td>

      <td>
        <div className="flex items-center gap-x-0.5 max-w-48">
          <div className="truncate flex-1">
            <span>{props.userID}</span>
          </div>
          <button className="p-0.5">
            <LuFilter size={19} />
          </button>
          <button className="p-0.5">
            <LuCopy size={19} />
          </button>
        </div>
      </td>

      <td>
        <SegmentRowDropdown />
      </td>
    </tr>
  )
}
