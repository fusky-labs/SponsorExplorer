"use client"

import { useState, useEffect, useRef } from "react"
import type { Category } from "@/utils/SponsorBlock.types"
import { SegmentBadge } from "../Badges"
import {
  LuCopy,
  LuEyeOff,
  LuFilter,
  LuLock,
  LuTimerOff,
  LuXCircle,
} from "react-icons/lu"
import { cn, formatNumber, parseDateStr } from "@/utils"
import { sbCategoryMap } from "@/utils/constants"
import { LengthBadge } from "../Badges/LengthBadge"
import type { Segment } from "./SegmentRow.types"
import { SegmentRowDropdown } from "./SegmentRowDropdown"

interface SegmentTableRowProps extends Segment {}

export function SegmentTableRow(props: SegmentTableRowProps) {
  const { isoDate, readableDate } = parseDateStr(props.timeSubmitted)

  const [isHovering, setHoverState] = useState(false)
  const tableRowRef = useRef<React.ComponentRef<"tr">>(null)

  useEffect(() => {
    const tableRow = tableRowRef.current!

    const handleRowEnter = () => setHoverState(true)
    const handleRowLeave = () => setHoverState(false)

    tableRow.addEventListener("mouseenter", handleRowEnter)

    tableRow.addEventListener("mouseleave", handleRowLeave)
    tableRow.addEventListener("blur", handleRowLeave)

    return () => {
      tableRow.removeEventListener("mouseenter", handleRowEnter)
      tableRow.removeEventListener("mouseleave", handleRowLeave)

      tableRow.removeEventListener("blur", handleRowLeave)
    }
  }, [])

  return (
    <tr
      ref={tableRowRef}
      className={cn(
        props.shadowHidden || props.hidden || props.votes <= -2
          ? "opacity-50 hover:opacity-100"
          : undefined,
        "hover:bg-neutral-300/40",
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
          <div className={isHovering ? "contents" : "invisible"}>
            <button
              className="p-0.5"
              title={`Filter out the ${sbCategoryMap[props.category].label} category (Alt+Click to negate)`}
            >
              <LuFilter size={19} />
            </button>
          </div>
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
          <div className={isHovering ? "contents" : "invisible"}>
            <button className="p-0.5">
              <LuFilter size={19} />
            </button>
            <button className="p-0.5">
              <LuCopy size={19} />
            </button>
          </div>
        </div>
      </td>

      <td>
        <div className={isHovering ? undefined : "invisible"}>
          <SegmentRowDropdown />
        </div>
      </td>
    </tr>
  )
}
