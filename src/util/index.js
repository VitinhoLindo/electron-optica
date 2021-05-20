import Util from './Util'
import CustomFileReader from './File'
import Data from './data.json'
import BinaryInfo from './BinaryInfo'

const Main = function () {
  class Base extends Util() {
    constructor() {
      super()

      this.data = Data
    }

    fileReader() {
      return new CustomFileReader(this)
    }

    binaryInfo() {
      return new BinaryInfo()
    }
  }

  return new Base()
}


export default async function(vue) {
  vue.config.globalProperties.$app = Main()
}