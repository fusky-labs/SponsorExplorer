"use client"

import { createContext, useContext, useState } from "react"
import { noop } from "lodash-es"
import type { MapUseStateSetters } from "./context.types"

type ViewType = "list" | "grid" | "compact"

type ViewStateContextType = MapUseStateSetters<{
  view: ViewType | null
}>

const ViewStateContext = createContext<ViewStateContextType>({
  view: "grid",
  setView: noop,
})

export const useViewStateContext = () => {
  const context = useContext(ViewStateContext)

  if (!context) {
    throw new Error(
      "useViewStateContext must be used within a ViewStateProvider",
    )
  }

  return context
}

export function ViewStateProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [view, setView] = useState<ViewStateContextType["view"]>(null)

  return (
    <ViewStateContext.Provider value={{ view, setView }}>
      {children}
    </ViewStateContext.Provider>
  )
}
