import type { VideoSegments } from "@/types"
import { SegmentTableRow } from "./SegmentTableRow"
import { SegmentRowMobile } from "./SegmentRowMobile"

interface SegmentTableProps extends Pick<VideoSegments, "segments"> {
  selectMode?: boolean
}

export function SegmentTable(props: SegmentTableProps) {
  return (
    <>
      <table className="hidden lg:table w-full *:[&_tr]:px-2 *:[&_tr]:py-2.5 [&_td]:border-b [&_td]:border-neutral-200 dark:[&_td]:border-neutral-700 text-base">
        <colgroup>
          <col style={{ width: "3.5%" }} />
          <col style={{ width: "3.5%" }} />
          <col style={{ width: "3.5%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "1%" }} />
        </colgroup>
        <thead className="*:text-left">
          <tr className="sticky top-28 z-20 bg-white dark:bg-neutral-950">
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
        <tbody>
          {props.segments.map((segment) => (
            <SegmentTableRow key={segment.UUID} {...segment} />
          ))}
        </tbody>
      </table>
      <div className="mt-3 block lg:hidden">
        {props.segments.map((segment) => (
          <SegmentRowMobile key={segment.UUID} {...segment} />
        ))}
      </div>
    </>
  )
}
