# `simple-store`

状态管理

- [ ] 1. 定向更新组件
- [ ] 2. 数据存储

## 状态包裹组件

- `SimpleProvider`

## hooks

- `useSimpleStore` 实例化方法
- `useSimple` 子组件使用数据更新和取值

## 参数

```ts
import { PathTypes } from "./interface";
/**状态存储*/
export declare class SimpleStore<T extends {} = any> {
    /**值存储*/
    private store;
    /**组件更新方法集合*/
    componentMap: Map<string, Function>;
    /**设置初始值*/
    init: (initialValue: T) => void;
    /**注册组件更新方法*/
    register: (path: PathTypes, fun: Function) => void;
    /**更新值*/
    updateValue: <K = any>(path: PathTypes, value: K) => void;
    /**批量数据更新*/
    bathUpdateValue: (values: Record<string, any>) => void;
    /**获取值*/
    getValue: (path?: PathTypes) => any;
    /**通知组件更新*/
    notice: (path: PathTypes) => void;
    /**批量更新组件*/
    bathNotice: (paths: string[]) => void;
}

export type PathTypes = number | string | (number | string)[]

export interface SimpleProviderProps {
  simple?: SimpleStore
  children?: React.ReactNode
}

export interface UseSimpleProps {
  /**数据更新路径*/
  path: PathTypes
}

```

## 选中案例

```tsx mdx:preview
import React from "react"
import { SimpleProvider, useSimple } from "@carefrees/simple-store"

const Child = (props: { index: number }) => {
  const { index } = props
  const simple = useSimple({ path: index })
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
    <SimpleProvider>
      {list.map((ite) => <Child key={ite.index} index={ite.index} />)}
    </SimpleProvider>
    <hr />
  </div>
}
export default Demo;
```

## 表单案例

```tsx mdx:preview
import React from "react"
import { SimpleProvider, useSimple, useSimpleStore } from "@carefrees/simple-store"

const Item = (props: { name: string }) => {

  const simple = useSimple({ path: props.name })
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
    <SimpleProvider simple={simple} >
      <Item name="1号" />
      <Item name="1号" />
      <Item name="2号" />
      <Item name="3号" />
      <Item name="4号" />
      <Item name="5号" />
      <Item name="5号" />
      <Item name="6号" />
      <Item name="6号" />
    </SimpleProvider>
    <hr />
  </div>
}

export default Form

```
