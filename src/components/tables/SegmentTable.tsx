import type { VideoSegments } from "@/types"
import { SegmentTableRow } from "./SegmentTableRow"

interface SegmentTableProps extends Pick<VideoSegments, "segments"> {
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
          <th>
            <span className="whitespace-nowrap">Date submitted</span>
          </th>
          <th>
            <span className="whitespace-nowrap">Votes</span>
          </th>
          <th>
            <span className="whitespace-nowrap">Views</span>
          </th>
          <th>
            <span className="whitespace-nowrap">Category</span>
          </th>
          <th>
            <span className="whitespace-nowrap">Length</span>
          </th>
          <th>
            <span className="whitespace-nowrap">Username/UserID</span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody className="hover:[&_tr]:bg-neutral-200 hover:[&_tr]:bg-opacity-70 ">
        {props.segments.map((segment) => (
          <SegmentTableRow key={segment.UUID} {...segment} />
        ))}
      </tbody>
    </table>
  )
}
