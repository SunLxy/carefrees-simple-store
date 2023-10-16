import { getFormatPath, toArray, splitPath, getValue, setValue, merge } from "./utils"
import { PathTypes, RegisterProps, RegisterWatchProps, SelectorListItemType } from "./interface"

/**状态存储*/
export class SimpleStore<T extends {} = any> {

  /**值存储*/
  store: T = {} as T;

  private initialValue: T = {} as T;

  /**组件更新方法集合*/
  componentList: RegisterProps[] = []

  /**监听字段值变化*/
  watchList: RegisterWatchProps[] = []

  /**选择函数*/
  selectorList: SelectorListItemType[] = []
  selectorMap: Map<Object, SelectorListItemType> = new Map([])

  /**设置初始值*/
  init = (initialValue?: T) => {
    this.initialValue = (initialValue || {}) as T
    this.store = merge(this.initialValue, this.store)
  }

  /**注册组件更新方法*/
  register = (props: RegisterProps) => {
    this.componentList.push(props)
    return () => {
      this.componentList = this.componentList.filter((ite) => ite !== props)
      const { preserve = true } = props
      const currentPath = getFormatPath(props.path)
      /**查询是否存在相同字段的组件*/
      const finx = this.componentList.find((item) => getFormatPath(item.path) === currentPath)
      /**当不存储 并且 没有相同字段组件的时候*/
      if (!preserve && !finx) {
        /**
        * 1. 通过参数控制卸载组件是否进行初始化参数
        * 2. 判断当前组件是否已经不存在，不存在则进行初始化
        * 3. 当前值和默认值相等的时候
        * */
        const pathArr = toArray(props.path)
        const defaultValue = getValue(this.initialValue, pathArr)
        const value = getValue(this.store, pathArr)
        if (defaultValue !== value) {
          this.store = setValue(this.store, pathArr, defaultValue)
        }
      }
    }
  }

  /**注册监听字段*/
  registerWatch = (props: RegisterWatchProps) => {
    this.watchList.push(props)
    return () => {
      this.watchList = this.watchList.filter((ite) => ite !== props)
    }
  }

  /**更新值*/
  updateValue = <K = any>(path: PathTypes, value: K, notice: boolean | string[] = true) => {
    const preVaue = getValue(this.store, toArray(path));
    this.store = setValue(this.store, toArray(path), value);
    /**判断值相等 , 当相等的时候才进行更新监听的值*/
    if (preVaue !== value)
      this.noticeWatch(path);

    if (typeof notice === "boolean" && notice) {
      this.notice(path)
    } else if (Array.isArray(notice)) {
      this.bathNotice(notice)
    }
  }

  /**批量数据更新*/
  bathUpdateValue = (values: Record<string, any>, notice: boolean | string[] = true) => {
    if (values) {
      Object.entries(values).forEach(([path, value]) => {
        this.store = setValue(this.store, splitPath(path), value)
      })
      if (typeof notice === "boolean" && notice) {
        this.bathNotice(Object.keys(values))
      } else if (Array.isArray(notice)) {
        this.bathNotice(notice)
      }
    }
  }

  /**获取值*/
  getValue = (path?: PathTypes) => {
    if (path) {
      return getValue(this.store, toArray(path))
    }
    return this.store
  }

  /**通知组件更新*/
  notice = (path: PathTypes) => {
    const newPath = getFormatPath(path)
    const componentList = this.componentList.filter((item) => getFormatPath(item.path) === newPath)
    componentList.forEach((component) => {
      /**通知更新组件*/
      if (component && typeof component.update === "function") {
        component.update()
      }
    })
  }

  /**
   * 批量更新组件， 
   * 
   * 当不传递值的时候，更新所有组件
  */
  bathNotice = (paths: string[] | boolean = true) => {
    if (Array.isArray(paths)) {
      paths.forEach((path) => {
        if (path) {
          this.notice(splitPath(path))
        }
      })
    } else if (typeof paths === "boolean" && paths) {
      // 更新所有组件
      this.componentList.forEach((component) => {
        /**通知更新组件*/
        if (component && typeof component.update === "function") {
          component.update()
        }
      })
    }

  }

  /**通知监听*/
  noticeWatch = (path: PathTypes) => {
    const watchPath = getFormatPath(path)
    const value = getValue(this.store, toArray(path))
    this.watchList.forEach((item) => {
      if (getFormatPath(item.path) === watchPath) {
        item.update(value)
      }
    })
  }

  //-------------------------- Selector 选择器部分--------------------------------------

  /**
   * 数据更新,执行选择器(暂时 直接手动调用)
  */
  bathSelector = () => {
    this.selectorMap.forEach((item) => {
      const newValue = item.selector({ store: this.store, simple: this })
      let isUpdate = true
      if (typeof item.equalityFn === "function") {
        isUpdate = item.equalityFn?.(item.preValue, newValue)
      }
      item.preValue = newValue;
      if (isUpdate) {
        item.updateData(newValue)
      }
    })
  }

  /**注册 选择器函数，存储状态中提取数据以供此组件*/
  registerSelector = <TState, Selected>(
    key: Object,
    selectorFn: SelectorListItemType<TState, Selected>["selector"],
    updateData: (value: Selected) => void,
    equalityFn?: (a: any, b: any) => boolean
  ) => {
    const preValue = selectorFn({ store: this.store, simple: this })
    this.selectorMap.set(key, { preValue, selector: selectorFn, updateData, equalityFn })
    return {
      data: preValue,
      unMount: () => { this.selectorMap.delete(key) }
    }
  }
  /**选择器 获取值*/
  getSelectorValue = (key: Object) => {
    return this.selectorMap.get(key).preValue
  }

}

export class MultipleSimpleStore {
  /**数据存储*/
  store: Map<string, SimpleStore> = new Map([])

  /**注册*/
  register = (path: string, simple: SimpleStore) => {
    this.store.set(path, simple)
    return () => {
      this.store.delete(path)
    }
  }

  /**获取单个 simple */
  getSimple = (path: string) => {
    return this.store.get(path)
  }

}
