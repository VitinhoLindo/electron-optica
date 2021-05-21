import Convert from './Convert'
import CustomFileReader from './custom/File'
export class Base extends Convert {
  constructor() {
    super()
  }

  fileReader() { return new CustomFileReader(this) }
}

const Main = async function () {
  return new Base()
}

export async function Load(vue) {
  vue.config.globalProperties.$app = await Main()
}