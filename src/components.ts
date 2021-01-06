import { App } from '@vue/runtime-core'
import Menu from './components/Menu.vue'

export default function (vue: App) {
  vue.component('menu-app', Menu);
}