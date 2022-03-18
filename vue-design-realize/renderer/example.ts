import renderer from './index'
import type { VNode } from './interface'

const vnode: VNode = {
  tag: 'div',
  props: {
    onClick: () => alert('hello!')
  },
  children: "click me!"
}

renderer(vnode, document.body)
