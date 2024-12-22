import { VideoSegments } from "@/types"
import { formatTimecode } from "@/utils"
import {
  LuFastForward as SkipIcon,
  LuVolumeX as MuteIcon,
  LuSparkles as HighlightIcon,
  LuBookmark as ChapterIcon,
  LuVideo as FullIcon,
} from "react-icons/lu"

type LengthProps = Pick<
  VideoSegments["segments"][number],
  "actionType" | "startTime" | "endTime"
>

interface LengthBadgeProps extends LengthProps {}

export function LengthBadge(props: LengthBadgeProps) {
  const timecodeOptions = {
    includeMilliseconds: true,
    msRoundFactor: 3,
  } satisfies Parameters<typeof formatTimecode>[1]

  return (
    <span className="whitespace-nowrap inline-flex items-center gap-x-1.5">
      <div>
        {props.actionType === "skip" ? <SkipIcon size={19} /> : null}
        {props.actionType === "mute" ? <MuteIcon size={19} /> : null}
        {props.actionType === "full" ? <FullIcon size={19} /> : null}
        {props.actionType === "poi" ? <HighlightIcon size={19} /> : null}
        {props.actionType === "chapter" ? <ChapterIcon size={19} /> : null}
      </div>
      {props.actionType === "full" ? (
        <span>Full video label</span>
      ) : (
        <div>
          <span>{formatTimecode(props.startTime, timecodeOptions)}</span>
          <span className="text-gray-400">{" – "}</span>
          <span>{formatTimecode(props.endTime, timecodeOptions)}</span>
        </div>
      )}
    </span>
  )
}
