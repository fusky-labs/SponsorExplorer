import { VideoSegments } from "@/types"
import { Badge } from "./Badge"
import { formatTimecode } from "@/utils"

type LengthProps = Pick<
  VideoSegments["segments"][number],
  "actionType" | "startTime" | "endTime"
>

interface LengthBadgeProps extends LengthProps {}

export function LengthBadge(props: LengthBadgeProps) {
  return (
    <Badge className="whitespace-nowrap relative inline-flex items-center gap-x-1.5  py-0  rounded-2xl bg-gray-200">
      {props.actionType}
      <span className="text-sm">{formatTimecode(props.startTime)}</span>
      <span className="text-sm">{formatTimecode(props.endTime)}</span>
    </Badge>
  )
}
