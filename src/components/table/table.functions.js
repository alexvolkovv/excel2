export function shouldResize(event) {
  return event.target.dataset.resize ? true : false
}

export function shouldSelect(event) {
  return event.target.dataset.id ? true : false
}


export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((item, index) => start + index)
}

export function matrix(current, click) {
  const rows = range(current[0], click[0])
  const cols = range(current[1], click[1])
  const ids = cols.reduce((prev, curr) => {
    rows.forEach(item => prev.push(`${item}:${curr}`))
    return prev
  }, [])
  return ids
}

export function nextSelector(key, row, col) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : --row
      break
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : --col
      break
  }
  return `[data-id="${row}:${col}"]`
}
