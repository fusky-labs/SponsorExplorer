"use client"

import { useState } from "react"
import { LuBookmark, LuSearch, LuSettings, LuMenu } from "react-icons/lu"
import { _Link as Link } from "../Link"
import { NavbarOptionsModal, NavbarSearchModal } from "../modals"

export function Navbar() {
  const [searchToggle, setSearchDialogToggle] = useState(false)
  const [optionsToggle, setOptionDialogToggle] = useState(false)

  const toggleOptionDialog = () => setOptionDialogToggle(!optionsToggle)
  const toggleSearchDialog = () => setSearchDialogToggle(!searchToggle)

  return (
    <>
      <div className="z-50 sticky top-0 backdrop-blur-md bg-opacity-75 bg-white">
        <nav className="flex px-6 py-3 gap-x-3.5">
          <button
            className="p-2 opacity-65 block lg:hidden"
            aria-label="Toggle menu"
          >
            <LuMenu size={20} />
          </button>
          <div className="flex-1 inline-flex items-center">
            <div className="flex items-center select-none">
              <Link
                href="/"
                className="no-underline font-extrabold text-xl"
                translate="no"
              >
                SponsorExplorer
              </Link>
            </div>
            <div className="flex-1 lg:flex hidden items-center gap-x-3 text-base ">
              <button>Open playlist shelf</button>
            </div>
          </div>

          <div className="flex gap-x-1">
            <button
              className="px-2 py-1 w-60 gap-x-1.5 rounded-md lg:block hidden border-2 border-red-200"
              onClick={toggleSearchDialog}
              aria-labelledby="search-label"
            >
              <div className="flex">
                <LuSearch size={19} className="opacity-65" />
                <span id="search-label" className="opacity-50 ml-1">
                  Search
                </span>
              </div>
            </button>
            <button
              className="p-2 opacity-65 hover:opacity-100 block lg:hidden"
              onClick={toggleSearchDialog}
              aria-label="Search"
            >
              <LuSearch size={20} />
            </button>
            <button className="p-2 opacity-65 hover:opacity-100 hidden lg:block">
              <LuBookmark size={20} />
            </button>
            <button
              className="p-2 opacity-65 hover:opacity-100 hidden lg:block"
              onClick={toggleOptionDialog}
            >
              <LuSettings size={20} />
            </button>
          </div>
        </nav>
      </div>
      {/* Modals */}
      <NavbarOptionsModal open={optionsToggle} onClose={toggleOptionDialog} />
      <NavbarSearchModal open={searchToggle} onClose={toggleSearchDialog} />
    </>
  )
}
