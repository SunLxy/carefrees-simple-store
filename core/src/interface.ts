
import type { SimpleStore } from "./store"

export type PathTypes = number | string | (number | string)[]

export interface SimpleProviderProps {
  simple?: SimpleStore
  children?: React.ReactNode
}
