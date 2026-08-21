import { useContext } from "react"

import { ModuleContext, ModuleContextType } from "@/context/ModuleContext"

/**
 * Custom hook to access the ModuleContext
 * Must be used within a ModuleProvider
 *
 * @throws Error if used outside of ModuleProvider
 * @returns ModuleContextType with all context methods and state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { userPreferences, setSearchQuery } = useModuleContext()
 *   // Use context state and methods
 * }
 * ```
 */
export function useModuleContext(): ModuleContextType {
  const context = useContext(ModuleContext)

  if (!context) {
    throw new Error(
      "useModuleContext must be used within a ModuleProvider. " +
      "Make sure ModuleProvider wraps your component tree."
    )
  }

  return context
}
