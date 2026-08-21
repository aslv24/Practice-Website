"use client"

import { ModuleProvider } from "@/context/ModuleContext"

/**
 * Client-side providers wrapper
 * Wraps the application with all necessary context providers
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <ModuleProvider>{children}</ModuleProvider>
}
