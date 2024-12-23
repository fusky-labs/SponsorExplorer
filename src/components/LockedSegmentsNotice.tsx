import { cn } from "@/utils"
import { LuLock } from "react-icons/lu"

interface LockedSegmentsNoticeProps {
  reason: string | null
}

export function LockedSegmentsNotice(props: LockedSegmentsNoticeProps) {
  return (
    <div className="border-2 border-red-400 px-3.5 py-2.5 rounded-md block text-left w-full">
      <div className="flex items-center">
        <LuLock size={20} className="flex-shrink-0" />
        <article className="ml-2.5">
          <h2 className="font-semibold text-base">
            Categories for this video have been locked
          </h2>
          <p className={cn("mt-0.5", !props.reason && "italic opacity-65")}>
            {props.reason ? (
              <>
                <span className="font-semibold">{"Reason: "}</span>
                {props.reason}
              </>
            ) : (
              "No reason provided."
            )}
          </p>
        </article>
      </div>
    </div>
  )
}
