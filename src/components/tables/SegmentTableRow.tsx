import { Category } from "@/utils/SponsorBlock.types"
import { SegmentBadge } from "../badges"
import {
  LuEyeOff,
  LuLock,
  LuMoreVertical,
  LuTimerOff,
  LuXCircle,
} from "react-icons/lu"
import { cn, formatNumber, parseDateStr } from "@/utils"
import { LengthBadge } from "../badges/LengthBadge"
import type { Segment } from "./SegmentRow.types"

interface SegmentTableRowProps extends Segment {}

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
          {props.actionType === "full" ? (
            <span>—</span>
          ) : (
            <span>{formatNumber(props.views)}</span>
          )}
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
        <SegmentBadge
          segments={props.category as Category}
          chapterLabel={props.description}
          layout="desktop"
        />
      </td>
      <td>
        <div className="flex items-center">
          <LengthBadge
            actionType={props.actionType}
            endTime={props.endTime}
            startTime={props.startTime}
          />
        </div>
      </td>
      <td>{props.userID.slice(0, 12)}</td>
      <td>
        <div className="grid place-items-center">
          <button>
            <LuMoreVertical size={19} />
          </button>
        </div>
      </td>
    </tr>
  )
}
