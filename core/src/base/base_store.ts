import { PathTypes, RegisterProps, RegisterWatchProps, Base_SelectorListItemType } from "../interface"
import { getFormatPath, toArray, getValue, setValue, splitPath, merge } from "../utils"

export class Base_SimpleStore {

  // storeField: string, // 操作数据存储 字段
  // initialField:string, // 初始值存储 字段
  // componentField: string, // 挂载组件存储 字段
  // watchField: string // 挂载监听组件存储 字段
  // selectorMapField:string // 执行器方法集合存储 字段

  /**
   * 基础创建方法=====>获取数组数据
   * @param field 字段
   * */
  _get_list = <K>(field: string): K[] => {
    this[field] = this[field] || []
    return this[field]
  }

  /**
   * 基础创建方法=====>获取对象数据
   * @param field 字段
  */
  _get_store = <R = any>(field: string): R => {
    this[field] = this[field] || {}
    return this[field]
  }

  /**
   * 基础创建方法=====>获取 Map 对象数据
   * @param field 字段
   * */
  _get_map = (field: string): Map<Symbol | Object, Base_SelectorListItemType> => {
    this[field] = this[field] || new Map([])
    return this[field]
  }

  /**
   * 基础创建方法=====>注册组件
   * @param componentField 挂载组件存储 字段 
   * @param storeField  操作数据存储 字段
   * @param initialField  初始值存储 字段
   * @param props 内部操作参数
   * */
  _create_base_register = <R = any>(componentField: string, storeField: string, initialField: string, props: RegisterProps) => {
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

  /**
   * 基础创建方法=====>注册监听字段
   * @param watchField  挂载监听组件存储 字段
   * @param props 内部操作参数
   * */
  _create_base_registerWatch = (watchField: string, props: RegisterWatchProps) => {
    this._get_list<RegisterWatchProps>(watchField).push(props)
    return () => {
      this[watchField] = this._get_list<RegisterWatchProps>(watchField).filter((ite) => ite !== props)
    }
  }

  /**
   * 基础创建方法=====>通知组件更新
   * @param componentField 挂载组件存储 字段
   * @param path 更新组件路径
   * */
  _create_base_notice = (componentField: string, path: PathTypes,) => {
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
   * 基础创建方法=====>批量更新组件， 当不传递值的时候，更新所有组件
   * @param componentField 挂载组件存储 字段
   * @param paths 更新组件路径集合
   * 
  */
  _create_base_bathNotice = (componentField: string, paths: string[] | boolean = true) => {
    if (Array.isArray(paths)) {
      paths.forEach((path) => {
        if (path) {
          this._create_base_notice(componentField, splitPath(path))
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

  /**
   * 基础创建方法=====>通知监听
   * @param watchField  挂载监听组件存储 字段
   * @param storeField  操作数据存储 字段
   * @param path 通知监听器的路径值更新
   * */
  _create_base_noticeWatch = (watchField: string, storeField: string, path: PathTypes,) => {
    const watchPath = getFormatPath(path)
    const value = getValue(this._get_store(storeField), toArray(path))
    this._get_list<RegisterWatchProps>(watchField).forEach((item) => {
      if (getFormatPath(item.path) === watchPath) {
        item.update(value)
      }
    })
  }

  /**
   * 基础创建方法=====>更新值
   * @param componentField 挂载组件存储 字段
   * @param storeField  操作数据存储 字段
   * @param watchField  挂载监听组件存储 字段
   * @param path 更新数据路径
   * @param value 数据
   * @param notice 通知更新
   * 
   * */
  _create_base_updateValue = <K = any>(
    componentField: string,
    storeField: string,
    watchField: string,
    path: PathTypes,
    value: K,
    notice: boolean | string[] = true,
  ) => {
    const preVaue = getValue(this._get_store(storeField), toArray(path));
    this[storeField] = setValue(this._get_store(storeField), toArray(path), value);
    /**判断值相等 , 当相等的时候才进行更新监听的值*/
    if (preVaue !== value)
      this._create_base_noticeWatch(watchField, storeField, path);

    if (typeof notice === "boolean" && notice) {
      this._create_base_notice(componentField, path)
    } else if (Array.isArray(notice)) {
      this._create_base_bathNotice(componentField, notice)
    }
  }

  /**
   * 基础创建方法=====>批量数据更新
   * @param componentField 挂载组件存储 字段
   * @param storeField  操作数据存储 字段
   * @param watchField  挂载监听组件存储 字段
   * @param values 存储的数据
   * @param notice 通知更新
   * */
  _create_base_bathUpdateValue = (
    componentField: string,
    storeField: string,
    watchField: string,
    values: Record<string, any>,
    notice: boolean | string[] = true,
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
        this._create_base_bathNotice(componentField, Object.keys(values),)
      } else if (Array.isArray(notice)) {
        this._create_base_bathNotice(componentField, notice)
      }
    }
  }

  /**
   * 基础创建方法=====>获取值
   * @param storeField  操作数据存储 字段
   * @param path 获取数据的路径
   * */
  _create_base_getValue = (storeField: string, path?: PathTypes) => {
    if (path) {
      return getValue(this._get_store(storeField), toArray(path))
    }
    return this._get_store(storeField)
  }

  /**
   * 基础创建方法=====>设置初始值
   * @param storeField  操作数据存储 字段
   * @param initialField  操作数据存储 字段
   * @param initialValue 初始值存储 字段
  */
  _create_base_init = <T = any>(storeField: string, initialField: string, initialValue?: T) => {
    this[initialField] = (initialValue || {}) as T
    this[storeField] = merge(this._get_store(initialField), this._get_store(storeField))
  }

  //-------------------------- Selector 选择器部分--------------------------------------
  /**
   * 基础创建方法=====> 数据更新,执行选择器(暂时 直接手动调用)
   * @param selectorMapField  执行器方法集合存储 字段
   * @param storeField  操作数据存储 字段
   * 
  */
  _create_base_bathRunSelector = (selectorMapField: string, storeField: string) => {
    this._get_map(selectorMapField).forEach((item) => {
      const newValue = item.selector({ store: this._get_store(storeField), simple: this })
      let isNoUpdate = false
      if (typeof item.equalityFn === "function") {
        isNoUpdate = item.equalityFn?.(item.preValue, newValue)
      }
      item.preValue = newValue;
      if (!isNoUpdate) {
        item.updateData(newValue)
      }
    })
  }

  /**
   * 基础创建方法=====>注册 选择器函数，存储状态中提取数据以供此组件
   * @param selectorMapField  执行器方法集合存储 字段
   * @param storeField  操作数据存储 字段
   * @param key  map集合 设置值的唯一key值
   * @param selectorFn  获取最新数据的 执行方法
   * @param updateData  组件更新方法
   * @param equalityFn  新老数据对比方法
  */
  _create_base_registerSelector = <TState, Selected>(
    selectorMapField: string,
    storeField: string,
    key: Object | Symbol,
    selectorFn: Base_SelectorListItemType<TState, Selected>["selector"],
    updateData: (value: Selected) => void,
    equalityFn?: (a: any, b: any) => boolean,
  ) => {
    const preValue = selectorFn({ store: this._get_store(storeField), simple: this })
    this._get_map(selectorMapField).set(key, { preValue, selector: selectorFn, updateData, equalityFn })
    return {
      data: preValue,
      unMount: () => {
        this._get_map(selectorMapField).delete(key)
      }
    }
  }

  /**
   * 基础创建方法=====>选择器 获取值
   * @param selectorMapField  执行器方法集合存储 字段
   * @param storeField  操作数据存储 字段
   * @param key   从 map集合 取值唯一key值
   * */
  _create_base_getSelectorValue = (
    selectorMapField: string,
    storeField: string,
    key: Object | Symbol
  ) => {
    const selectorData = this._get_map(selectorMapField).get(key)
    if (selectorData) {
      const preValue = selectorData?.selector({ store: this._get_store(storeField), simple: this })
      selectorData.preValue = preValue;
      this._get_map(selectorMapField).set(key, selectorData);
    }
    return this._get_map(selectorMapField).get(key)?.preValue
  }

}