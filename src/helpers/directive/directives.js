import { on } from '@/helpers/iview-admin/libs/tools.js'
const directives = {
  draggable: {
    inserted: (el, binding, vnode) => {
      let triggerDom = document.querySelector(binding.value.trigger)
      triggerDom.style.cursor = 'move'
      let bodyDom = document.querySelector(binding.value.body)
      let pageX = 0
      let pageY = 0
      let transformX = 0
      let transformY = 0
      let canMove = false
      const handleMousedown = e => {
        let transform = /\(.*\)/.exec(bodyDom.style.transform)
        if (transform) {
          transform = transform[0].slice(1, transform[0].length - 1)
          let splitxy = transform.split('px, ')
          transformX = parseFloat(splitxy[0])
          transformY = parseFloat(splitxy[1].split('px')[0])
        }
        pageX = e.pageX
        pageY = e.pageY
        canMove = true
      }
      const handleMousemove = e => {
        let xOffset = e.pageX - pageX + transformX
        let yOffset = e.pageY - pageY + transformY
        if (canMove) bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
      }
      const handleMouseup = e => {
        canMove = false
      }
      on(triggerDom, 'mousedown', handleMousedown)
      on(document, 'mousemove', handleMousemove)
      on(document, 'mouseup', handleMouseup)
    },
    update: (el, binding, vnode) => {
      if (!binding.value.recover) return
      let bodyDom = document.querySelector(binding.value.body)
      bodyDom.style.transform = ''
    }
  },
  focus: {
    inserted: (el, binding, vnode, oldVnode) => {
      // console.log(el, binding, vnode, oldVnode)
      el.select()
      el.focus()

      el.addEventListener('keydown', event => {
        // console.log(event.key) // event.keyCode
        if (event.key === 'Enter' || event.key === 'Tab') {
          // targetForm是表單的ID
          // document.getElementById('targetForm').submit()
          // ID為defaultSubmitm增加click事件
          // document.getElementById('defaultSubmit').onclick = function () { console.log(event.keyCode) }
          // 呼叫ID為defaultSubmitm的click事件
          // document.getElementById('defaultSubmit').click()
          el.click()
        }
      })
    }
  }
}

export default directives
