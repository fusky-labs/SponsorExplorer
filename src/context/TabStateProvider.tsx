"use client"

import { createContext, useContext, useState } from "react"
import { noop } from "lodash-es"
import type { MapUseStateSetters } from "./context.types"

type TabStateContextType = MapUseStateSetters<{
  activeTab: string
}>

const TabStateContext = createContext<TabStateContextType>({
  activeTab: "",
  setActiveTab: noop,
})

export const useTabStateContext = () => {
  const context = useContext(TabStateContext)

  if (!context) {
    throw new Error("useTabStateContext must be used within a TabStateProvider")
  }

  return context
}

export function TabStateProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [activeTab, setActiveTab] = useState("")

  return (
    <TabStateContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabStateContext.Provider>
  )
}
