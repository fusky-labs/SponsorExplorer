"use client"

import { cn } from "@/utils"
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import { LuX } from "react-icons/lu"

interface ModalProps {
  open?: boolean
  onClose: (v: boolean) => void
  title: string
  description?: string
}

export function Modal(props: React.PropsWithChildren<ModalProps>) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      className="relative z-50"
      transition
    >
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
            "space-y-4 bg-white p-4 border-2 border-red-400 absolute w-fit max-w-lg transition ease-in-out rounded-xl",
            // Leave
            "duration-200 data-[closed]:translate-y-2 data-[closed]:opacity-0",
          )}
        >
          {/* Titlebar */}
          <div className="flex items-center">
            <DialogTitle className="text-xl font-bold flex-1 whitespace-nowrap">
              {props.title}
            </DialogTitle>
            <button
              className="flex-shrink-0"
              onClick={props.onClose as unknown as React.MouseEventHandler}
            >
              <LuX size={18} />
            </button>
          </div>
          <div id="dialog-content">{props.children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
