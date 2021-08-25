// import {$} from '@core/dom'
export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }
  select($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.className)
  }
  clear() {
    this.group.forEach((cell) => {
      cell.removeClass(TableSelection.className)
    })
    this.group = []
  }
  selectGroup($group = []) {
    this.clear()
    $group.forEach(cell => {
      cell.addClass(TableSelection.className)
      this.group.push(cell)
    })
  }
  id() {
    return this.current.data.id.split(':').map((item) => +item)
  }
}
