export default function(vue) {
  vue.directive('this', {
    created(el, binding, vnode, prevVnode) {
      try {
        if (typeof binding.value !== 'function')
          throw new Error('v-this required function')
  
        binding.value(el)
      } catch (error) {
        console.error(error)
      }
    }
  })
}