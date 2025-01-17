"use client"

import { Dialog, DialogPanel } from "@headlessui/react"
import type { ModalDialogTypes } from "./Modal.types"

interface NavbarSearchProps extends ModalDialogTypes {}

export function NavbarSearchModal(props: NavbarSearchProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogPanel>Yesh</DialogPanel>
    </Dialog>
  )
}
