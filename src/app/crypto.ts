import Variables from './variables'
import Types from './types'

type EncDec = { [key: string]: any };

class Crypto extends Variables {
  constructor() {
    super();
  }

  async generateKeys(): Promise<void> {
    /**
     * gera chaves
     * 
     * name: 'RSA-OAEP'
     * hash: 'SHA-512'
     * modulusLength: 4096
     * publicExponent: 0x01, 0x00, 0x01
     */
    let { privateKey, publicKey } = await this.crypto.subtle.generateKey({
      name: this.keyAlgorithm,
      hash: this.hashAlgorithm,
      modulusLength: this.modulusLength,
      publicExponent: this.publicExponent
    }, true, ['encrypt', 'decrypt']);

    this.keys.app = {
      privateKey,
      publicKey
    }
  }

  async exportKey(key: any, type: 'pkcs8' | 'spki' ) {
    try {
      let exported = await this.crypto.subtle.exportKey(type, key);

      return this.arrayBufferToHex(exported);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  EncDecObject(): EncDec {
    return {};
  }

  async EncryptDecrypt(value: any, func: 'encrypt' | 'decrypt'): Promise<any> {
    switch(Types(value)) {
      case 'Array' :
        let EncDecArray = [];
        for(let data of value) {
          EncDecArray.push(await this.EncryptDecrypt(data, func));
        }
        return EncDecArray;
      case 'Object':
        let EncDecObject = this.EncDecObject();  
        for(let key in value) {
          let k = await this[func](key);
          let v = await this.EncryptDecrypt(value[key], func);

          EncDecObject[k] = v;
        }
        return EncDecObject;
      case 'Date':
        return await this[func](value.toJSON());
      case 'String':
        return await this[func](value);
      case 'Number':
        return await this[func](value.toString());
      case 'Nullable':
      default:
        return null;
    }
  }

  async encrypt(value: string): Promise<string> {
    return '';
  }

  async decrypt(value: string): Promise<string> {
    return '';
  }
}

export default Crypto;