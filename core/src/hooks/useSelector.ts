import { useRef, useEffect, useState, } from "react"
import { TSelectorState } from "../interface"
import { useSimple } from "./simple"
import { isEqual } from "./../utils"

export const createSelectorHook = <T = any>() => {

  return function useSelector<TStore = T, Selected = any>(
    selector: (state: TSelectorState) => Selected,
    equalityFn: (a: any, b: any) => boolean = isEqual
  ): Selected {
    const simple = useSimple<TStore>()
    const [, _update] = useState({})
    const refUpdate = useRef<(value: Selected) => void>();
    /**为了解决闭包照成的值不是最新问题*/
    const refSelector = useRef(selector)
    refSelector.current = selector
    /**key值*/
    const refKey = useRef({})
    refUpdate.current = () => _update({})
    const storeRef = useRef(simple.registerSelector(refKey.current, refSelector.current, refUpdate.current, equalityFn))

    useEffect(() => {
      return () => storeRef.current.unMount()
    }, [refKey.current])

    return simple.getSelectorValue(refKey.current) as Selected
  }
}

export const useSelector = createSelectorHook()
