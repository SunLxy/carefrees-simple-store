import { PathTypes, RegisterProps, RegisterWatchProps, } from "../interface"
import { getFormatPath, toArray, getValue, setValue, splitPath, merge } from "../utils"

export class Base_SimpleStore {

  // storeField: string, // 操作数据存储 字段
  // initialField:string, // 初始值存储 字段
  // componentField: string, // 挂载组件存储 字段
  // watchField: string // 挂载监听组件存储 字段

  /**获取数组数据*/
  private _get_list = <K>(field: string): K[] => {
    this[field] = this[field] || []
    return this[field]
  }
  /**获取对象数据*/
  private _get_store = <R = any>(field: string): R => {
    this[field] = this[field] || {}
    return this[field]
  }

  /**基础创建方法=====>注册组件*/
  _create_base_register = <R = any>(props: RegisterProps, componentField: string, storeField: string, initialField: string) => {
    this._get_list<RegisterProps>(componentField).push(props)
    return () => {
      this[componentField] = this._get_list<RegisterProps>(componentField).filter((ite) => ite !== props)
      const { preserve = true } = props
      const currentPath = getFormatPath(props.path)
      /**查询是否存在相同字段的组件*/
      const finx = this._get_list<RegisterProps>(componentField).find((item) => getFormatPath(item.path) === currentPath)
      /**当不存储 并且 没有相同字段组件的时候*/
      if (!preserve && !finx) {
        /**
        * 1. 通过参数控制卸载组件是否进行初始化参数
        * 2. 判断当前组件是否已经不存在，不存在则进行初始化
        * 3. 当前值和默认值相等的时候
        * */
        const pathArr = toArray(props.path)
        const defaultValue = getValue(this._get_store<R>(initialField), pathArr)
        const value = getValue(this._get_store<R>(storeField), pathArr)
        if (defaultValue !== value) {
          this[storeField] = setValue(this._get_store<R>(storeField), pathArr, defaultValue)
        }
      }
    }

  }

  /**基础创建方法=====>注册监听字段*/
  _create_base_registerWatch = (props: RegisterWatchProps, watchField: string) => {
    this._get_list<RegisterWatchProps>(watchField).push(props)
    return () => {
      this[watchField] = this._get_list<RegisterWatchProps>(watchField).filter((ite) => ite !== props)
    }
  }

  /**基础创建方法=====>通知组件更新*/
  _create_base_notice = (path: PathTypes, componentField: string) => {
    const newPath = getFormatPath(path)
    const componentList = this._get_list<RegisterProps>(componentField).filter((item) => getFormatPath(item.path) === newPath)
    componentList.forEach((com) => {
      /**通知更新组件*/
      if (com && typeof com.update === "function") {
        com.update()
      }
    })
  }

  /**
   * 基础创建方法=====>
   * 批量更新组件， 
   * 当不传递值的时候，更新所有组件
  */
  _create_base_bathNotice = (paths: string[] | boolean = true, componentField: string) => {
    if (Array.isArray(paths)) {
      paths.forEach((path) => {
        if (path) {
          this._create_base_notice(splitPath(path), componentField)
        }
      })
    } else if (typeof paths === "boolean" && paths) {
      // 更新所有组件
      this._get_list<RegisterProps>(componentField).forEach((component) => {
        /**通知更新组件*/
        if (component && typeof component.update === "function") {
          component.update()
        }
      })
    }
  }

  /**基础创建方法=====>通知监听*/
  _create_base_noticeWatch = (path: PathTypes, watchField: string, storeField: string,) => {
    const watchPath = getFormatPath(path)
    const value = getValue(this._get_store(storeField), toArray(path))
    this._get_list<RegisterWatchProps>(watchField).forEach((item) => {
      if (getFormatPath(item.path) === watchPath) {
        item.update(value)
      }
    })
  }

  /**基础创建方法=====>更新值*/
  _create_base_updateValue = <K = any>(
    path: PathTypes,
    value: K,
    notice: boolean | string[] = true,
    componentField: string,
    storeField: string,
    watchField: string
  ) => {
    const preVaue = getValue(this._get_store(storeField), toArray(path));
    this[storeField] = setValue(this._get_store(storeField), toArray(path), value);
    /**判断值相等 , 当相等的时候才进行更新监听的值*/
    if (preVaue !== value)
      this._create_base_noticeWatch(path, watchField, storeField);

    if (typeof notice === "boolean" && notice) {
      this._create_base_notice(path, componentField)
    } else if (Array.isArray(notice)) {
      this._create_base_bathNotice(notice, componentField)
    }
  }

  /**基础创建方法=====>批量数据更新*/
  _create_base_bathUpdateValue = (
    values: Record<string, any>,
    notice: boolean | string[] = true,
    componentField: string,
    storeField: string,
    watchField: string
  ) => {
    if (values) {
      Object.entries(values).forEach(([path, value]) => {
        const preVaue = getValue(this._get_store(storeField), toArray(path));
        this[storeField] = setValue(this._get_store(storeField), splitPath(path), value)
        /**判断值相等 , 当相等的时候才进行更新监听的值*/
        if (preVaue !== value)
          this._create_base_noticeWatch(path, watchField, storeField);
      })
      if (typeof notice === "boolean" && notice) {
        this._create_base_bathNotice(Object.keys(values), componentField)
      } else if (Array.isArray(notice)) {
        this._create_base_bathNotice(notice, componentField)
      }
    }
  }

  /**基础创建方法=====>获取值*/
  _create_base_getValue = (storeField: string, path?: PathTypes) => {
    if (path) {
      return getValue(this._get_store(storeField), toArray(path))
    }
    return this._get_store(storeField)
  }

  /**基础创建方法=====>设置初始值*/
  _create_base_init = <T = any>(storeField: string, initialField: string, initialValue?: T) => {
    this[initialField] = (initialValue || {}) as T
    this[storeField] = merge(this._get_store(initialField), this._get_store(storeField))
  }

}