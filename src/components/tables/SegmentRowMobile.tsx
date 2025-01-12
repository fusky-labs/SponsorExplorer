import { formatNumber, parseDateStr } from "@/utils"
import type { Segment } from "./SegmentRow.types"
import {
  LuFastForward as SkipIcon,
  LuVolumeX as MuteIcon,
  LuSparkles as HighlightIcon,
  LuBookmark as ChapterIcon,
  LuVideo as FullIcon,
  LuLock,
} from "react-icons/lu"
import { SegmentBadge } from "../badges"
import { Category } from "@/utils/SponsorBlock.types"

interface SegmentRowMobileProps extends Segment {}

export function SegmentRowMobile(props: SegmentRowMobileProps) {
  const { isoDate, readableDate } = parseDateStr(props.timeSubmitted)

  return (
    <button className="relative flex items-center w-full gap-x-2 py-2.5 border-b border-neutral-300">
      <time
        className="hidden sm:block flex-1 w-1/6 text-left whitespace-nowrap"
        dateTime={isoDate}
      >
        {readableDate}
      </time>
      <div className="flex items-center space-x-2 w-2/6">
        <div>
          {props.actionType === "skip" ? <SkipIcon size={18} /> : null}
          {props.actionType === "mute" ? <MuteIcon size={18} /> : null}
          {props.actionType === "full" ? <FullIcon size={18} /> : null}
          {props.actionType === "poi" ? <HighlightIcon size={18} /> : null}
          {props.actionType === "chapter" ? <ChapterIcon size={18} /> : null}
        </div>
        <SegmentBadge
          segments={props.category as Category}
          chapterLabel={props.description}
          layout="mobile"
        />
      </div>
      <span className="flex-1 text-right">
        {formatNumber(props.votes)}
        {props.locked ? <LuLock size={17} className="text-yellow-400" /> : null}
      </span>
      <span className="flex-1 text-right [font-kerning:none]">
        {formatNumber(props.views)}
      </span>
    </button>
  )
}
