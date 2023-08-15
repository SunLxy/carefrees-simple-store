import { getFormatPath, toArray, splitPath, getValue, setValue, merge } from "./utils"
import { PathTypes, RegisterProps, RegisterWatchProps } from "./interface"

/**状态存储*/
export class SimpleStore<T extends {} = any> {

  /**值存储*/
  private store: T = {} as T;

  private initialValue: T = {} as T;

  /**组件更新方法集合*/
  componentList: RegisterProps[] = []

  /**监听字段值变化*/
  watchList: RegisterWatchProps[] = []

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
    this.store = setValue(this.store, toArray(path), value)
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

}

