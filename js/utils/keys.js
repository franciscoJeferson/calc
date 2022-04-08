import {
  data,
  expression_display,
  display_result,
} from '../index.js'
import {
  default as utils
  } from './numbers.js'
  const parentheses = (last_position) => {
    const parentheses_opened = data.expression
    .filter(item => item.search(/\(/) > -1)
    const parentheses_closed = data.expression
    .filter(item => item === ')')
    const is_number = data.expression[last_position] === '' ? false:
    !isNaN(Number(data.expression[last_position]))
    const is_percentage = data.expression[last_position] === '%'
    const is_parentheses_opened = data.expression[last_position] === '('
    const is_parentheses_closed = data.expression[last_position] === ')'
    if (data.expression[0] === '') {
      data.expression[0] = '('
      data.expression_display[0] = '('
    } else if (is_number && parentheses_opened.length === parentheses_closed.length ||
      is_parentheses_closed && parentheses_opened.length === parentheses_closed.length ||
      is_percentage && parentheses_opened.length === parentheses_closed.length) {
      data.expression.push('*(')
      data.expression_display.push('×(')
    } else if (is_number &&
      parentheses_opened.length > parentheses_closed.length || is_parentheses_closed ||
      is_percentage && parentheses_opened.length > parentheses_closed.length) {
      data.expression.push(')')
      data.expression_display.push(')')
    } else {
      data.expression.push('(')
      data.expression_display.push('(')
    }
    data.isResult = false
  }
  const percentage = (last_position) => {
    if (data.expression[last_position] !== '') {
      if (data.expression[last_position].search('%') < 0 &&
        data.expression[last_position].search(utils.operators_symbols) < 0 &&
        data.expression[last_position].search(/\(/) < 0) {
        data.expression.push('%')
        data.expression_display.push('%')
      }
    }
    data.isResult = false
  }
  const backspace = (last_position) => {
    const condition = !isNaN(Number(data.expression[last_position]))
    if (condition) {
      let str = data.expression[last_position]
      data.expression[last_position] = str.substr(0, str.length - 1)
      data.expression_display[last_position] = str.substr(0, str.length -1)
      if (data.expression[last_position] === '') {
        data.expression.pop()
        data.expression_display.pop()
      }
      if (data.expression.length === 0) {
        data.expression[0] = ''
        data.expression_display[0] = ''
      }
    } else {
      if (data.expression[last_position] !== '') {
        data.expression.pop()
        data.expression_display.pop()
      }
      if (data.expression.length === 0) {
        data.expression[0] = ''
        data.expression_display[0] = ''
      }
    }
    data.isResult = false
  }
  const allClear = () => {
    data.expression = ['']
    data.expression_display = ['']
    data.isResult = false
  }
  const comma = (last_position) => {
    if (data.isResult) {
      data.expression = ['']
      data.expression_display = ['']
    }
    if (data.expression[0] === '') {
      data.expression[last_position] += '0.'
      data.expression_display[last_position] += '0.'
    } else if (data.expression[last_position].search(utils.operators_symbols) > -1) {
      data.expression.push('0.')
      data.expression_display.push('0.')
    } else if (data.expression[last_position].search(/\./) < 0) {
      data.expression[last_position] += '.'
      data.expression_display[last_position] += '.'
    }
    data.isResult = false
  }
  export default {
    keys(key) {
      const last_position = data.expression.length - 1
      if (key === 'parentheses') {
        parentheses(last_position)
      } else if (key === 'percentage') {
        percentage(last_position)
      } else if (key === 'backspace') {
        backspace(last_position)
      } else if (key === 'allClear') {
        allClear()
      } else if (key === 'comma') {
        comma(last_position)
      } else if (key === 'equals') {
        data.isResult = true
      }
      utils.calculate()
      utils.formatt()
    },
    equals() {
      if (data.isResult && data.result !== '') {
        data.expression = ['']
        data.expression_display = ['']
        data.expression[0] = data.result
        data.expression_display[0] = data.result
        data.result = ''
        expression_display.animate([{
          opacity: '0'
        },
          {
            opacity: '1'
          }], {
          duration: 200, fill: 'forwards'
        })
        expression_display.style.color = '#30835c'
      } else {
        expression_display.style.color = '#000000'
      }
    }
  }