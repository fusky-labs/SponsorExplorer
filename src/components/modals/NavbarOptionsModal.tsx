"use client"

import type { NavbarDialogTypes } from "../base/Navbar.types"
import { Modal } from "./Modal"

interface NavbarOptionsProps extends NavbarDialogTypes {}

export function NavbarOptionsModal(props: NavbarOptionsProps) {
  return (
    <Modal open={props.open} onClose={props.onClose} title="Options">
      <div>
        <strong>Server</strong>
      </div>
    </Modal>
  )
}
