import {
  data
} from '../index.js'
import {
  default as utils
  } from './numbers.js'
  const isPiOrE = (last_position) => {
    const str = data.expression
    [last_position]
    const isPiOrEOnLastPosition = data.expression[last_position] === 'pi' ||
    data.expression[last_position] === 'e'
    return isPiOrEOnLastPosition
  }
  export default {
    digits(number) {
      const last_position = data.expression.length - 1 < 0 ? 0:
      data.expression.length - 1
      const conditionOne = isNaN(Number(data.expression[last_position]))
      if (data.expression[last_position].length === 15 &&
        data.expression[last_position].search(/\./) === -1) {
        utils.alert('Não é possível inserir mais de 15 dígitos.')
      } else if (data.expression[last_position].length === 16 &&
        data.expression[last_position].search(/\./) > -1) {
        utils.alert('Não é possível inserir mais de 15 dígitos.')
      } else if (utils.tenDigitsDecimal(data.expression[last_position])) {
        utils.alert('jjsj')
      } else if (conditionOne && data.expression[last_position]
        .search(utils.percentage_parentheses_end) > -1 || isPiOrE(last_position)) {
        data.expression.push('*')
        data.expression.push(number)
        data.expression_display.push('×')
        data.expression_display.push(number)
      } else if (conditionOne && data.expression[last_position] !== ')') {
        data.expression.push(number)
        data.expression_display.push(number)
      } else {
        if (data.expression[last_position] === '0') {
          data.expression[last_position] = number
          data.expression_display[last_position] = number
        } else {
          data.expression[last_position] += number
          data.expression_display[last_position] += number
        }
      }
      utils.calculate()
      utils.formatt()
    },
  }