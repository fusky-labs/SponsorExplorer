"use client"

import type { ModalDialogTypes } from "./Modal.types"
import { Modal } from "./Modal"

interface DetailedStatsModalProps extends ModalDialogTypes {}

export function DetailedStatsModal(props: DetailedStatsModalProps) {
  return (
    <Modal open={props.open} onClose={props.onClose} title="Detailed stats">
      Example modal
    </Modal>
  )
}
