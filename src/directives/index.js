import ThisDirective from './this'
import ListenDragDirective from './listen_drag'

export default function (vue) {
  /**
   * created(el, binding, vnode, prevVnode) {}, // new
   * beforeMount() {},
   * mounted() {},
   * beforeUpdate() {}, // new
   * updated() {},
   * beforeUnmount() {}, // new
   * unmounted() {}
   */

  ThisDirective(vue)
  ListenDragDirective(vue)
}