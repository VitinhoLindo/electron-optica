import Util from './Util'

export default class Convert extends Util {
  constructor() { super() }

  // private method for UTF-8 encoding
  utf8_encode(string) {
    var utftext = "";
    string = string.replace(/\r\n/g,"\n");

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  }

  // private method for UTF-8 decoding
  utf8_decode(utf8text) {
    var string = "",
    i  = 0,
    c2 = i,
    c1 = c2,
    c  = c1;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }

    return string;
  }

  /**
       * @param {String} input 
       * 
       *  convert string to base64
       * 
       * @returns String[Base64]
       */
  stringToBase64(string = '') {
    let buffer = this.stringToBuffer(this.utf8_encode(string))
    return this.bufferToBase64(buffer)
  }

  /**
   * @param {String} input 
   * 
   *  convert base64 to String[utf-8]
   * 
   * @returns String[utf-8]
   */
  base64ToString(base64 = '') {
    let buffer = this.base64ToBuffer(base64)
    return this.utf8_decode(this.bufferToString(buffer))
  }

  /**
   * @param {ArrayBuffer} buffer 
   * 
   *  convert buffer to base64
   * 
   * @returns String[base64]
   */
  bufferToBase64(buffer = new ArrayBuffer(0)) {
    var array = this.bufferToArray(buffer),
        output = "",
        chr1, chr2, chr3, enc1, enc2, enc3, enc4,
        i = 0

    while (i < array.length) {
      chr1 = array[i++];
      chr2 = array[i++];
      chr3 = array[i++];

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) { enc3 = enc4 = 64; } 
      else if (isNaN(chr3)) { enc4 = 64; }

      output = output +
              this.constants.convert.base64Keys.charAt(enc1) + 
              this.constants.convert.base64Keys.charAt(enc2) +
              this.constants.convert.base64Keys.charAt(enc3) + 
              this.constants.convert.base64Keys.charAt(enc4);
    }

    return output;
  }

  /**
   * @param {String} base64 
   * 
   *  convert base64 to Buffer
   * 
   * @returns ArrayBuffer
   */
  base64ToBuffer(base64 = '') {
    var bytes = [],
        chr1, chr2, chr3,
        enc1, enc2, enc3, enc4,
        i = 0;
    base64 = base64.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < base64.length) {
      enc1 = this.constants.convert.base64Keys.indexOf(base64.charAt(i++));
      enc2 = this.constants.convert.base64Keys.indexOf(base64.charAt(i++));
      enc3 = this.constants.convert.base64Keys.indexOf(base64.charAt(i++));
      enc4 = this.constants.convert.base64Keys.indexOf(base64.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      bytes.push(chr1)
      if (enc3 != 64) bytes.push(chr2)
      if (enc4 != 64) bytes.push(chr3)
    }

    return this.arrayToBuffer(bytes)
  }

  /**
   * @param {Number} array 
   * 
   *  convert array to buffer
   * 
   * @returns ArrayBuffer
   */
  arrayToBuffer(array = []) {
    let bytes = new Uint8Array(array.length)

    for(let index in array)
      bytes[index] = array[index]

    return bytes.buffer;
  }

  /**
   * @param {ArrayBuffer} buffer 
   * 
   *  convert buffer to Array
   * 
   * @returns Array[Number]
   */
  bufferToArray(buffer = new ArrayBuffer(0)) {
    let bytes = new Uint8Array(buffer),
        array = [];

    for(let byte of bytes) array.push(byte)
    return array;
  }

  /**
   * @param {String} hexadecimal 
   * 
   *  convert String[Hexadecimal] to buffer
   * 
   * @returns ArrayBuffer
   */
  hexadecimalToBuffer(hexadecimal = '') {
    let bytes = new Uint8Array(hexadecimal.length / 2)

    for(let index in bytes) {
      let start = index * 2,
          end   = start + 2,
          hex  = hexadecimal.substring(start, end)

      bytes[index] = parseInt(hex, 16)
    }

    return bytes.buffer
  }

  /**
   * @param {String} hexadecimal 
   * 
   *  convert String[Hexadecimal] to String[utf-8]
   * 
   * @returns String[utf-8]
   */
  hexadecimalToString(hexadecimal = '') {
    let buffer = this.hexadecimalToBuffer(hexadecimal)
    return this.bufferToString(buffer)
  }

  /**
   * @param {ArrayBuffer} buffer 
   * 
   *  convert buffer to String[Hexadecimal]
   * 
   * @returns String[Hexadecimal]
   */
  bufferToHexadecimal(buffer = new ArrayBuffer(0)) {
    let bytes = new Uint8Array(buffer),
        hexadecimal = ''

    for(let byte of bytes) {
      let hex = byte.toString(16)
      hexadecimal += ((`000${hex}`).slice(-2)).toUpperCase()
    }

    return hexadecimal
  }

  /**
   * @param {String} value 
   * 
   *  convert String[utf-8] to buffer
   * 
   * @returns ArrayBuffer
   */
  stringToBuffer(string = '') {
    let characters = unescape(encodeURIComponent(string))
    let bytes = new Uint8Array(characters.length)

    for(let index in characters)
      bytes[index] = characters.charCodeAt(index)

    return bytes.buffer
  }

  /**
   * @param {ArrayBuffer} buffer 
   * 
   *  convert buffer to String[utf-8]
   * 
   * @returns String[utf-8]
   */
  bufferToString(buffer = new ArrayBuffer(0)) {
    let bytes = new Uint8Array(buffer),
        string = ''

    for(let byte of bytes) string += String.fromCharCode(byte)
    return string
  }

  bufferTo(buffer = new ArrayBuffer(0), encoding = 'hex') {
    if (typeof encoding !== 'string') encoding = 'hex'
    else if (['hex', 'base64', 'utf-8'].indexOf(encoding) < 0) throw new Error(`invalid format to convert ${encoding}`)
    let data = {
      format: encoding,
      value: null
    }
    if (!(buffer instanceof ArrayBuffer)) throw new Error(`invalid value type to convert`)

    switch (encoding) {
      case 'hex':    data.value = this.bufferToHexadecimal(buffer); break
      case 'base64': data.value = this.bufferToBase64(buffer);      break
      case 'utf-8':  data.value = this.bufferToString(buffer);      break
    }

    return data
  }

  toBuffer(string, encoding = 'hex') {
    if (typeof encoding === 'undefined') encoding = 'hex'
    else if (['hex', 'base64', 'utf-8'].indexOf(encoding) < 0) throw new Error(`invalid format to convert ${encoding}`)
    let data = null

    if (typeof string !== 'string')
      throw new Error(`invalid value type to convert: ${typeof string}`)

    switch (encoding) {
      case 'hex':    data = this.hexadecimalToBuffer(string); break
      case 'base64': data = this.base64ToBuffer(string);      break
      case 'utf-8':  data = this.stringToBuffer(string);      break
    }

    return data
  }
}