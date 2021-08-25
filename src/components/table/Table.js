import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize,
  shouldSelect,
  matrix,
  nextSelector} from './table.functions'
import {TableSelection} from './TableSelection'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.unsubs = []
  }
  static className = 'excel__table'
  toHTML() {
    return createTable(20)
  }
  prepare() {
    this.selection = new TableSelection()
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }
  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)
    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    }
    if (shouldSelect(event)) {
      const $cell = this.$root.find(`[data-id="${event.target.dataset.id}"]`)
      if (event.shiftKey) {
        const selectedCoords = this.selection.current.id()
        const clickedCoords = $cell.id()
        const $cells = matrix(selectedCoords, clickedCoords)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($cell)
      }
    }
  }
  onKeydown(event) {
    const key = event.key
    const keys = [
      'Tab',
      'ArrowRight',
      'ArrowLeft',
      'ArrowDown',
      'ArrowUp',
      'Enter'
    ]
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const [row, col] = this.selection.id()
      const $next = this.$root.find(nextSelector(key, row, col))
      this.selectCell($next)
    }
  }
  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}

