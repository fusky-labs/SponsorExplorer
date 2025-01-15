"use client"

import { createContext, useContext, useState } from "react"
import { noop } from "lodash-es"
import type { MapUseStateSetters } from "./context.types"

type ViewType = "list" | "grid" | "compact"

export interface ViewItemContext {
  view: ViewType
}

type ViewItemContextType = MapUseStateSetters<ViewItemContext>

const ViewItemContext = createContext<ViewItemContextType>({
  view: "grid",
  setView: noop,
})

export const useViewItemStateContext = () => {
  const context = useContext(ViewItemContext)

  if (!context) {
    throw new Error(
      "useViewItemStateContext must be used within a ViewItemProvider",
    )
  }

  return context
}

export function ViewItemProvider({
  children,
  initialView = "grid",
}: Readonly<{
  children: React.ReactNode
  initialView: ViewItemContextType["view"]
}>) {
  const [view, setView] = useState<ViewItemContextType["view"]>(initialView)

  return (
    <ViewItemContext.Provider value={{ view, setView }}>
      {children}
    </ViewItemContext.Provider>
  )
}
