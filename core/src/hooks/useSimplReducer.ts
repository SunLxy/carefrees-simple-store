import { useReducer } from "react"

export type ReducerType<T extends {} = any> = [Partial<T>, React.Dispatch<Partial<T>>]

const reducers = <T extends {}>(preState: Partial<T>, nextState: Partial<T>) => {
  return { ...preState, ...nextState }
}
/** 简化使用 react 中的 useReducer */
export const useSimplReducer = <T extends {}>(
  initalValue: Partial<T> = {},
  newReducer: typeof reducers = reducers
): ReducerType<T> => {
  const [store, dispatch] = useReducer(newReducer<T>, initalValue)
  return [store, dispatch]
}
