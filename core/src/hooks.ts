import { createContext, useRef, useContext, createElement, useState, useMemo } from "react"
import { SimpleStore } from "./store"
import { SimpleProviderProps, UseSimpleProps } from "./interface"

export const SimpleContext = createContext(new SimpleStore())

export const useSimpleStore = <T extends {} = any>(simple?: SimpleStore) => {
  const refs = useRef<SimpleStore>()
  if (!refs.current) {
    if (simple) {
      refs.current = simple
    } else {
      refs.current = new SimpleStore<T>()
    }
  }
  return [refs.current]
}

export const SimpleProvider = (props: SimpleProviderProps) => {

  const { simple, children } = props

  const [childSimple] = useSimpleStore(simple)

  return createElement(SimpleContext.Provider, {
    value: childSimple,
    children
  })
}


/**更新页面状态*/
export const useUpdate = () => {

  const [_, _update] = useState<number>(0)
  /**为了防止 hooks 闭包问题*/
  const refUpdate = useRef(_update)
  refUpdate.current = _update

  refUpdate.current = () => {
    _update(new Date().getTime())
  }

  return refUpdate
}

export const useSimple = (props: UseSimpleProps) => {
  const { path } = props
  const refUpdate = useUpdate()
  const simple = useContext(SimpleContext)

  /**更新组件方法注册*/
  useMemo(() => {
    simple.register(path, refUpdate.current)
  }, [path])

  return simple
}

