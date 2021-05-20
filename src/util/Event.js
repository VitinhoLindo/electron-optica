class ListenProps {
  constructor() {
    this.listen = {}
  }

  verify(listen) {
    if (typeof this.listen[listen] === 'undefined')
      this.listen[listen] = []
  }

  add(listen, callback) {
    this.verify(listen)
    this.listen[listen].push(callback)
  }

  remove(listen) {
    this.verify(listen)
    delete this.listen[listen]
  }

  get(listen) {
    if (typeof listen == 'undefined')
      return Object.keys(this.listen)

    return this.listen[listen] || []
  }
}

export default class EventEmitter {
  constructor() {
    this.listeners = {
      on: new ListenProps(),
      once: new ListenProps()
    }
  }

  on(listen, callback) {
    if (typeof listen !== 'string') throw new Error();
    if (typeof callback !== 'function') throw new Error();

    this.listeners.on.add(listen, callback)
  }

  once(listen, callback) {
    if (typeof listen !== 'string') throw new Error();
    if (typeof callback !== 'function') throw new Error();

    this.listeners.once.add(listen, callback)
  }

  emit(listen, ...args) {
    let onListen = this.listeners.on.get(listen)
    let onceListen = this.listeners.once.get(listen)

    this.listeners.once.remove(listen)
    for(let listener of onceListen.concat(onListen)) try {
      listener.apply(null, args)
    } catch (error) { console.error(error) }
  }

  off(listen) {
    this.listeners.on.remove(listen)
    this.listeners.once.remove(listen)
  }
}