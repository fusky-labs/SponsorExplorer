"use client"

import {
  LuChevronDown,
  LuFilter,
  LuHelpCircle,
  LuMoreVertical,
  LuRotateCw,
} from "react-icons/lu"

export function SegmentFilterBar() {
  return (
    <div className="w-full flex items-center border border-neutral-300 py-2 px-2.5 rounded-md">
      <button className="inline-flex items-center gap-x-2">
        <LuFilter size={19} />
        <span>Filters</span>
      </button>

      <button className="ml-auto">
        <LuChevronDown size={19} />
      </button>
    </div>
  )
}
