"use client"

import { createContext, useContext, useState } from "react"
import { noop } from "lodash-es"

type ViewType = "list" | "grid" | "compact"

interface ViewItemState {
  view: ViewType
  setView: React.Dispatch<React.SetStateAction<ViewType>>
}

const ViewStateContext = createContext<ViewItemState>({
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
  const [view, setView] = useState<ViewType>("grid")

  return (
    <ViewStateContext.Provider value={{ view, setView }}>
      {children}
    </ViewStateContext.Provider>
  )
}
