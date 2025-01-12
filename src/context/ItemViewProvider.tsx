"use client"

import { createContext, useContext, useState } from "react"
import { noop } from "lodash-es"
import type { MapUseStateSetters } from "./context.types"

type ViewType = "list" | "grid" | "compact"

export interface ViewStateContext {
  view: ViewType
}

type ViewStateContextType = MapUseStateSetters<ViewStateContext>

const ViewStateContext = createContext<ViewStateContextType>({
  view: "grid",
  setView: noop,
})

export const useViewItemStateContext = () => {
  const context = useContext(ViewStateContext)

  if (!context) {
    throw new Error(
      "useViewItemStateContext must be used within a ViewStateProvider",
    )
  }

  return context
}

export function ViewStateProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [view, setView] = useState<ViewStateContextType["view"]>("grid")

  return (
    <ViewStateContext.Provider value={{ view, setView }}>
      {children}
    </ViewStateContext.Provider>
  )
}
