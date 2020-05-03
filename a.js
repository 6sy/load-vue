// const obj = {
//   arr: [1, 1],
//   obj: { key: 11 },
//   a: () => { },
//   date: new Date(),
//   reg: /reg/g,
//   null: null,
//   undefined: undefined
// }
// obj1 = JSON.parse(JSON.stringify(obj))
// console.log(obj1)
// console.log(obj1 === obj)
// console.log(obj1.obj === obj.obj)

function isObj (obj) {
  return typeof obj === 'object' && (obj !== null)
}
function clone (obj, hash = new WeakMap()) {
  let tempobj, constructor
  constructor = obj.constructor
  switch (constructor) {
    case RegExp:
      tempobj = new constructor(obj)
      break;
    case Date:
      tempobj = new constructor(obj)
      break;
    default:
      if (hash.has(obj)) return hash.get(obj)
      tempobj = Array.isArray(obj) ? [] : {}
      hash.set(obj, tempobj)
  }
  for (let key in obj) {
    tempobj[key] = isObj(obj[key]) ? clone((obj[key]), hash) : obj[key]
  }
  return tempobj
}
const obj = {
  arr: [1, 1],
  obj: { key: 11 },
  a: function a () { },
  date: new Date(),
  reg: /reg/g,
  null: null,
  undefined: undefined
}
obj.obj = obj
let a = clone(obj)
console.log(a)

String(123)   //'123'
String(1.23)   //'1.23'
String(null)  //'null'
String(undefined)  //undefined
String(true)    // 'true'
String(Symbol('sym'))  //'Symbol('sym') '


Number('1')    //1
Number('1a')   //NaN
Number(null)   //0
Number(undefined)  //NaN
Number(false)   //0
Number(true)    //1