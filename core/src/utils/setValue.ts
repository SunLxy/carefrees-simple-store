import { getValue } from './getValue';

const internalSet = <Entity = any, Output = Entity, Value = any>(
  input: Entity,
  paths: (string | number)[],
  value: Value,
  removeUndefined: boolean,
): Output => {
  if (!paths.length) {
    return value as unknown as Output;
  }

  const [path, ...restPath] = paths;

  let clone: Output;
  // 判断 input 不存在 并且 第一个路径为数值类型
  if (!input && typeof path === 'number') {
    clone = [] as unknown as Output;
  } else if (!input) {
    // input 不存在  默认 对象
    clone = {} as unknown as Output;
  } else if (Array.isArray(input)) {
    // 判断 input 是否是数组
    clone = [...input] as unknown as Output;
  } else {
    // 其他就是 对象
    clone = { ...input } as unknown as Output;
  }

  // 当是否移除undefined===true 时并且 value===undefined 时移除最后一项
  if (removeUndefined && value === undefined && restPath.length === 1) {
    delete clone[path][restPath[0]];
  } else {
    // 递归赋值
    clone[path] = internalSet(clone[path], restPath, value, removeUndefined);
  }

  return clone;
};

/***设置值*/
export const setValue = <Entity = any, Output = Entity, Value = any>(
  input: Entity,
  paths: (string | number)[],
  value: Value,
  removeUndefined: boolean = false,
): Output => {
  if (!Array.isArray(paths)) {
    console.warn('paths 参数是数组');
    return input as unknown as Output;
  }

  // 当是否移除undefined===true 时 value 为undefined 并且 input倒数第二个值不存在时直接返回
  if (
    paths.length &&
    removeUndefined &&
    value === undefined &&
    !getValue(input, paths.slice(0, -1))
  ) {
    return input as unknown as Output;
  }

  return internalSet(input, paths, value, removeUndefined);
};
