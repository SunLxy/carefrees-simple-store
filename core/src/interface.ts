
import type { SimpleStore } from "./store"

export type PathTypes = number | string | (number | string)[]

export interface RegisterProps {
  path: PathTypes,
  update: Function
}
export interface SimpleStoreProviderProps<T extends {} = any> {
  simple?: SimpleStore
  children?: React.ReactNode
  initialValue?: T
}

export interface UseSimpleStoreItemProps {
  /**路径*/
  path: PathTypes
}