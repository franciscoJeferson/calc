import {
  data
} from '../index.js'
import {
  default as utils
  } from './numbers.js'

  const isComma = (last_position) => {
    const str = data.expression
    [last_position]
    const last_position_str = str.length - 1 < 0 ?
    0: str.length - 1
    const isCommaOnLastPosition = str[last_position_str] === '.'
    return isCommaOnLastPosition
  }
  export default {
    operators(operator) {
      const last_position = data.expression.length - 1 < 0 ?
      0: data.expression.length - 1
      const noOperatorMD = /\(/
      if (data.expression[last_position] === '' ||
        data.expression[last_position].search(noOperatorMD) > -1 &&
        data.expression[last_position] !== '-') {
        if (operator === '-') {
          if (data.expression[0] === '') {
            data.expression[0] = operator
            data.expression_display[0] = operator
          } else {
            data.expression.push(operator)
            data.expression_display.push(operator)
          }
        }
        console.log(data.expression[last_position].search(noOperatorMD))
      } else if (data.expression[last_position].search(noOperatorMD) < 0) {
        if (data.expression[last_position]
          .search(utils.operators_symbols) < 0 && !isComma(last_position)) {
          data.expression.push(operator + '')
          data.expression_display.push(operator
            .replace(/\*/gi, '×')
            .replace(/\//gi, '÷') + '')
        } else {
          if (data.expression.length > 1 && 
            !isComma(last_position) && 
            data.expression[last_position - 1].search(noOperatorMD) < 0) {
            data.expression[last_position] = operator
            data.expression_display[last_position] = operator
            .replace(/\*/gi, '×')
            .replace(/\//gi, '÷')
          }
        }
      }
      utils.calculate()
      utils.formatt()
    },
  }