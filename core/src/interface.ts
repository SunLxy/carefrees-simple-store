
import type { SimpleStore, MultipleSimpleStore } from "./store"

export type IntType = string | number | boolean

export type PathTypes = number | string | (number | string)[]

export interface RegisterProps {
  path: PathTypes,
  update: Function
  /**是否保存*/
  preserve?: boolean
}

export interface RegisterWatchProps {
  path: PathTypes,
  update: (value: any) => void
}

export interface SimpleStoreProviderProps<T extends {} = any> {
  simple?: SimpleStore
  children?: React.ReactNode
  initialValue?: T
  path?: string
}

export interface UseSimpleStoreItemProps {
  /**路径*/
  path: PathTypes
}

export interface UseSimpleItemProps extends UseSimpleStoreItemProps {

}

export interface MultipleSimplProviderProps {
  multipleSimple?: MultipleSimpleStore
  children?: React.ReactNode
}



export interface SelectorFn {
  <TState = unknown, Selected = unknown>(
    selector: (state: TState) => Selected,
  ): Selected
}

export interface TSelectorState<T = any> {
  store: T,
  simple: SimpleStore
}

export interface SelectorHookStore<Selected = unknown> {
  data: Selected,
  unMount: () => void
}

export interface SelectorListItemType<TState = unknown, Selected = unknown, T = any> {
  preValue: TState
  updateData: (value: Selected) => void
  selector: (value: TSelectorState<T>) => Selected,
  equalityFn?: (a: TState, b: TState) => boolean
}