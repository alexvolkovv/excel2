class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
     document.querySelector(selector) :
     selector
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  clear() {
    this.html('')
    return this
  }
  append(node) {
    if (node instanceof Dom) node = node.$el
    if (Element.prototype.append) this.$el.append(node)
    else this.$el.appendChild(node)
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  get data() {
    return this.$el.dataset
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  addClass(className) {
    this.$el.classList.add(className)
  }
  removeClass(className) {
    this.$el.classList.remove(className)
  }
  id() {
    return this.data.id.split(':').map((item) => +item)
  }
  css(styles = {}) {
    Object
        .keys(styles)
        .forEach((key) => {
          this.$el.style[key] = styles[key]
        })
    return this.$el
  }
  focus() {
    this.$el.focus()
    return this
  }
  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) el.classList.add(classes)
  return $(el)
}
