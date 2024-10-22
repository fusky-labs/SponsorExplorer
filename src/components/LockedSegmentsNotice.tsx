import { LuLock } from "react-icons/lu"

interface LockedSegmentsNoticeProps {
  lockedSegments?: unknown
}

export function LockedSegmentsNotice(props: LockedSegmentsNoticeProps) {
  return (
    <button className="bg-orange-200 px-3.5 py-2.5 rounded-md block text-left w-full">
      <div className="flex items-center">
        <LuLock size={20} />
        <article className="ml-2.5">
          <h2 className="font-semibold text-base">
            All submissions for this video has been locked
          </h2>
          <p className="mt-0.5 italic">No reason provided.</p>
        </article>
      </div>
    </button>
  )
}
