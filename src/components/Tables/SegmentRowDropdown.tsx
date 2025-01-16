"use client"

import {
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
} from "@headlessui/react"
import type { IconType } from "react-icons"
import { LuCopy, LuMoreVertical, LuScanLine } from "react-icons/lu"

function TmpButtonItem(props: { text: string; icon?: IconType }) {
  const Icon = props.icon!

  return (
    <MenuItem
      as="button"
      className="px-3.5 py-1.5 text-left rounded-md flex gap-x-2 data-[focus]:bg-neutral-200 dark:data-[focus]:bg-neutral-900"
    >
      <span className="flex-1">{props.text}</span>
      {Icon ? <Icon size={19} /> : null}
    </MenuItem>
  )
}

export function SegmentRowDropdown() {
  return (
    <Menu>
      <div className="grid place-items-center">
        <MenuButton>
          <LuMoreVertical size={19} />
        </MenuButton>
      </div>
      <MenuItems
        anchor="bottom end"
        transition
        modal={false}
        className="bg-white dark:bg-neutral-950 shadow-md p-2 rounded-md transition duration-100 ease-in-out data-[closed]:opacity-0 grid"
      >
        <MenuSection className="contents">
          <TmpButtonItem text="Inspect..." icon={LuScanLine} />
        </MenuSection>
        <MenuSection className="contents">
          <MenuHeading className="px-3 pb-1.5 pt-2 opacity-65 text-sm">
            Copy...
          </MenuHeading>
          <TmpButtonItem text="Segment UUID" icon={LuCopy} />
          <TmpButtonItem text="Username" />
          <TmpButtonItem text="User ID" />
        </MenuSection>
      </MenuItems>
    </Menu>
  )
}
