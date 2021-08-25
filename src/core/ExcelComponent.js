import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubsribers = []
    this.prepare()
  }
  // Подготовка до инициализации
  prepare() {}
  toHTML() {
    return ''
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, func) {
    const sub = this.emitter.subscribe(event, func)
    this.unsubsribers.push(sub)
  }
  // Инициализация
  init() {
    this.initDOMListeners()
  }
  // Чистим слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubsribers.forEach(unsub => unsub())
  }
}
