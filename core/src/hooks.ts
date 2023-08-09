import { createContext, useRef, useContext, createElement, useState, useMemo, useEffect } from "react"
import { SimpleStore } from "./store"
import { SimpleStoreProviderProps, UseSimpleStoreItemProps, PathTypes } from "./interface"

export const SimpleContext = createContext(new SimpleStore())

export const useSimpleStore = <T extends {} = any>(simple?: SimpleStore) => {
  const refs = useRef<SimpleStore<T>>()
  if (!refs.current) {
    if (simple) {
      refs.current = simple
    } else {
      refs.current = new SimpleStore<T>()
    }
  }
  return [refs.current]
}

export const SimpleStoreProvider = <T extends {} = any>(props: SimpleStoreProviderProps<T>) => {

  const { simple, children, initialValue } = props

  const [childSimple] = useSimpleStore<T>(simple)

  useMemo(() => {
    if (initialValue) {
      childSimple.init(initialValue)
    }
  }, [])

  return createElement(SimpleContext.Provider, {
    value: childSimple,
    children
  })
}


/**更新页面状态*/
export const useUpdate = () => {

  const [_, _update] = useState<number>(0)
  /**为了防止 hooks 闭包问题*/
  const refUpdate = useRef<Function>()

  refUpdate.current = () => {
    _update(new Date().getTime())
  }

  return refUpdate
}

export const useSimple = <T extends {} = any>() => useContext<SimpleStore<T>>(SimpleContext)

export const useSimpleStoreItem = <T extends {} = any>(props: UseSimpleStoreItemProps) => {
  const { path } = props
  const refUpdate = useUpdate()
  const simple = useContext<SimpleStore<T>>(SimpleContext)

  /**更新组件方法注册*/
  useEffect(() => {
    const unRegister = simple.register({
      path,
      update: refUpdate.current
    })
    return () => unRegister()
  }, [JSON.stringify(path)])

  return simple
}

export const useSimpleWatch = <T extends {} = any>(simple: SimpleStore<T>, path: PathTypes, fun?: (value: any) => void) => {

  const refValue = useRef<any>()
  const ref = useRef<(value: any) => void>(() => void 0)

  const refUpdate = useUpdate()

  ref.current = (value: any) => {
    refValue.current = value;
    if (typeof fun === "function") {
      fun(value)
    } else {
      refUpdate.current()
    }
  }

  useEffect(() => {
    const unRegister = simple.registerWatch({
      path,
      update: ref.current
    })
    return () => unRegister()
  }, [JSON.stringify(path)])

  return refValue.current
}