"use client"

import { Dialog, DialogPanel } from "@headlessui/react"
import type { NavbarDialogTypes } from "../base/Navbar.types"

interface NavbarSearchProps extends NavbarDialogTypes {}

export function NavbarSearchModal(props: NavbarSearchProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogPanel>Yesh</DialogPanel>
    </Dialog>
  )
}
