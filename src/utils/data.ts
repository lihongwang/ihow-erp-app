import each from 'lodash/each'
import union from 'lodash/union'
import { create, all } from 'mathjs'
export const objectToArray = (obj: any, keyName?: string) => {
  const arr: any = []
  Object.keys(obj).forEach((k: string) => {
    arr.push({ [keyName || 'key']: k, ...obj[k] })
  })
  return arr
}
export const arrayToObject = (arr: any, key: string, format?: any) => {
  const obj: any = {}
  arr.forEach((a: any, i: number) => (obj[a[key]] = format ? format(a, i) : a))
  return obj
}

export const flatData = (data: any, childKey = 'children') => {
  let result: any = []
  each(data, (d: any) => {
    result.push({ ...d })
    d[childKey] && (result = union(result, flatData(d[childKey], childKey)))
  })
  return result
}

const math = create(all, {
  epsilon: 1e-12,
  matrix: 'Matrix',
  number: 'BigNumber',
  precision: 64,
  predictable: false,
  randomSeed: null,
})
export const compute = (express: any) => {
  try {
    return Number(math.format(math.evaluate(express)))
  } catch (err) {
    return NaN
  }
}
export const fixNumber = (value: any, fixed = 2, defaultValue: any = 0) => {
  // return Number(value || 0).toFixed(fixed);
  if ([undefined, null, NaN].includes(value)) {
    return 0
  }
  const val = Number(math.chain(value).round(fixed).done())
  const tplVal = isNaN(Number(val)) ? defaultValue : val
  return tplVal
  // return round(Number(value || 0), fixed);
}

// export const arrayToTree = (array:any, options:any) => {
//   options = Object.assign(
//     {
//       id: "id",
//       pid: "parentId",
//       children: "children",
//       firstPid: "0",
//     },
//     options
//   );
//   const groupArray:any = groupBy(cloneDeep(array), (a) => a[options.pid]);
//   const firstArray = groupArray[options.firstPid];
//   const children:any = options.children;
//   const transform = (startList:any) => {
//     if (startList) {
//       each(startList, (item:any) => {
//         groupArray[item[options.id]] &&
//           (item[[children]] = groupArray[item[options.id]]);
//         transform(item[options.children]);
//       });
//     }
//   };
//   transform(firstArray);
//   return firstArray;
// };

export const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const generateError = ({ msg, name }: { msg: string; name: string }) => {
  const error = new Error()
  error.message = msg
  error.name = name
  return error
}
export const randomChar = (str: string) => {
  const alphabet = str || 'abcdefghijklmnopqrstuvwxyz'
  return alphabet[~~(Math.random() * alphabet.length)]
}
export const randomCharWithLength = (length: number, str: string) => {
  return Array(length)
    .fill('')
    .reduce((acc) => acc + randomChar(str), '')
}

export const getMiddleChar = (str: string) => {
  return [...str].filter((char, index) => index !== (str.length - 1) / 2).join('')
}
