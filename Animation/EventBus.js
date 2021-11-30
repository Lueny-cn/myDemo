export default class EventBus {
  constructor () {
    this.listeners = {}
  }

  on (event = '', cb) {
    const listeners = this.listeners
    if (listeners[event] instanceof Array) {
      if (listeners[event].indexOf(cb) === -1) {
        listeners[event].push(cb)
      }
    } else {
      listeners[event] = [].concat(cb)
    }
  }

  once (event, listener) {
    const self = this
    function fn () {
      const args = Array.prototype.slice.call(arguments)
      listener.apply(null, args)
      self.removeListener(event, fn)
    }
    this.on(event, fn)
  }

  emit (event = '') {
    if (!this.listeners[event]) return
    const args = Array.prototype.slice.call(arguments)
    args.shift()
    this.listeners[event].forEach(cb => {
      cb.apply(null, args)
    })
  }

  removeListener (event = '', listener) {
    if (!listener) {
      this.listeners[listener] = []
      return
    }
    const listeners = this.listeners
    const arr = listeners[event] || []
    const i = arr.indexOf(listener)
    if (i >= 0) {
      listeners[event].splice(i, 1)
    }
  }
}
