(self.webpackChunkexamples=self.webpackChunkexamples||[]).push([["core_README_md"],{98767:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useSimple=t.useUpdate=t.SimpleProvider=t.useSimpleStore=t.SimpleContext=void 0;let a=n("73156"),l=n("66629");t.SimpleContext=(0,a.createContext)(new l.SimpleStore);t.useSimpleStore=e=>{let t=(0,a.useRef)();return!t.current&&(e?t.current=e:t.current=new l.SimpleStore),[t.current]};t.SimpleProvider=e=>{let{simple:n,children:l}=e,[r]=(0,t.useSimpleStore)(n);return(0,a.createElement)(t.SimpleContext.Provider,{value:r,children:l})};t.useUpdate=()=>{let[e,t]=(0,a.useState)(0),n=(0,a.useRef)();return n.current=()=>{t(new Date().getTime())},n};t.useSimple=e=>{let{path:n}=e,l=(0,t.useUpdate)(),r=(0,a.useContext)(t.SimpleContext);return(0,a.useEffect)(()=>{let e=r.register({path:n,update:l.current});return()=>e()},[n]),r}},98922:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});let a=n("35685");a.__exportStar(n("22471"),t),a.__exportStar(n("66629"),t),a.__exportStar(n("6656"),t),a.__exportStar(n("98767"),t)},22471:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0})},66629:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SimpleStore=void 0;let a=n("6656");class l{store={};componentMap=new Map([]);componentList=[];init=e=>{this.store=e||{}};register=e=>(this.componentList.push(e),()=>{this.componentList=this.componentList.filter(t=>t!==e)});updateValue=(e,t)=>{this.store=(0,a.setValue)(this.store,(0,a.toArray)(e),t),this.notice(e)};bathUpdateValue=e=>{Object.entries(e).forEach(([e,t])=>{this.store=(0,a.setValue)(this.store,(0,a.splitPath)(e),t)}),this.bathNotice(Object.keys(e))};getValue=e=>e?(0,a.getValue)(this.store,(0,a.toArray)(e)):this.store;notice=e=>{let t=(0,a.getFormatPath)(e),n=this.componentList.filter(e=>(0,a.getFormatPath)(e.path)===t);n.forEach(e=>{e&&"function"==typeof e.update&&e.update()})};bathNotice=e=>{e.forEach(e=>{e&&this.notice((0,a.splitPath)(e))})}}t.SimpleStore=l},57157:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getValue=void 0;t.getValue=(e,t)=>{let n=e;for(let e=0;e<t.length;e+=1){if(null==n)return;n=n[t[e]]}return n}},6656:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.splitPath=t.toArray=t.getFormatPath=void 0;let a=n("35685");a.__exportStar(n("57157"),t),a.__exportStar(n("1677"),t);t.getFormatPath=e=>Array.isArray(e)?e.join("_"):`${e}`;t.toArray=e=>Array.isArray(e)?e:[e];t.splitPath=e=>e.split("_").filter(Boolean)},1677:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setValue=void 0;let a=n("57157"),l=(e,t,n,a)=>{let r;if(!t.length)return n;let[o,...i]=t;return r=e||"number"!=typeof o?e?Array.isArray(e)?[...e]:{...e}:{}:[],a&&void 0===n&&1===i.length?delete r[o][i[0]]:r[o]=l(r[o],i,n,a),r};t.setValue=(e,t,n,r=!1)=>Array.isArray(t)?t.length&&r&&void 0===n&&!(0,a.getValue)(e,t.slice(0,-1))?e:l(e,t,n,r):(console.warn("paths 参数是数组"),e)},11771:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return a}});var a={components:{59:function(){Object.defineProperty(t,"__esModule",{value:!0});let e=function(e){return e&&e.__esModule?e:{default:e}}(n("73156")),a=n("98922"),l=t=>{let{index:n}=t,l=(0,a.useSimple)({path:n}),r=l.getValue("checkValue");return console.log("选中项====>",n),e.default.createElement("button",{style:r===n&&{background:"red"}||{},onClick:()=>{let e=l.getValue("checkValue");l.bathUpdateValue({checkValue:n}),l.bathNotice([`${n}`,`${e}`])}},"点击",n,"号")},r=Array.from({length:10}).map((e,t)=>({index:t}));return()=>e.default.createElement("div",null,e.default.createElement("div",null,"选中项"),e.default.createElement("hr",null),e.default.createElement(a.SimpleProvider,null,r.map(t=>e.default.createElement(l,{key:t.index,index:t.index}))),e.default.createElement("hr",null))}(),97:function(){Object.defineProperty(t,"__esModule",{value:!0});let e=function(e){return e&&e.__esModule?e:{default:e}}(n("73156")),a=n("98922"),l=t=>{let n=(0,a.useSimple)({path:t.name}),l=n.getValue(t.name);return console.log("表单====>",t.name),e.default.createElement("input",{placeholder:`${t.name}`,value:l||"",onChange:e=>{let a=e.target.value;n.updateValue(t.name,a)}})};return()=>{let[t]=(0,a.useSimpleStore)();return e.default.createElement("div",null,e.default.createElement("div",null,"表单"),e.default.createElement("hr",null),e.default.createElement("button",{onClick:()=>{let e=t.getValue();console.log("获取所有值",e)}},"获取表单值"),e.default.createElement("button",{onClick:()=>{t.updateValue("1号",new Date().getTime().toString())}},"设置 1号值 "),e.default.createElement("br",null),e.default.createElement(a.SimpleProvider,{simple:t},e.default.createElement(l,{name:"1号"}),e.default.createElement(l,{name:"1号"}),e.default.createElement(l,{name:"2号"}),e.default.createElement(l,{name:"3号"}),e.default.createElement(l,{name:"4号"}),e.default.createElement(l,{name:"5号"}),e.default.createElement(l,{name:"5号"}),e.default.createElement(l,{name:"6号"}),e.default.createElement(l,{name:"6号"})),e.default.createElement("hr",null))}}()},data:{59:{name:59,meta:{},code:'"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});const _react=_interop_require_default(require("react"));const _simplestore=require("@carefrees/simple-store");function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}const Child=props=>{const{index}=props;const simple=(0,_simplestore.useSimple)({path:index});const checkValue=simple.getValue("checkValue");const onClick=()=>{const preCheckValue=simple.getValue("checkValue");simple.bathUpdateValue({checkValue:index});simple.bathNotice([`${index}`,`${preCheckValue}`])};console.log("选中项====>",index);return _react.default.createElement("button",{style:checkValue===index&&{background:"red"}||{},onClick:onClick},"点击",index,"号")};const list=Array.from({length:10}).map((_,index)=>({index}));const Demo=()=>{return _react.default.createElement("div",null,_react.default.createElement("div",null,"选中项"),_react.default.createElement("hr",null),_react.default.createElement(_simplestore.SimpleProvider,null,list.map(ite=>_react.default.createElement(Child,{key:ite.index,index:ite.index}))),_react.default.createElement("hr",null))};const BaseCode_Export__default__value=Demo;\nreturn BaseCode_Export__default__value;\n',language:"tsx",value:'import React from "react"\nimport { SimpleProvider, useSimple } from "@carefrees/simple-store"\n\nconst Child = (props: { index: number }) => {\n  const { index } = props\n  const simple = useSimple({ path: index })\n  // 这个值，当组件不重新渲染的时候，获取的值是老的，当重新渲染才是最新的\n  const checkValue = simple.getValue("checkValue")\n  const onClick = () => {\n    // 取最新的渲染值\n    const preCheckValue = simple.getValue("checkValue")\n    simple.bathUpdateValue({ checkValue: index })\n    simple.bathNotice([`${index}`, `${preCheckValue}`])\n  }\n  console.log("选中项====>", index)\n\n  return <button style={checkValue === index && { background: "red" } || {}} onClick={onClick} >点击{index}号</button>\n}\n\nconst list = Array.from({ length: 10 }).map((_, index) => ({ index }))\n\nconst Demo = () => {\n  \n  return <div>\n    <div>选中项</div>\n    <hr />\n    <SimpleProvider>\n      {list.map((ite) => <Child key={ite.index} index={ite.index} />)}\n    </SimpleProvider>\n    <hr />\n  </div>\n}\nexport default Demo;'},97:{name:97,meta:{},code:'"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});const _react=_interop_require_default(require("react"));const _simplestore=require("@carefrees/simple-store");function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}const Item=props=>{const simple=(0,_simplestore.useSimple)({path:props.name});const value=simple.getValue(props.name);const onChange=event=>{const value=event.target.value;simple.updateValue(props.name,value)};console.log("表单====>",props.name);return _react.default.createElement("input",{placeholder:`${props.name}`,value:value||"",onChange:onChange})};const Form=()=>{const[simple]=(0,_simplestore.useSimpleStore)();const onSubmit=()=>{const data=simple.getValue();console.log("获取所有值",data)};const setValue=()=>{simple.updateValue("1号",new Date().getTime().toString())};return _react.default.createElement("div",null,_react.default.createElement("div",null,"表单"),_react.default.createElement("hr",null),_react.default.createElement("button",{onClick:onSubmit},"获取表单值"),_react.default.createElement("button",{onClick:setValue},"设置 1号值 "),_react.default.createElement("br",null),_react.default.createElement(_simplestore.SimpleProvider,{simple:simple},_react.default.createElement(Item,{name:"1号"}),_react.default.createElement(Item,{name:"1号"}),_react.default.createElement(Item,{name:"2号"}),_react.default.createElement(Item,{name:"3号"}),_react.default.createElement(Item,{name:"4号"}),_react.default.createElement(Item,{name:"5号"}),_react.default.createElement(Item,{name:"5号"}),_react.default.createElement(Item,{name:"6号"}),_react.default.createElement(Item,{name:"6号"})),_react.default.createElement("hr",null))};const BaseCode_Export__default__value=Form;\nreturn BaseCode_Export__default__value;\n',language:"tsx",value:'import React from "react"\nimport { SimpleProvider, useSimple, useSimpleStore } from "@carefrees/simple-store"\n\nconst Item = (props: { name: string }) => {\n\n  const simple = useSimple({ path: props.name })\n  const value = simple.getValue(props.name)\n\n  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {\n    const value = event.target.value\n    simple.updateValue(props.name, value)\n  }\n\n  console.log("表单====>", props.name)\n\n  return <input placeholder={`${props.name}`}  value={value || \'\'} onChange={onChange}  />\n}\n\nconst Form = () => {\n  const [simple] = useSimpleStore()\n\n  const onSubmit = () => {\n    const data = simple.getValue()\n    console.log("获取所有值", data)\n  }\n\n  const setValue = () => {\n    simple.updateValue("1号", new Date().getTime().toString())\n  }\n\n  return <div>\n    <div>表单</div>\n    <hr />\n    <button onClick={onSubmit} >获取表单值</button>\n    <button onClick={setValue} >设置 1号值 </button>\n    <br />\n    <SimpleProvider simple={simple} >\n      <Item name="1号" />\n      <Item name="1号" />\n      <Item name="2号" />\n      <Item name="3号" />\n      <Item name="4号" />\n      <Item name="5号" />\n      <Item name="5号" />\n      <Item name="6号" />\n      <Item name="6号" />\n    </SimpleProvider>\n    <hr />\n  </div>\n}\n\nexport default Form\n'}},source:'# `simple-store`\n\n状态管理\n\n- [ ] 1. 定向更新组件\n- [ ] 2. 数据存储\n\n## 状态包裹组件\n\n- `SimpleProvider`\n\n## hooks\n\n- `useSimpleStore` 实例化方法\n- `useSimple` 子组件使用数据更新和取值\n\n## 参数\n\n```ts\nimport { PathTypes } from "./interface";\n/**状态存储*/\nexport declare class SimpleStore<T extends {} = any> {\n    /**值存储*/\n    private store;\n    /**组件更新方法集合*/\n    componentMap: Map<string, Function>;\n    /**设置初始值*/\n    init: (initialValue: T) => void;\n    /**注册组件更新方法*/\n    register: (path: PathTypes, fun: Function) => void;\n    /**更新值*/\n    updateValue: <K = any>(path: PathTypes, value: K) => void;\n    /**批量数据更新*/\n    bathUpdateValue: (values: Record<string, any>) => void;\n    /**获取值*/\n    getValue: (path?: PathTypes) => any;\n    /**通知组件更新*/\n    notice: (path: PathTypes) => void;\n    /**批量更新组件*/\n    bathNotice: (paths: string[]) => void;\n}\n\nexport type PathTypes = number | string | (number | string)[]\n\nexport interface SimpleProviderProps {\n  simple?: SimpleStore\n  children?: React.ReactNode\n}\n\nexport interface UseSimpleProps {\n  /**数据更新路径*/\n  path: PathTypes\n}\n\n```\n\n## 选中案例\n\n```tsx mdx:preview\nimport React from "react"\nimport { SimpleProvider, useSimple } from "@carefrees/simple-store"\n\nconst Child = (props: { index: number }) => {\n  const { index } = props\n  const simple = useSimple({ path: index })\n  // 这个值，当组件不重新渲染的时候，获取的值是老的，当重新渲染才是最新的\n  const checkValue = simple.getValue("checkValue")\n  const onClick = () => {\n    // 取最新的渲染值\n    const preCheckValue = simple.getValue("checkValue")\n    simple.bathUpdateValue({ checkValue: index })\n    simple.bathNotice([`${index}`, `${preCheckValue}`])\n  }\n  console.log("选中项====>", index)\n\n  return <button style={checkValue === index && { background: "red" } || {}} onClick={onClick} >点击{index}号</button>\n}\n\nconst list = Array.from({ length: 10 }).map((_, index) => ({ index }))\n\nconst Demo = () => {\n  \n  return <div>\n    <div>选中项</div>\n    <hr />\n    <SimpleProvider>\n      {list.map((ite) => <Child key={ite.index} index={ite.index} />)}\n    </SimpleProvider>\n    <hr />\n  </div>\n}\nexport default Demo;\n```\n\n## 表单案例\n\n```tsx mdx:preview\nimport React from "react"\nimport { SimpleProvider, useSimple, useSimpleStore } from "@carefrees/simple-store"\n\nconst Item = (props: { name: string }) => {\n\n  const simple = useSimple({ path: props.name })\n  const value = simple.getValue(props.name)\n\n  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {\n    const value = event.target.value\n    simple.updateValue(props.name, value)\n  }\n\n  console.log("表单====>", props.name)\n\n  return <input placeholder={`${props.name}`}  value={value || \'\'} onChange={onChange}  />\n}\n\nconst Form = () => {\n  const [simple] = useSimpleStore()\n\n  const onSubmit = () => {\n    const data = simple.getValue()\n    console.log("获取所有值", data)\n  }\n\n  const setValue = () => {\n    simple.updateValue("1号", new Date().getTime().toString())\n  }\n\n  return <div>\n    <div>表单</div>\n    <hr />\n    <button onClick={onSubmit} >获取表单值</button>\n    <button onClick={setValue} >设置 1号值 </button>\n    <br />\n    <SimpleProvider simple={simple} >\n      <Item name="1号" />\n      <Item name="1号" />\n      <Item name="2号" />\n      <Item name="3号" />\n      <Item name="4号" />\n      <Item name="5号" />\n      <Item name="5号" />\n      <Item name="6号" />\n      <Item name="6号" />\n    </SimpleProvider>\n    <hr />\n  </div>\n}\n\nexport default Form\n\n```\n',headings:[]}}}]);