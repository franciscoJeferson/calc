import {
  default as utils
  } from './utils/utils.js'
  import {
  default as digits
  } from './utils/digits.js'
  import {
  default as operators
  } from './utils/operators.js'
  import {
  default as keys
  } from './utils/keys.js'
  import {
  default as math
  } from './utils/math.js'
  const expression_display = document.querySelector('.display-expression')
  const display_result = document.querySelector('.display-result')
  const data = {
    expression: [''],
    expression_display: [''],
    display: '',
    result: '',
    deg: false,
    mathContainer: 1,
    isResult: false,
  }
  window.addEventListener('DOMContentLoaded', event => {
    document.querySelectorAll('[data-click]')
    .forEach((item) => {
      item.addEventListener('click', ({
        target
      }) => {
        if (target.dataset.click === 'number') {
          digits.digits(target.dataset.value)
        } else if (target.dataset.click === 'operator') {
          operators.operators(target.dataset.value)
        } else if (target.dataset.click === 'key') {
          keys(target.dataset.value)
        } else if (target.dataset.click === 'math') {
          math(target.dataset.value)
        } else if (target.dataset.click === 'utils') {
          utils(target.dataset.value)
        }
      })
    })
  })

  export {
    data,
    expression_display,
    display_result,
  }