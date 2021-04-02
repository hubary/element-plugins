/**
 * 判断一个属性是否存在
 * @param obj 数据对象
 * @param key 要查找的键名
 * @returns {boolean}
 */
export function isInclude(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

//判断数据类型
export const isType = {
  isDataType(type) {
    return function (content) {
      return Object.prototype.toString.call(content) === `[object ${type}]`;
    };
  },
  init() {
    let arr = ['String', 'Boolean', 'Undefined', 'Array', 'Object', 'Number', 'Symbol', 'Function'],
      _self = this;
    arr.forEach((type) => {
      _self[`is${type}`] = _self.isDataType(type);
    });
  },
};
isType.init();

/**
 * @param {string} path
 * @returns {Boolean}
 */
// export function isExternal(path) {
//   return /^(https?:|mailto:|tel:)/.test(path);
// }

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

export function debounce(fn, delay) {
  var ctx;
  var args;
  var timer = null;
  var later = function () {
    fn.apply(ctx, args);
    // 当事件真正执行后，清空定时器
    timer = null;
  };
  return function () {
    ctx = this;
    args = arguments;
    // 当持续触发事件时，若发现事件触发的定时器已设置时，则清除之前的定时器
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    // 重新设置事件触发的定时器
    timer = setTimeout(later, delay);
  };
}