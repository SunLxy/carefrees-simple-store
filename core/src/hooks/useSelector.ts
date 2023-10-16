import { useRef, useEffect, } from "react"
import {
  SelectorHookStore,
  TSelectorState
} from "../interface"
import { useSimple } from "./simple"
import { useSimplReducer } from "./useSimplReducer"

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
