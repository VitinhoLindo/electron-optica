import Fields from './field/index'
import Pages from './page/index'

export default function (vue) {
  let components = [].concat(Fields)
                     .concat(Pages)
  
  for(let component of components) 
    vue.component(component.name, component.el)
}