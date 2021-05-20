import Convert from './Convert'

export default function() {
  const constants = {
    characters: {
      latters: 'abcdefghijklmnopqrstuvxywz',
      number: '0123456789',
      super: '!@#$%&*()_-+=§{}][;:,.<>?/|'
    }
  }

  class Util extends Convert() {
    constructor() {
      super()
    }

    randomNumber(min, max) {
      return Math.floor(Math.random() * ((max || 20) - (min || 0) + 1) + (min || 0))
    }

    randomString(len, args) {
      let { useNumber = false, useSuper = false } = args || { useNumber: false, useSuper: false }
      let possibilities = constants.characters.latters,
          count = 0,
          rand = '';
  
      if (useNumber) possibilities += constants.characters.number;
      if (useSuper)  possibilities += constants.characters.super;
  
      while(count < (len || 20)) {
        let index = this.randomNumber(0, possibilities.length - 1);
        rand += possibilities[index];
        count++;
      }
  
      return rand;
    }
  }

  return Util
}