import DB from './db/index'
import Event from './Event'

export default class Properties extends Event {
  constructor() {
    super()

    this.constants = {
      util: {
        characters: {
          latters: 'abcdefghijklmnopqrstuvxywz',
          number: '0123456789',
          super: '!@#$%&*()_-+=§{}][;:,.<>?/|'
        }
      },
      convert: {
        base64Keys: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
      }
    }

    this.db = DB
  }
}