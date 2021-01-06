type DataTypes = 
  'Nullable'   |
  'Array'      |
  'Object'     |
  'Number'     |
  'String'     |
  'Promise'    |
  'Function'   |
  'ArrayBuffer'|
  'Uint8Array' |
  'Uint16Array'|
  'Uint32Array'|
  'Int8Array'  |
  'Int16Array' |
  'Int32Array' |
  'Undefined'  |
  'Blob'       |
  'Date';

export default function (arg: any): DataTypes {
  if (arg == null || arg == undefined) return 'Nullable';
  let name = arg.constructor.name;

  switch(name) {
    case 'Array':
    case 'Object':
    case 'Number':
    case 'String':
    case 'Promise':
    case 'Function':
    case 'ArrayBuffer':
    case 'Uint8Array':
    case 'Uint16Array':
    case 'Uint32Array':
    case 'Int8Array':
    case 'Int16Array':
    case 'Int32Array':
    case 'Blob':
    case 'Date':
      return name;
    default: return 'Undefined';
  }
}