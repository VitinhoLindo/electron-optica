import Event from './event'

class Variables extends Event {
  keyAlgorithm: string;
  hashAlgorithm: string;
  modulusLength: number;
  publicExponent: Uint8Array;
  ivLen: number;
  crypto: Crypto;
  keys: {
    app: {
      publicKey?: CryptoKey,
      privateKey?: CryptoKey
    },
    server: {
      publicKey?: CryptoKey,
      ivs?: []
    }
  };

  constructor() {
    super();

    this.keyAlgorithm = 'RSA-OAEP';
    this.hashAlgorithm = 'SHA-512';
    this.modulusLength = 4096;
    this.publicExponent = new Uint8Array([1, 0, 1]);
    this.ivLen = 32;
    this.crypto = window.crypto;
    this.keys = {
      app: {},
      server: {}
    };
  }
}

export default Variables;