export default function(vue) {
  const listeners = {
    content: [
      { event: 'ondragover', type: 'drag-over' },
      { event: 'ondrop', type: 'drag-drop' },
      { event: 'ondragenter', type: 'drag-enter' },
      { event: 'ondragleave', type: 'drag-leave' }
    ],
    html: [
      { event: 'ondrag', type: 'drag' },
      { event: 'ondragstart', type: 'drag-start' },
      { event: 'ondragend', type: 'drag-end' },
      { event: 'ondragenter', type: 'drag-enter' },
      { event: 'ondragexit', type: 'drag-exit' },
      { event: 'ondragleave', type: 'drag-leave' },
      { event: 'ondragover', type: 'drag-over' },
      { event: 'ondrop', type: 'drag-drop' }
    ]
  }

  const htmlListen = function (el, prop) {
    if (typeof prop !== 'object' && !(prop instanceof Object))
      throw new Error('plase inform value in v-drag, example: v-drag:html="{ transferKey: String, listen: Function }"')

    let { transferKey, listen } = prop

    if (typeof transferKey !== 'string')
      throw new Error('v-drag:html transferKey is not String. example: v-drag:html="{ transferKey: String, listen: Function }"')
    if (typeof listen !== 'function')
      throw new Error('v-drag:html listen is not Function. example: v-drag:html="{ transferKey: String, listen: Function }"')

    for(const _listen_ of listeners.html)
      el[_listen_.event] = (event) => listen({ event, transferKey, type: listen.type })
  }

  const contentDrag = function (el, prop) {
    if (typeof prop !== 'function')
      throw new Error('plase inform value in v-drag, example: v-drag:content="Function"')

    for(const listen of listeners.content)
      el[listen.event] = (event) => prop({ event, type: listen.type })
  }

  vue.directive('drag', {
    created(el, binding, vnode, prevVnode) {
      try {
        if (typeof binding.arg !== 'string')
          throw new Error('plase inform arg type string in v-drag, example: v-drag:[content,html]')

        switch (binding.arg) {
          case 'html':    htmlListen(el, binding.value); break;
          case 'content': contentDrag(el, binding.value); break;
          default:        throw new Error('invalid arg is not [\'content\', \'html\']')
        }
      } catch (error) { console.error(error) }
    },
  })
}