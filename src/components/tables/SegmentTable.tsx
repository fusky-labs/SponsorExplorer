import { Category } from "@/utils/SponsorBlock.types"
import { SegmentBadge } from "../badges"
import {
  LuEyeOff,
  LuLock,
  LuMoreVertical,
  LuTimerOff,
  LuXCircle,
} from "react-icons/lu"
import type { VideoSegments } from "@/types"
import { cn, formatNumber } from "@/utils"

interface SegmentTableProps
  extends Omit<VideoSegments, "lock" | "submissionCount"> {
  selectMode?: boolean
}

export function SegmentTable(props: SegmentTableProps) {
  return (
    <table className="w-full *:[&_tr]:px-2 *:[&_tr]:py-2.5 [&_td]:border-b [&_td]:border-neutral-200 text-base">
      <colgroup>
        <col style={{ width: "8%" }} />
        <col style={{ width: "4%" }} />
        <col style={{ width: "4%" }} />
        <col style={{ width: "12%" }} />
        <col style={{ width: "12%" }} />
        <col style={{ width: "12%" }} />
        <col style={{ width: "1%" }} />
      </colgroup>
      <thead className="*:text-left">
        <tr className="sticky top-28 z-20 bg-white">
          <th>Date submitted</th>
          <th>Votes</th>
          <th>Views</th>
          <th>Category</th>
          <th>Length</th>
          <th>
            <span className="whitespace-nowrap">Username/User ID</span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody className="hover:[&_tr]:bg-neutral-200 hover:[&_tr]:bg-opacity-70 ">
        {props.segments.map((x) => (
          <tr
            key={x.UUID}
            data-initial-fragment-request=""
            className={cn(
              x.shadowHidden || x.hidden || x.votes <= -2
                ? "opacity-30 hover:opacity-100"
                : undefined
            )}
          >
            <td>{new Date(x.timeSubmitted).toISOString()}</td>
            <td>
              <div className="inline-flex items-center gap-x-1">
                <span>{formatNumber(x.votes)}</span>
                {x.locked ? (
                  <LuLock size={17} className="text-yellow-400" />
                ) : null}
              </div>
            </td>
            <td>
              <div className="inline-flex items-center gap-x-1">
                <span>{formatNumber(x.views)}</span>
                {x.shadowHidden ? (
                  <LuEyeOff size={17} className="text-red-500" />
                ) : null}
                {x.hidden ? (
                  <LuTimerOff size={17} className="text-red-500" />
                ) : null}
                {x.votes <= -2 ? (
                  <LuXCircle size={17} className="text-red-500" />
                ) : null}
              </div>
            </td>
            <td>
              <SegmentBadge
                segments={x.category as Category}
                chapterLabel={x.description}
              />
            </td>
            <td>
              {x.actionType}
              {x.startTime}
              {x.endTime}
            </td>
            <td>{x.userID.slice(0, 8)}</td>
            <td>
              <button>
                <LuMoreVertical size={19} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
