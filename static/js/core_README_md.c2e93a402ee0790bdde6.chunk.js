(self.webpackChunkexamples=self.webpackChunkexamples||[]).push([["core_README_md"],{11771:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return o}});var o={components:{},data:{},source:'# `simple-store`\n\n状态管理\n\n- [ ] 1. 定向更新组件\n- [ ] 2. 数据存储\n- [ ] 3. 监听值变化\n\n## 状态包裹组件\n\n- `SimpleStoreProvider`\n\n## hooks\n\n- `useSimpleStore` 实例化方法\n- `useSimpleWatch` 监听值变化\n- `useSimple` 子组件中获取实例\n- `useSimpleStoreItem` 子组件使用数据更新和取值\n\n## 参数\n\n```ts\n/**状态存储*/\nexport declare class SimpleStore<T extends {} = any> {\n    /**值存储*/\n    private store;\n      /**组件更新方法集合*/\n    componentList: RegisterProps[]\n    /**设置初始值*/\n    init: (initialValue?: T) => void;\n    /**注册组件更新方法*/\n    register: (path: PathTypes, fun: Function) => void;\n    /**更新值*/\n    updateValue: <K = any>(path: PathTypes, value: K ,notice: boolean | string[] ) => void;\n    /**批量数据更新*/\n    bathUpdateValue: (values: Record<string, any>,notice: boolean | string[] ) => void;\n    /**获取值*/\n    getValue: (path?: PathTypes) => any;\n    /**通知组件更新*/\n    notice: (path: PathTypes) => void;\n    /**批量更新组件*/\n    bathNotice: (paths: string[]) => void;\n}\n\nexport type PathTypes = number | string | (number | string)[]\n\nexport interface RegisterProps {\n  path: PathTypes,\n  update: Function\n}\nexport interface SimpleStoreProviderProps<T extends {} = any> {\n  simple?: SimpleStore\n  children?: React.ReactNode\n  initialValue?: T\n}\n\nexport interface UseSimpleStoreItemProps {\n  /**路径*/\n  path: PathTypes\n}\n\n```\n\n## 选中案例\n\n```tsx\nimport React from "react"\nimport { SimpleStoreProvider, useSimpleStoreItem } from "@carefrees/simple-store"\n\nconst Child = (props: { index: number }) => {\n  const { index } = props\n  const simple = useSimpleStoreItem({ path: index })\n  // 这个值，当组件不重新渲染的时候，获取的值是老的，当重新渲染才是最新的\n  const checkValue = simple.getValue("checkValue")\n  const onClick = () => {\n    // 取最新的渲染值\n    const preCheckValue = simple.getValue("checkValue")\n    simple.bathUpdateValue({ checkValue: index })\n    simple.bathNotice([`${index}`, `${preCheckValue}`])\n  }\n  console.log("选中项====>", index)\n\n  return <button style={checkValue === index && { background: "red" } || {}} onClick={onClick} >点击{index}号</button>\n}\n\nconst list = Array.from({ length: 10 }).map((_, index) => ({ index }))\n\nconst Demo = () => {\n  \n  return <div>\n    <div>选中项</div>\n    <hr />\n    <SimpleStoreProvider>\n      {list.map((ite) => <Child key={ite.index} index={ite.index} />)}\n    </SimpleStoreProvider>\n    <hr />\n  </div>\n}\nexport default Demo;\n```\n\n## 表单案例\n\n```tsx \nimport React from "react"\nimport { SimpleStoreProvider, useSimpleStoreItem, useSimpleStore,useSimpleWatch} from "@carefrees/simple-store"\n\nconst Item = (props: { name: string }) => {\n\n  const simple = useSimpleStoreItem({ path: props.name })\n  const value = simple.getValue(props.name)\n\n  \n\n  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {\n    const value = event.target.value\n    simple.updateValue(props.name, value)\n  }\n\n  console.log("表单====>", props.name)\n\n  return <input placeholder={`${props.name}`}  value={value || \'\'} onChange={onChange}  />\n}\n\nconst Form = () => {\n  const [simple] = useSimpleStore()\n  const values = useSimpleWatch(simple,"1号")\n  useSimpleWatch(simple,"1号",(value)=>{\n    console.log("打印哈哈哈====>",value)\n  })\n  console.log("监听 1号 字段 的值变化",values)\n\n  const onSubmit = () => {\n    const data = simple.getValue()\n    console.log("获取所有值", data)\n  }\n\n  const setValue = () => {\n    simple.updateValue("1号", new Date().getTime().toString())\n  }\n\n  return <div>\n    <div>表单</div>\n    <hr />\n    <button onClick={onSubmit} >获取表单值</button>\n    <button onClick={setValue} >设置 1号值 </button>\n    <br />\n    <SimpleStoreProvider simple={simple} >\n      <Item name="1号" />\n      <Item name="1号" />\n      <Item name="2号" />\n      <Item name="3号" />\n      <Item name="4号" />\n      <Item name="5号" />\n      <Item name="5号" />\n      <Item name="6号" />\n      <Item name="6号" />\n    </SimpleStoreProvider>\n    <hr />\n  </div>\n}\n\nexport default Form\n\n```\n',headings:[],headingsList:[]}}}]);