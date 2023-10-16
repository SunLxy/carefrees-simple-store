import { createContext, useRef, useContext, createElement, useState, useMemo, useEffect } from "react"
import { SimpleStore, MultipleSimpleStore } from "../store"
import {
  SimpleStoreProviderProps,
  PathTypes,
  UseSimpleItemProps,
  MultipleSimplProviderProps,
} from "../interface"

export const SimpleContext = createContext(new SimpleStore())
export const MultipleSimpleContext = createContext(new MultipleSimpleStore())

/**声明状态管理实例*/
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

/**声明状态管理收集实例*/
export const useMultipleSimpleStore = (multipleSimple?: MultipleSimpleStore) => {
  const refs = useRef<MultipleSimpleStore>()
  if (!refs.current) {
    if (multipleSimple) {
      refs.current = multipleSimple
    } else {
      refs.current = new MultipleSimpleStore()
    }
  }
  return [refs.current]
}

/**状态管理包裹组件*/
export const SimpleStoreProvider = <T extends {} = any>(props: SimpleStoreProviderProps<T>) => {
  const { simple, children, initialValue, path } = props
  const [childSimple] = useSimpleStore<T>(simple)
  const multipleSimple = useMultipleSimple()

  useMemo(() => {
    if (initialValue) {
      childSimple.init(initialValue)
    }
  }, [])

  useEffect(() => {
    let unRegister: () => void = () => void 0;
    if (path) {
      unRegister = multipleSimple.register(path, childSimple)
    }
    return () => unRegister?.()
  }, [path])

  return createElement(SimpleContext.Provider, {
    value: childSimple,
    children
  })
}

/**状态管理收集包裹组件*/
export const MultipleSimplProvider = (props: MultipleSimplProviderProps) => {

  const { multipleSimple, children, } = props

  const [newMultipleSimple] = useMultipleSimpleStore(multipleSimple)

  return createElement(MultipleSimpleContext.Provider, {
    value: newMultipleSimple,
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
/**获取状态管理实例*/
export const useSimple = <T extends {} = any>() => useContext<SimpleStore<T>>(SimpleContext)
/**获取状态管理收集实例*/
export const useMultipleSimple = () => useContext<MultipleSimpleStore>(MultipleSimpleContext)

/**子组件注册*/
export const useSimpleStoreItem = <T extends {} = any>(props: UseSimpleItemProps) => {
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
/**子组件注册*/
export const useSimpleItem = useSimpleStoreItem

/**监听字段值*/
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