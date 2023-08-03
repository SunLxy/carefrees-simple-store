import { getFormatPath, toArray, splitPath, getValue, setValue } from "./utils"
import { PathTypes, RegisterProps } from "./interface"

/**状态存储*/
export class SimpleStore<T extends {} = any> {

  /**值存储*/
  private store: T = {} as T;

  /**组件更新方法集合*/
  componentMap: Map<string, Function> = new Map([])
  componentList: RegisterProps[] = []

  /**设置初始值*/
  init = (initialValue: T) => {
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
  updateValue = <K = any>(path: PathTypes, value: K) => {
    this.store = setValue(this.store, toArray(path), value)
    this.notice(path)
  }

  /**批量数据更新*/
  bathUpdateValue = (values: Record<string, any>) => {
    Object.entries(values).forEach(([path, value]) => {
      this.store = setValue(this.store, splitPath(path), value)
    })
    this.bathNotice(Object.keys(values))
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

  /**批量更新组件*/
  bathNotice = (paths: string[]) => {
    paths.forEach((path) => {
      if (path) {
        this.notice(splitPath(path))
      }
    })
  }

}

