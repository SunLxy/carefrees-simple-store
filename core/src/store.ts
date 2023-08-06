import { getFormatPath, toArray, splitPath, getValue, setValue } from "./utils"
import { PathTypes, RegisterProps } from "./interface"

/**状态存储*/
export class SimpleStore<T extends {} = any> {

  /**值存储*/
  private store: T = {} as T;

  /**组件更新方法集合*/
  componentList: RegisterProps[] = []

  /**设置初始值*/
  init = (initialValue?: T) => {
    this.store = (initialValue || {}) as T
  }

  /**注册组件更新方法*/
  register = (props: RegisterProps) => {
    this.componentList.push(props)
    return () => {
      this.componentList = this.componentList.filter((ite) => ite !== props)
    }
  }

  /**更新值*/
  updateValue = <K = any>(path: PathTypes, value: K, notice: boolean | string[] = true) => {
    this.store = setValue(this.store, toArray(path), value)
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

}

