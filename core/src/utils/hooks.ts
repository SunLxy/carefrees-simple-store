import { useRef, useEffect, useReducer } from "react"
import {
  SelectorHookStore,
  TSelectorState
} from "../interface"
import { useSimple } from "./../hooks"

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

export const createSelectorHook = <T = any>() => {
  return function useSelector<TStore = T, Selected = any>(
    selector: (state: TSelectorState) => Selected,
    equalityFn?: (a: any, b: any) => boolean
  ): Selected {
    const simple = useSimple<TStore>()
    const refUpdate = useRef<(value: Selected) => void>()
    refUpdate.current = (value: Selected) => {
      dispatch({ data: value })
    }
    const [store, dispatch] = useSimplReducer<SelectorHookStore<Selected>>({
      ...simple.registerSelector(selector, refUpdate.current, equalityFn)
    })

    useEffect(() => {
      return () => store.unMount()
    }, [])

    return store.data
  }
}

export const useSelector = createSelectorHook()
