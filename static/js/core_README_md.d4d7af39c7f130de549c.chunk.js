(self.webpackChunkexamples=self.webpackChunkexamples||[]).push([["core_README_md"],{75114:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});let l=n("59390");l.__exportStar(n("19287"),t),l.__exportStar(n("48137"),t),l.__exportStar(n("96722"),t)},19287:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useSimpleWatch=t.useSimpleItem=t.useSimpleStoreItem=t.useMultipleSimple=t.useSimple=t.useUpdate=t.MultipleSimplProvider=t.SimpleStoreProvider=t.useMultipleSimpleStore=t.useSimpleStore=t.MultipleSimpleContext=t.SimpleContext=void 0;let l=n("30475"),r=n("29960");t.SimpleContext=(0,l.createContext)(new r.SimpleStore),t.MultipleSimpleContext=(0,l.createContext)(new r.MultipleSimpleStore);t.useSimpleStore=e=>{let t=(0,l.useRef)();return!t.current&&(e?t.current=e:t.current=new r.SimpleStore),[t.current]};t.useMultipleSimpleStore=e=>{let t=(0,l.useRef)();return!t.current&&(e?t.current=e:t.current=new r.MultipleSimpleStore),[t.current]};t.SimpleStoreProvider=e=>{let{simple:n,children:r,initialValue:a,path:o}=e,[i]=(0,t.useSimpleStore)(n),u=(0,t.useMultipleSimple)();return(0,l.useMemo)(()=>{a&&i.init(a)},[]),(0,l.useEffect)(()=>{let e=()=>void 0;return o&&(e=u.register(o,i)),()=>e?.()},[o]),(0,l.createElement)(t.SimpleContext.Provider,{value:i,children:r})};t.MultipleSimplProvider=e=>{let{multipleSimple:n,children:r}=e,[a]=(0,t.useMultipleSimpleStore)(n);return(0,l.createElement)(t.MultipleSimpleContext.Provider,{value:a,children:r})};t.useUpdate=()=>{let[e,t]=(0,l.useState)(0),n=(0,l.useRef)();return n.current=()=>{t(new Date().getTime())},n};t.useSimple=()=>(0,l.useContext)(t.SimpleContext);t.useMultipleSimple=()=>(0,l.useContext)(t.MultipleSimpleContext);t.useSimpleStoreItem=e=>{let{path:n}=e,r=(0,t.useUpdate)(),a=(0,l.useContext)(t.SimpleContext);return(0,l.useEffect)(()=>{let e=a.register({path:n,update:r.current});return()=>e()},[JSON.stringify(n)]),a},t.useSimpleItem=t.useSimpleStoreItem;t.useSimpleWatch=(e,n,r)=>{let a=(0,l.useRef)(),o=(0,l.useRef)(()=>void 0),i=(0,t.useUpdate)();return o.current=e=>{a.current=e,"function"==typeof r?r(e):i.current()},(0,l.useEffect)(()=>{let t=e.registerWatch({path:n,update:o.current});return()=>t()},[JSON.stringify(n)]),a.current}},48137:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useSelector=t.createSelectorHook=void 0;let l=n("19287"),r=n("33868");t.createSelectorHook=()=>(0,r.create_CSTU_hooks_InstanceSelector)(l.useSimple,"listenerSetData"),t.useSelector=(0,r.create_CSTU_hooks_InstanceSelector)(l.useSimple,"listenerSetData")},96722:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useSimplReducer=void 0;let l=n("30475"),r=(e,t)=>({...e,...t});t.useSimplReducer=(e={},t=r)=>{let[n,a]=(0,l.useReducer)(t,e);return[n,a]}},61585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});let l=n("59390");l.__exportStar(n("33868"),t),l.__exportStar(n("66557"),t),l.__exportStar(n("75114"),t),l.__exportStar(n("65503"),t),l.__exportStar(n("75114"),t)},66557:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0})},29960:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MultipleSimpleStore=t.SimpleStore=void 0;let l=n("65503"),r=n("33868");class a extends r.CSTU_Instance{store={};initialValue={};componentList=[];watchList=[];listenerSetData=new Set([]);init=e=>{this.initialValue=e||{},this.store=(0,l.merge)(this.initialValue,this.store)};register=e=>(this.componentList.push(e),()=>{this.componentList=this.componentList.filter(t=>t!==e);let{preserve:t=!0}=e,n=(0,l.getFormatPath)(e.path),r=this.componentList.find(e=>(0,l.getFormatPath)(e.path)===n);if(!t&&!r){let t=(0,l.toArray)(e.path),n=(0,l.getValue)(this.initialValue,t);n!==(0,l.getValue)(this.store,t)&&(this.store=(0,l.setValue)(this.store,t,n))}});registerWatch=e=>(this.watchList.push(e),()=>{this.watchList=this.watchList.filter(t=>t!==e)});updateValue=(e,t,n=!0)=>{let r=(0,l.getValue)(this.store,(0,l.toArray)(e));this.store=(0,l.setValue)(this.store,(0,l.toArray)(e),t),r!==t&&this.noticeWatch(e),"boolean"==typeof n&&n?this.notice(e):Array.isArray(n)&&this.bathNotice(n)};bathUpdateValue=(e,t=!0)=>{e&&(Object.entries(e).forEach(([e,t])=>{this.store=(0,l.setValue)(this.store,(0,l.splitPath)(e),t)}),"boolean"==typeof t&&t?this.bathNotice(Object.keys(e)):Array.isArray(t)&&this.bathNotice(t))};getValue=e=>e?(0,l.getValue)(this.store,(0,l.toArray)(e)):this.store;notice=e=>{let t=(0,l.getFormatPath)(e);this.componentList.filter(e=>(0,l.getFormatPath)(e.path)===t).forEach(e=>{e&&"function"==typeof e.update&&e.update()})};bathNotice=(e=!0)=>{Array.isArray(e)?e.forEach(e=>{e&&this.notice((0,l.splitPath)(e))}):"boolean"==typeof e&&e&&this.componentList.forEach(e=>{e&&"function"==typeof e.update&&e.update()})};noticeWatch=e=>{let t=(0,l.getFormatPath)(e),n=(0,l.getValue)(this.store,(0,l.toArray)(e));this.watchList.forEach(e=>{(0,l.getFormatPath)(e.path)===t&&e.update(n)})};bathRunSelector=()=>{this._crate_CSTU_RunSubscribe("listenerSetData")}}t.SimpleStore=a;class o{store=new Map([]);register=(e,t)=>(this.store.set(e,t),()=>{this.store.delete(e)});getSimple=e=>this.store.get(e)}t.MultipleSimpleStore=o},64878:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getValue=void 0;t.getValue=(e,t)=>{let n=e;for(let e=0;e<t.length;e+=1){if(null==n)return;n=n[t[e]]}return n}},65503:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.splitPath=t.toArray=t.getFormatPath=void 0;let l=n("59390");l.__exportStar(n("64878"),t),l.__exportStar(n("25695"),t),l.__exportStar(n("84992"),t);t.getFormatPath=e=>Array.isArray(e)?e.join("_"):`${e}`;t.toArray=e=>Array.isArray(e)?e:(0,t.splitPath)(`${e}`);t.splitPath=e=>e.split("_").filter(Boolean)},84992:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isEqual=void 0;let l=n("59390").__importDefault(n("50204"));t.isEqual=l.default},25695:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.merge=t.setValue=void 0;let l=n("64878"),r=(e,t,n,l)=>{let a;if(!t.length)return n;let[o,...i]=t;return a=e||"number"!=typeof o?e?Array.isArray(e)?[...e]:{...e}:{}:[],l&&void 0===n&&1===i.length?delete a[o][i[0]]:a[o]=r(a[o],i,n,l),a};t.setValue=(e,t,n,a=!1)=>!Array.isArray(t)||t.length&&a&&void 0===n&&!(0,l.getValue)(e,t.slice(0,-1))?e:r(e,t,n,a);function a(e){return Array.isArray(e)?[]:{}}let o="undefined"==typeof Reflect?Object.keys:Reflect.ownKeys;t.merge=function(...e){let n=a(e[0]);return e.forEach(e=>{!function r(i,u){var m;let s=new Set(u),p=(0,l.getValue)(e,i),c=Array.isArray(p);if(c||"object"==typeof(m=p)&&null!==m&&Object.getPrototypeOf(m)===Object.prototype){if(!s.has(p)){s.add(p);let e=(0,l.getValue)(n,i);c?n=(0,t.setValue)(n,i,[]):(!e||"object"!=typeof e)&&(n=(0,t.setValue)(n,i,a(p))),o(p).forEach(e=>{r([...i,e],s)})}}else n=(0,t.setValue)(n,i,p)}([])}),n}},99343:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return l}});var l={components:{117:function(){Object.defineProperty(t,"__esModule",{value:!0});let e=function(e){return e&&e.__esModule?e:{default:e}}(n("30475")),l=n("61585"),r=t=>{let{index:n}=t,r=(0,l.useSimpleItem)({path:n}),a=r.getValue("checkValue");return e.default.createElement("button",{style:a===n&&{background:"red"}||{},onClick:()=>{let e=r.getValue("checkValue");r.bathUpdateValue({checkValue:n}),r.bathNotice([`${n}`,`${e}`])}},"点击",n,"号")},a=Array.from({length:10}).map((e,t)=>({index:t}));return()=>e.default.createElement("div",null,e.default.createElement("div",null,"选中项"),e.default.createElement("hr",null),e.default.createElement(l.SimpleStoreProvider,null,a.map(t=>e.default.createElement(r,{key:t.index,index:t.index}))),e.default.createElement("hr",null))}(),158:function(){Object.defineProperty(t,"__esModule",{value:!0});let e=function(e){return e&&e.__esModule?e:{default:e}}(n("30475")),l=n("61585"),r=t=>{let n=(0,l.useSimpleItem)({path:t.name}),r=n.getValue(t.name);return e.default.createElement("input",{placeholder:`${t.name}`,value:r||"",onChange:e=>{let l=e.target.value;n.updateValue(t.name,l)}})};return()=>{let[t]=(0,l.useSimpleStore)();return e.default.createElement("div",null,e.default.createElement("div",null,"表单"),e.default.createElement("hr",null),e.default.createElement("button",{onClick:()=>{t.getValue()}},"获取表单值"),e.default.createElement("button",{onClick:()=>{t.updateValue("1号",new Date().getTime().toString())}},"设置 1号值 "),e.default.createElement("br",null),e.default.createElement(l.SimpleStoreProvider,{simple:t},e.default.createElement(r,{name:"1号"}),e.default.createElement(r,{name:"1号"}),e.default.createElement(r,{name:"2号"}),e.default.createElement(r,{name:"3号"}),e.default.createElement(r,{name:"4号"}),e.default.createElement(r,{name:"5号"}),e.default.createElement(r,{name:"5号"}),e.default.createElement(r,{name:"6号"}),e.default.createElement(r,{name:"6号"})),e.default.createElement("hr",null))}}(),218:function(){Object.defineProperty(t,"__esModule",{value:!0});let e=function(e){return e&&e.__esModule?e:{default:e}}(n("30475")),l=n("61585"),r=t=>{let n=(0,l.useSimpleItem)({path:t.name}),r=n.getValue(t.name);return e.default.createElement("input",{placeholder:`${t.name}`,value:r||"",onChange:e=>{let l=e.target.value;n.updateValue(t.name,l)}})};return()=>{let[t]=(0,l.useSimpleStore)();return(0,l.useSimpleWatch)(t,"1号"),(0,l.useSimpleWatch)(t,"1号",e=>{}),e.default.createElement("div",null,e.default.createElement("div",null,"表单"),e.default.createElement("hr",null),e.default.createElement("button",{onClick:()=>{t.updateValue("1号",new Date().getTime().toString())}},"设置 1号值 "),e.default.createElement("br",null),e.default.createElement(l.SimpleStoreProvider,{simple:t},e.default.createElement(r,{name:"1号"}),e.default.createElement(r,{name:"1号"}),e.default.createElement(r,{name:"2号"}),e.default.createElement(r,{name:"3号"}),e.default.createElement(r,{name:"4号"}),e.default.createElement(r,{name:"5号"}),e.default.createElement(r,{name:"5号"}),e.default.createElement(r,{name:"6号"}),e.default.createElement(r,{name:"6号"})),e.default.createElement("hr",null))}}(),276:function(){Object.defineProperty(t,"__esModule",{value:!0});let e=function(e){return e&&e.__esModule?e:{default:e}}(n("30475")),l=n("61585"),r=t=>{let n=(0,l.useSimpleItem)({path:t.name}),{value:r}=(0,l.useSelector)(({instance:e})=>({value:e.store[t.name]}));return e.default.createElement("input",{placeholder:`${t.name}`,value:r||"",onChange:e=>{let l=e.target.value;n.updateValue(t.name,l,!1),n.bathRunSelector()}})};return()=>{let[t]=(0,l.useSimpleStore)();return e.default.createElement("div",null,e.default.createElement("div",null,"表单"),e.default.createElement("hr",null),e.default.createElement("button",{onClick:()=>{t.updateValue("1号",new Date().getTime().toString(),!1),t.bathRunSelector()}},"设置 1号值 "),e.default.createElement("br",null),e.default.createElement(l.SimpleStoreProvider,{simple:t},e.default.createElement(r,{name:"1号"}),e.default.createElement(r,{name:"2号"}),e.default.createElement(r,{name:"3号"}),e.default.createElement(r,{name:"4号"}),e.default.createElement(r,{name:"5号"}),e.default.createElement(r,{name:"5号"}),e.default.createElement(r,{name:"6号"}),e.default.createElement(r,{name:"6号"})),e.default.createElement("hr",null))}}()},data:{117:{name:117,meta:{},code:'"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});const _react=_interop_require_default(require("react"));const _simplestore=require("@carefrees/simple-store");function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}const Child=props=>{const{index}=props;const simple=(0,_simplestore.useSimpleItem)({path:index});const checkValue=simple.getValue("checkValue");const onClick=()=>{const preCheckValue=simple.getValue("checkValue");simple.bathUpdateValue({checkValue:index});simple.bathNotice([`${index}`,`${preCheckValue}`])};console.log("选中项====>",index);return _react.default.createElement("button",{style:checkValue===index&&{background:"red"}||{},onClick:onClick},"点击",index,"号")};const list=Array.from({length:10}).map((_,index)=>({index}));const Demo=()=>{return _react.default.createElement("div",null,_react.default.createElement("div",null,"选中项"),_react.default.createElement("hr",null),_react.default.createElement(_simplestore.SimpleStoreProvider,null,list.map(ite=>_react.default.createElement(Child,{key:ite.index,index:ite.index}))),_react.default.createElement("hr",null))};const BaseCode_Export__default__value=Demo;\nreturn BaseCode_Export__default__value;\n',language:"tsx",value:'import React from "react"\nimport { SimpleStoreProvider, useSimpleItem } from "@carefrees/simple-store"\n\n\nconst Child = (props: { index: number }) => {\n  const { index } = props\n  const simple = useSimpleItem({ path: index })\n\n  // 这个值，当组件不重新渲染的时候，获取的值是老的，当重新渲染才是最新的\n  const checkValue = simple.getValue("checkValue")\n  const onClick = () => {\n    // 取最新的渲染值\n    const preCheckValue = simple.getValue("checkValue")\n    simple.bathUpdateValue({ checkValue: index })\n    simple.bathNotice([`${index}`, `${preCheckValue}`])\n  }\n  console.log("选中项====>", index)\n\n  return <button style={checkValue === index && { background: "red" } || {}} onClick={onClick} >点击{index}号</button>\n}\n\n\nconst list = Array.from({ length: 10 }).map((_, index) => ({ index }))\n\nconst Demo = () => {\n  \n  return <div>\n    <div>选中项</div>\n    <hr />\n    <SimpleStoreProvider>\n      {list.map((ite) => <Child key={ite.index} index={ite.index} />)}\n    </SimpleStoreProvider>\n    <hr />\n  </div>\n}\nexport default Demo;'},158:{name:158,meta:{},code:'"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});const _react=_interop_require_default(require("react"));const _simplestore=require("@carefrees/simple-store");function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}const Item=props=>{const simple=(0,_simplestore.useSimpleItem)({path:props.name});const value=simple.getValue(props.name);const onChange=event=>{const value=event.target.value;simple.updateValue(props.name,value)};console.log("表单====>",props.name);return _react.default.createElement("input",{placeholder:`${props.name}`,value:value||"",onChange:onChange})};const Form=()=>{const[simple]=(0,_simplestore.useSimpleStore)();const onSubmit=()=>{const data=simple.getValue();console.log("获取所有值",data)};const setValue=()=>{simple.updateValue("1号",new Date().getTime().toString())};return _react.default.createElement("div",null,_react.default.createElement("div",null,"表单"),_react.default.createElement("hr",null),_react.default.createElement("button",{onClick:onSubmit},"获取表单值"),_react.default.createElement("button",{onClick:setValue},"设置 1号值 "),_react.default.createElement("br",null),_react.default.createElement(_simplestore.SimpleStoreProvider,{simple:simple},_react.default.createElement(Item,{name:"1号"}),_react.default.createElement(Item,{name:"1号"}),_react.default.createElement(Item,{name:"2号"}),_react.default.createElement(Item,{name:"3号"}),_react.default.createElement(Item,{name:"4号"}),_react.default.createElement(Item,{name:"5号"}),_react.default.createElement(Item,{name:"5号"}),_react.default.createElement(Item,{name:"6号"}),_react.default.createElement(Item,{name:"6号"})),_react.default.createElement("hr",null))};const BaseCode_Export__default__value=Form;\nreturn BaseCode_Export__default__value;\n',language:"tsx",value:'import React from "react"\nimport { SimpleStoreProvider, useSimpleItem, useSimpleStore,useSimpleWatch} from "@carefrees/simple-store"\n\nconst Item = (props: { name: string }) => {\n\n  const simple = useSimpleItem({ path: props.name })\n  const value = simple.getValue(props.name)\n\n  \n\n  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {\n    const value = event.target.value\n    simple.updateValue(props.name, value)\n  }\n\n  console.log("表单====>", props.name)\n\n  return <input placeholder={`${props.name}`}  value={value || \'\'} onChange={onChange}  />\n}\n\nconst Form = () => {\n  const [simple] = useSimpleStore()\n \n  const onSubmit = () => {\n    const data = simple.getValue()\n    console.log("获取所有值", data)\n  }\n\n  const setValue = () => {\n    simple.updateValue("1号", new Date().getTime().toString())\n  }\n\n  return <div>\n    <div>表单</div>\n    <hr />\n    <button onClick={onSubmit} >获取表单值</button>\n    <button onClick={setValue} >设置 1号值 </button>\n    <br />\n    <SimpleStoreProvider simple={simple} >\n      <Item name="1号" />\n      <Item name="1号" />\n      <Item name="2号" />\n      <Item name="3号" />\n      <Item name="4号" />\n      <Item name="5号" />\n      <Item name="5号" />\n      <Item name="6号" />\n      <Item name="6号" />\n    </SimpleStoreProvider>\n    <hr />\n  </div>\n}\n\nexport default Form\n'},218:{name:218,meta:{},code:'"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});const _react=_interop_require_default(require("react"));const _simplestore=require("@carefrees/simple-store");function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}const Item=props=>{const simple=(0,_simplestore.useSimpleItem)({path:props.name});const value=simple.getValue(props.name);const onChange=event=>{const value=event.target.value;simple.updateValue(props.name,value)};return _react.default.createElement("input",{placeholder:`${props.name}`,value:value||"",onChange:onChange})};const Form=()=>{const[simple]=(0,_simplestore.useSimpleStore)();const values=(0,_simplestore.useSimpleWatch)(simple,"1号");(0,_simplestore.useSimpleWatch)(simple,"1号",value=>{console.log("打印哈哈哈====>",value)});console.log("监听 1号 字段 的值变化",values);const setValue=()=>{simple.updateValue("1号",new Date().getTime().toString())};return _react.default.createElement("div",null,_react.default.createElement("div",null,"表单"),_react.default.createElement("hr",null),_react.default.createElement("button",{onClick:setValue},"设置 1号值 "),_react.default.createElement("br",null),_react.default.createElement(_simplestore.SimpleStoreProvider,{simple:simple},_react.default.createElement(Item,{name:"1号"}),_react.default.createElement(Item,{name:"1号"}),_react.default.createElement(Item,{name:"2号"}),_react.default.createElement(Item,{name:"3号"}),_react.default.createElement(Item,{name:"4号"}),_react.default.createElement(Item,{name:"5号"}),_react.default.createElement(Item,{name:"5号"}),_react.default.createElement(Item,{name:"6号"}),_react.default.createElement(Item,{name:"6号"})),_react.default.createElement("hr",null))};const BaseCode_Export__default__value=Form;\nreturn BaseCode_Export__default__value;\n',language:"tsx",value:'import React from "react"\nimport { SimpleStoreProvider, useSimpleItem, useSimpleStore,useSimpleWatch} from "@carefrees/simple-store"\n\nconst Item = (props: { name: string }) => {\n  const simple = useSimpleItem({ path: props.name })\n  const value = simple.getValue(props.name)\n\n  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {\n    const value = event.target.value\n    simple.updateValue(props.name, value)\n  }\n  return <input placeholder={`${props.name}`}  value={value || \'\'} onChange={onChange}  />\n}\n\nconst Form = () => {\n\n  const [simple] = useSimpleStore()\n  /**监听*/\n  const values = useSimpleWatch(simple,"1号")\n\n  /**监听*/\n  useSimpleWatch(simple,"1号",(value)=>{\n    console.log("打印哈哈哈====>",value)\n  })\n\n  console.log("监听 1号 字段 的值变化",values)\n\n  const setValue = () => {\n    simple.updateValue("1号", new Date().getTime().toString())\n  }\n\n  return <div>\n    <div>表单</div>\n    <hr />\n    <button onClick={setValue} >设置 1号值 </button>\n    <br />\n    <SimpleStoreProvider simple={simple} >\n      <Item name="1号" />\n      <Item name="1号" />\n      <Item name="2号" />\n      <Item name="3号" />\n      <Item name="4号" />\n      <Item name="5号" />\n      <Item name="5号" />\n      <Item name="6号" />\n      <Item name="6号" />\n    </SimpleStoreProvider>\n    <hr />\n  </div>\n}\n\nexport default Form\n'},276:{name:276,meta:{},code:'"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});const _react=_interop_require_default(require("react"));const _simplestore=require("@carefrees/simple-store");function _interop_require_default(obj){return obj&&obj.__esModule?obj:{default:obj}}const Item=props=>{const simple=(0,_simplestore.useSimpleItem)({path:props.name});const{value}=(0,_simplestore.useSelector)(({instance})=>({value:instance.store[props.name]}));const onChange=event=>{const value=event.target.value;simple.updateValue(props.name,value,false);simple.bathRunSelector()};console.log(`useSelector===${props.name}===>`,simple,value);return _react.default.createElement("input",{placeholder:`${props.name}`,value:value||"",onChange:onChange})};const Form=()=>{const[simple]=(0,_simplestore.useSimpleStore)();const setValue=()=>{simple.updateValue("1号",new Date().getTime().toString(),false);simple.bathRunSelector()};console.log("simple====>",simple);return _react.default.createElement("div",null,_react.default.createElement("div",null,"表单"),_react.default.createElement("hr",null),_react.default.createElement("button",{onClick:setValue},"设置 1号值 "),_react.default.createElement("br",null),_react.default.createElement(_simplestore.SimpleStoreProvider,{simple:simple},_react.default.createElement(Item,{name:"1号"}),_react.default.createElement(Item,{name:"2号"}),_react.default.createElement(Item,{name:"3号"}),_react.default.createElement(Item,{name:"4号"}),_react.default.createElement(Item,{name:"5号"}),_react.default.createElement(Item,{name:"5号"}),_react.default.createElement(Item,{name:"6号"}),_react.default.createElement(Item,{name:"6号"})),_react.default.createElement("hr",null))};const BaseCode_Export__default__value=Form;\nreturn BaseCode_Export__default__value;\n',language:"tsx",value:'import React from "react"\nimport { SimpleStoreProvider, useSimpleItem, useSimpleStore,useSimpleWatch ,useSelector } from "@carefrees/simple-store"\n\nconst Item = (props: { name: string }) => {\n  const simple = useSimpleItem({ path: props.name })\n  const { value } = useSelector(({ instance })=> ({ value:instance.store[props.name] }))\n  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {\n    const value = event.target.value\n    simple.updateValue(props.name, value,false)\n    /**手动触发 useSelector 执行选择器*/\n    simple.bathRunSelector()\n  }\n\n  console.log(`useSelector===${props.name}===>`,simple,value)\n\n  return <input placeholder={`${props.name}`}  value={value || \'\'} onChange={onChange}  />\n}\n\nconst Form = () => {\n\n  const [simple] = useSimpleStore()\n\n  const setValue = () => {\n    simple.updateValue("1号", new Date().getTime().toString(),false)\n    /**手动触发 useSelector 执行选择器*/\n    simple.bathRunSelector()\n  }\n  console.log("simple====>",simple)\n\n  return <div>\n    <div>表单</div>\n    <hr />\n    <button onClick={setValue} >设置 1号值 </button>\n    <br />\n    <SimpleStoreProvider simple={simple} >\n      <Item name="1号" />\n      <Item name="2号" />\n      <Item name="3号" />\n      <Item name="4号" />\n      <Item name="5号" />\n      <Item name="5号" />\n      <Item name="6号" />\n      <Item name="6号" />\n    </SimpleStoreProvider>\n    <hr />\n  </div>\n}\n\nexport default Form\n'}},source:'# `simple-store`\n\n状态管理\n\n- [X] 1. 定向更新组件\n- [X] 2. 数据存储\n- [X] 3. 监听值变化\n\n## 状态包裹组件\n\n- `SimpleStoreProvider`\n- `MultipleSimplProvider` \n\n## hooks\n\n- `useSimpleStore` 实例化方法\n- `useSimpleWatch` 监听值变化\n- `useSimple` 子组件中获取实例\n- `useSimpleItem` 子组件使用数据更新和取值\n- `useMultipleSimpleStore`实例化收集多个状态管理方法\n- `useMultipleSimple` 子组件中获取实例\n\n## 参数\n\n```ts\n/**状态存储*/\nexport declare class SimpleStore<T extends {} = any> {\n    /**值存储*/\n    private store;\n    private initialValue;\n    /**组件更新方法集合*/\n    componentList: RegisterProps[];\n    /**监听字段值变化*/\n    watchList: RegisterWatchProps[];\n    /**设置初始值*/\n    init: (initialValue?: T) => void;\n    /**注册组件更新方法*/\n    register: (props: RegisterProps) => () => void;\n    /**注册监听字段*/\n    registerWatch: (props: RegisterWatchProps) => () => void;\n    /**更新值*/\n    updateValue: <K = any>(path: PathTypes, value: K, notice?: boolean | string[]) => void;\n    /**批量数据更新*/\n    bathUpdateValue: (values: Record<string, any>, notice?: boolean | string[]) => void;\n    /**获取值*/\n    getValue: (path?: PathTypes) => any;\n    /**通知组件更新*/\n    notice: (path: PathTypes) => void;\n    /**\n     * 批量更新组件，\n     *\n     * 当不传递值的时候，更新所有组件\n    */\n    bathNotice: (paths?: string[] | boolean) => void;\n    /**通知监听*/\n    noticeWatch: (path: PathTypes) => void;\n}\n\nexport type PathTypes = number | string | (number | string)[]\n\nexport interface RegisterProps {\n  path: PathTypes,\n  update: Function\n  /**是否保存*/\n  preserve?: boolean\n}\n\nexport declare class MultipleSimpleStore {\n    /**数据存储*/\n    store: Map<string, SimpleStore>;\n    /**注册*/\n    register: (path: string, simple: SimpleStore) => void;\n    /**获取单个 simple */\n    getSimple: (path: string) => SimpleStore<any>;\n}\n\nexport interface RegisterWatchProps {\n    path: PathTypes;\n    update: (value: any) => void;\n}\nexport interface SimpleStoreProviderProps<T extends {} = any> {\n    simple?: SimpleStore;\n    children?: React.ReactNode;\n    initialValue?: T;\n    path?: string;\n}\nexport interface UseSimpleStoreItemProps {\n    /**路径*/\n    path: PathTypes;\n}\nexport interface UseSimpleItemProps extends UseSimpleStoreItemProps {\n}\nexport interface MultipleSimplProviderProps {\n    multipleSimple?: MultipleSimpleStore;\n    children?: React.ReactNode;\n}\n\nimport { SimpleStoreProviderProps, PathTypes, UseSimpleItemProps, MultipleSimplProviderProps } from "./interface";\nexport declare const SimpleContext: import("react").Context<SimpleStore<any>>;\nexport declare const MultipleSimpleContext: import("react").Context<MultipleSimpleStore>;\nexport declare const useSimpleStore: <T extends {} = any>(simple?: SimpleStore) => SimpleStore<T>[];\nexport declare const useMultipleSimpleStore: (multipleSimple?: MultipleSimpleStore) => MultipleSimpleStore[];\nexport declare const SimpleStoreProvider: <T extends {} = any>(props: SimpleStoreProviderProps<T>) => import("react").FunctionComponentElement<import("react").ProviderProps<SimpleStore<any>>>;\nexport declare const MultipleSimplProvider: (props: MultipleSimplProviderProps) => import("react").FunctionComponentElement<import("react").ProviderProps<MultipleSimpleStore>>;\n/**更新页面状态*/\nexport declare const useUpdate: () => import("react").MutableRefObject<Function>;\nexport declare const useSimple: <T extends {} = any>() => SimpleStore<T>;\nexport declare const useMultipleSimple: () => MultipleSimpleStore;\nexport declare const useSimpleStoreItem: <T extends {} = any>(props: UseSimpleItemProps) => SimpleStore<T>;\nexport declare const useSimpleItem: <T extends {} = any>(props: UseSimpleItemProps) => SimpleStore<T>;\nexport declare const useSimpleWatch: <T extends {} = any>(simple: SimpleStore<T>, path: PathTypes, fun?: (value: any) => void) => any;\n\n```\n\n## 选中案例\n\n```tsx mdx:preview\nimport React from "react"\nimport { SimpleStoreProvider, useSimpleItem } from "@carefrees/simple-store"\n\n\nconst Child = (props: { index: number }) => {\n  const { index } = props\n  const simple = useSimpleItem({ path: index })\n\n  // 这个值，当组件不重新渲染的时候，获取的值是老的，当重新渲染才是最新的\n  const checkValue = simple.getValue("checkValue")\n  const onClick = () => {\n    // 取最新的渲染值\n    const preCheckValue = simple.getValue("checkValue")\n    simple.bathUpdateValue({ checkValue: index })\n    simple.bathNotice([`${index}`, `${preCheckValue}`])\n  }\n  console.log("选中项====>", index)\n\n  return <button style={checkValue === index && { background: "red" } || {}} onClick={onClick} >点击{index}号</button>\n}\n\n\nconst list = Array.from({ length: 10 }).map((_, index) => ({ index }))\n\nconst Demo = () => {\n  \n  return <div>\n    <div>选中项</div>\n    <hr />\n    <SimpleStoreProvider>\n      {list.map((ite) => <Child key={ite.index} index={ite.index} />)}\n    </SimpleStoreProvider>\n    <hr />\n  </div>\n}\nexport default Demo;\n```\n\n## 表单案例\n\n```tsx mdx:preview\nimport React from "react"\nimport { SimpleStoreProvider, useSimpleItem, useSimpleStore,useSimpleWatch} from "@carefrees/simple-store"\n\nconst Item = (props: { name: string }) => {\n\n  const simple = useSimpleItem({ path: props.name })\n  const value = simple.getValue(props.name)\n\n  \n\n  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {\n    const value = event.target.value\n    simple.updateValue(props.name, value)\n  }\n\n  console.log("表单====>", props.name)\n\n  return <input placeholder={`${props.name}`}  value={value || \'\'} onChange={onChange}  />\n}\n\nconst Form = () => {\n  const [simple] = useSimpleStore()\n \n  const onSubmit = () => {\n    const data = simple.getValue()\n    console.log("获取所有值", data)\n  }\n\n  const setValue = () => {\n    simple.updateValue("1号", new Date().getTime().toString())\n  }\n\n  return <div>\n    <div>表单</div>\n    <hr />\n    <button onClick={onSubmit} >获取表单值</button>\n    <button onClick={setValue} >设置 1号值 </button>\n    <br />\n    <SimpleStoreProvider simple={simple} >\n      <Item name="1号" />\n      <Item name="1号" />\n      <Item name="2号" />\n      <Item name="3号" />\n      <Item name="4号" />\n      <Item name="5号" />\n      <Item name="5号" />\n      <Item name="6号" />\n      <Item name="6号" />\n    </SimpleStoreProvider>\n    <hr />\n  </div>\n}\n\nexport default Form\n\n```\n\n## 数据监听\n\n```tsx mdx:preview\nimport React from "react"\nimport { SimpleStoreProvider, useSimpleItem, useSimpleStore,useSimpleWatch} from "@carefrees/simple-store"\n\nconst Item = (props: { name: string }) => {\n  const simple = useSimpleItem({ path: props.name })\n  const value = simple.getValue(props.name)\n\n  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {\n    const value = event.target.value\n    simple.updateValue(props.name, value)\n  }\n  return <input placeholder={`${props.name}`}  value={value || \'\'} onChange={onChange}  />\n}\n\nconst Form = () => {\n\n  const [simple] = useSimpleStore()\n  /**监听*/\n  const values = useSimpleWatch(simple,"1号")\n\n  /**监听*/\n  useSimpleWatch(simple,"1号",(value)=>{\n    console.log("打印哈哈哈====>",value)\n  })\n\n  console.log("监听 1号 字段 的值变化",values)\n\n  const setValue = () => {\n    simple.updateValue("1号", new Date().getTime().toString())\n  }\n\n  return <div>\n    <div>表单</div>\n    <hr />\n    <button onClick={setValue} >设置 1号值 </button>\n    <br />\n    <SimpleStoreProvider simple={simple} >\n      <Item name="1号" />\n      <Item name="1号" />\n      <Item name="2号" />\n      <Item name="3号" />\n      <Item name="4号" />\n      <Item name="5号" />\n      <Item name="5号" />\n      <Item name="6号" />\n      <Item name="6号" />\n    </SimpleStoreProvider>\n    <hr />\n  </div>\n}\n\nexport default Form\n\n```\n\n## useSelector使用\n\n```tsx mdx:preview\nimport React from "react"\nimport { SimpleStoreProvider, useSimpleItem, useSimpleStore,useSimpleWatch ,useSelector } from "@carefrees/simple-store"\n\nconst Item = (props: { name: string }) => {\n  const simple = useSimpleItem({ path: props.name })\n  const { value } = useSelector(({ instance })=> ({ value:instance.store[props.name] }))\n  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {\n    const value = event.target.value\n    simple.updateValue(props.name, value,false)\n    /**手动触发 useSelector 执行选择器*/\n    simple.bathRunSelector()\n  }\n\n  console.log(`useSelector===${props.name}===>`,simple,value)\n\n  return <input placeholder={`${props.name}`}  value={value || \'\'} onChange={onChange}  />\n}\n\nconst Form = () => {\n\n  const [simple] = useSimpleStore()\n\n  const setValue = () => {\n    simple.updateValue("1号", new Date().getTime().toString(),false)\n    /**手动触发 useSelector 执行选择器*/\n    simple.bathRunSelector()\n  }\n  console.log("simple====>",simple)\n\n  return <div>\n    <div>表单</div>\n    <hr />\n    <button onClick={setValue} >设置 1号值 </button>\n    <br />\n    <SimpleStoreProvider simple={simple} >\n      <Item name="1号" />\n      <Item name="2号" />\n      <Item name="3号" />\n      <Item name="4号" />\n      <Item name="5号" />\n      <Item name="5号" />\n      <Item name="6号" />\n      <Item name="6号" />\n    </SimpleStoreProvider>\n    <hr />\n  </div>\n}\n\nexport default Form\n\n```',headings:[],headingsList:[]}}}]);