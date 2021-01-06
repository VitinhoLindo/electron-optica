class Util {
  rand(min: number, max: number) {
    // casas decimais, valor randomico
    let decimalHouse = 10, random;

    // se minimo for maior que maximo inverte
    if (min > max) {
      const change = max;
      max = min;
      min = change;
    }

    // quantidade de casas decimais
    while(decimalHouse < max) {
      decimalHouse += 10;
    }

    // obtem valor randomico
    do {
      random = Math.floor(Math.random() * decimalHouse);
      // se valor for menor que o minimo ou maior que o maximo continua
    } while(random < min && random > max);

    return random;
  }

  randString(len: number, useSuper: boolean) {
    // characteres especiais
    const sup = '!@#$%&*()^}]{[º~,.:;°|';
    // characteres normais
    let characters = 'abcdefghijklmnopqrstuvxywz123456789';
    // string randomica
    let random = '';

    // se for para usar characteres especiais adiciona
    if (useSuper) characters += sup;

    // adiciona a quanitade informada
    for(let x = 0; x < len; x++) {
      const r = this.rand(0, characters.length - 1);
      random += characters[r];
    }

    return random;
  }

  inArray(array: any[], value: any) {
    return (array.indexOf(value) >= 0) ? true: false; 
  }

  arrayBufferToHex(buffer: ArrayBuffer) {
    // obtem os bytes
    let bytes = new Uint8Array(buffer);
    // string hexadecimal
    let hex   = '';

    // converte byte em hexadecimal
    for(let byte of bytes)
      hex += (`000${byte.toString(16)}`).slice(-2);

    return hex;
  }
}

export default Util;