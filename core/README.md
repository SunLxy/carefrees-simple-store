# `simple-store`

状态管理

- [ ] 1. 定向更新组件
- [ ] 2. 数据存储
- [ ] 3. 监听值变化

## 状态包裹组件

- `SimpleStoreProvider`

## hooks

- `useSimpleStore` 实例化方法
- `useSimpleWatch` 监听值变化
- `useSimple` 子组件中获取实例
- `useSimpleStoreItem` 子组件使用数据更新和取值

## 参数

```ts
/**状态存储*/
export declare class SimpleStore<T extends {} = any> {
    /**值存储*/
    private store;
      /**组件更新方法集合*/
    componentList: RegisterProps[]
    /**设置初始值*/
    init: (initialValue?: T) => void;
    /**注册组件更新方法*/
    register: (path: PathTypes, fun: Function) => void;
    /**更新值*/
    updateValue: <K = any>(path: PathTypes, value: K ,notice: boolean | string[] ) => void;
    /**批量数据更新*/
    bathUpdateValue: (values: Record<string, any>,notice: boolean | string[] ) => void;
    /**获取值*/
    getValue: (path?: PathTypes) => any;
    /**通知组件更新*/
    notice: (path: PathTypes) => void;
    /**批量更新组件*/
    bathNotice: (paths: string[]) => void;
}

export type PathTypes = number | string | (number | string)[]

export interface RegisterProps {
  path: PathTypes,
  update: Function
}
export interface SimpleStoreProviderProps<T extends {} = any> {
  simple?: SimpleStore
  children?: React.ReactNode
  initialValue?: T
}

export interface UseSimpleStoreItemProps {
  /**路径*/
  path: PathTypes
}

```

## 选中案例

```tsx
import React from "react"
import { SimpleStoreProvider, useSimpleStoreItem } from "@carefrees/simple-store"

const Child = (props: { index: number }) => {
  const { index } = props
  const simple = useSimpleStoreItem({ path: index })
  // 这个值，当组件不重新渲染的时候，获取的值是老的，当重新渲染才是最新的
  const checkValue = simple.getValue("checkValue")
  const onClick = () => {
    // 取最新的渲染值
    const preCheckValue = simple.getValue("checkValue")
    simple.bathUpdateValue({ checkValue: index })
    simple.bathNotice([`${index}`, `${preCheckValue}`])
  }
  console.log("选中项====>", index)

  return <button style={checkValue === index && { background: "red" } || {}} onClick={onClick} >点击{index}号</button>
}

const list = Array.from({ length: 10 }).map((_, index) => ({ index }))

const Demo = () => {
  
  return <div>
    <div>选中项</div>
    <hr />
    <SimpleStoreProvider>
      {list.map((ite) => <Child key={ite.index} index={ite.index} />)}
    </SimpleStoreProvider>
    <hr />
  </div>
}
export default Demo;
```

## 表单案例

```tsx 
import React from "react"
import { SimpleStoreProvider, useSimpleStoreItem, useSimpleStore,useSimpleWatch} from "@carefrees/simple-store"

const Item = (props: { name: string }) => {

  const simple = useSimpleStoreItem({ path: props.name })
  const value = simple.getValue(props.name)

  

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
    simple.updateValue(props.name, value)
  }

  console.log("表单====>", props.name)

  return <input placeholder={`${props.name}`}  value={value || ''} onChange={onChange}  />
}

const Form = () => {
  const [simple] = useSimpleStore()
  const values = useSimpleWatch(simple,"1号")
  useSimpleWatch(simple,"1号",(value)=>{
    console.log("打印哈哈哈====>",value)
  })
  console.log("监听 1号 字段 的值变化",values)

  const onSubmit = () => {
    const data = simple.getValue()
    console.log("获取所有值", data)
  }

  const setValue = () => {
    simple.updateValue("1号", new Date().getTime().toString())
  }

  return <div>
    <div>表单</div>
    <hr />
    <button onClick={onSubmit} >获取表单值</button>
    <button onClick={setValue} >设置 1号值 </button>
    <br />
    <SimpleStoreProvider simple={simple} >
      <Item name="1号" />
      <Item name="1号" />
      <Item name="2号" />
      <Item name="3号" />
      <Item name="4号" />
      <Item name="5号" />
      <Item name="5号" />
      <Item name="6号" />
      <Item name="6号" />
    </SimpleStoreProvider>
    <hr />
  </div>
}

export default Form

```
