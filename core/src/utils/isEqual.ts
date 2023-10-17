
type VarType = string | number | boolean | Object | Function | Symbol | undefined | bigint

function isObject(value: VarType) {
  return (typeof value === 'object' && null !== value);
}

export function isEqual(value: VarType, other: VarType) {
  // 1.判断是不是引用类型，不是引用
  if (!isObject(value) || !isObject(other)) {
    return value === other;
  }
  // 2.比较是否为同一个内存地址
  if (value === other) return true;
  // 3.比较 key 的数量
  const valueKeysLength = Object.keys(value).length;
  const otherKeysLength = Object.keys(other).length;
  if (valueKeysLength !== otherKeysLength) return false;

  // 4.比较 value 的值
  if (typeof value === "object")
    for (let key in value) {
      const result = isEqual(value[key], other[key]);
      if (!result) return false;
    }
  return true;
}
