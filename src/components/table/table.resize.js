import {$} from '@core/dom'
export function resizeHandler(event, $root) {
  const $target = $(event.target)
  const $parent = $target.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $target.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value
  $target.css({opacity: 1, [sideProp]: '-2000px'})
  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $target.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $target.css({bottom: -delta + 'px'})
    }
  }
  document.onmouseup = () => {
    $target.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    })
    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((item) => item.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }
    document.onmousemove = null
    document.onmouseup = null
  }
}


