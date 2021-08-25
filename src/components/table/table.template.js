const CODES = {
  'A': 65,
  'Z': 90,
}

// function createCell(row, col) {
//   return `
//   <div class="cell" contenteditable="true" data-col="${col}"
//  data-row="${row}">
//   </div>
//   `
// }

function toCell(row) {
  return function(_, col) {
    return `
        <div class="cell" contenteditable="true" 
        data-col="${col}"
        data-id="${row}:${col}"
        >
        </div>
      `
  }
}

function toColumn(content, index) {
  return `
  <div class="column" data-type="resizable" data-col="${index}">
  ${content}
  <div class="column-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(index, content) {
  const resize = index ?
   '<div class="row-resize" data-resize="row"></div>':
    ''
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">${index || ''}
      ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}
function toChar(element, index) {
  return String.fromCharCode(index + CODES.A)
}

export function createTable(rowCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('')
  rows.push(createRow(null, cols))
  for (let i = 0; i < rowCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(i))
        .join('')
    rows.push(createRow(i + 1, cells))
  }
  return rows.join('')
}
