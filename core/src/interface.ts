
import type { SimpleStore } from "./store"

export type PathTypes = number | string | (number | string)[]

export interface RegisterProps {
  path: PathTypes,
  update: Function
}
export interface SimpleProviderProps {
  simple?: SimpleStore
  children?: React.ReactNode
}

export interface UseSimpleProps {
  /**路径*/
  path: PathTypes
}