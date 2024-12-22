"use client"

import { useId } from "react"
import type { NavbarDialogTypes } from "../base/Navbar.types"
import { Modal } from "./Modal"

interface NavbarOptionsProps extends NavbarDialogTypes {}

function OptionItem(props: { label: string; description: string }) {
  const id = useId()

  const optionTitleA11y = `option-title-${id}`
  const optionDescriptionA11y = `option-description-${id}`

  return (
    <li
      className="grid grid-cols-[1fr,auto] grid-rows-[auto,auto] gap-y-1"
      aria-labelledby={optionTitleA11y}
      aria-describedby={optionDescriptionA11y}
    >
      <div
        className="col-span-1 font-semibold text-lg whitespace-nowrap"
        id={`#${optionTitleA11y}`}
      >
        {props.label}
      </div>
      <span className="row-start-2" id={`#${optionDescriptionA11y}`}>
        {props.description}
      </span>
      <div className="row-span-2 flex items-center">
        <input type="checkbox" />
      </div>
    </li>
  )
}

export function NavbarOptionsModal(props: NavbarOptionsProps) {
  return (
    <Modal open={props.open} onClose={props.onClose} title="Options">
      <div className="space-y-5 prose-h2:opacity-65 prose-h2:font-bold prose-h2:mb-1 [&_ul]:space-y-2">
        {/* Server section */}
        <section>
          <h2>Server</h2>
          <ul>
            <OptionItem
              label="Fallback servers"
              description="If you self-host your own SponsorBlock servers, you can punch them here"
            />
          </ul>
        </section>
        {/* Playback */}
        <section>
          <h2>Player</h2>
          <ul>
            <OptionItem
              label="Enable YouTube iframe"
              description="Disabling this will prevent the player from loading the video and will only show the thumbnail"
            />
            <OptionItem
              label="Expose keyboard controls"
              description="Enable keyboard shortcuts as you would in regular YouTube"
            />
          </ul>
        </section>
        {/* Caching */}
        <section>
          <h2>Caching</h2>
          <ul>
            <OptionItem
              label="Cache results through localStorage"
              description=""
            />
          </ul>
        </section>
        {/* Danger Zone */}
        <section>
          <h2>Danger zone</h2>
          <ul>
            <OptionItem
              label="Reset cache"
              description="Cleans out stale segment cache from localStorage"
            />
            <OptionItem
              label="Reset all"
              description="Cleans out and reverts everything to default"
            />
          </ul>
        </section>
      </div>
    </Modal>
  )
}
