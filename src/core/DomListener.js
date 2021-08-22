import {capitalize} from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) throw Error('No root at the constructor')
    this.$root = $root
    this.listeners = listeners
  }
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = capitalize(listener)
      if (!this[method]) {
        throw new Error('Ты лох')
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = capitalize(listener)
      console.log('remove', method)
      this.$root.off(listener, this[method])
    })
  }
}
