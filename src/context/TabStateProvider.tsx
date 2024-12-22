"use client"

import { createContext, useContext, useState } from "react"
import { noop } from "lodash-es"

interface TabState {
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const TabStateContext = createContext<TabState>({
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
