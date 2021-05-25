import Fields from './field/index'
import Pages from './page/index'
import View from './view/index'

export default function (vue) {
  let components = [].concat(Fields)
                     .concat(Pages)
                     .concat(View)
  
  for(let component of components) 
    vue.component(component.name, component.el)
}