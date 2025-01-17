"use client"

import type { ModalDialogTypes } from "./Modal.types"
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import { cn } from "@/utils"
import { LuX } from "react-icons/lu"
import { useVideoInfoContext } from "@/context"

interface DetailedSegmentStatsModalProps extends ModalDialogTypes {}

export function DetailedSegmentStatsModal(
  props: DetailedSegmentStatsModalProps,
) {
  const { videoDetails } = useVideoInfoContext()

  return (
    <Dialog open={props.open} onClose={props.onClose} className="relative z-50">
      {/* Backdrop */}
      <DialogBackdrop
        transition
        className="fixed bg-black/50 inset-0 flex w-screen items-center justify-center p-4 duration-100 ease-out data-[closed]:opacity-0"
        onClick={props.onClose as unknown as React.MouseEventHandler}
        aria-hidden
      />
      {/* Dialog contents */}
      <div className="fixed inset-0 grid place-items-center h-screen">
        <DialogPanel
          transition
          className={cn(
            "bg-white dark:bg-neutral-950 *:px-4 border-2 border-red-400 absolute w-full max-w-2xl transition ease-in-out rounded-xl",
            // Leave
            "duration-200 data-[closed]:translate-y-2 data-[closed]:opacity-0",
          )}
        >
          {/* Titlebar */}
          <div className="flex items-center gap-x-3.5 border-b py-3.5 border-b-neutral-300 dark:border-b-neutral-700">
            <DialogTitle className="sr-only text-xl font-bold flex-1 whitespace-nowrap">
              {"Detailed stats for "}
              <span translate="no">{videoDetails.video.title}</span>
            </DialogTitle>
            <div className="flex-shrink-0 overflow-hidden">
              <img
                className="aspect-video w-28 object-cover rounded-md"
                src={`https://i.ytimg.com/vi/${videoDetails.id}/hqdefault.jpg`}
              />
            </div>
            <div className="flex-1 space-y-1">
              <span className="opacity-75 font-normal">Detailed stats for</span>
              <div className="font-semibold text-lg leading-tight">
                {videoDetails.video.title}
              </div>
            </div>
            <button
              className="flex-shrink-0 p-2 hover:bg-neutral-200 rounded-md"
              onClick={props.onClose as unknown as React.MouseEventHandler}
            >
              <LuX size={18} />
            </button>
          </div>
          {/* Contents */}
          <div className="py-3.5">Contents</div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
