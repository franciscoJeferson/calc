import {
  data
} from '../index.js'
import {
  default as utils
  } from './numbers.js'

  export default (math) => {
    const last_position = data.expression.length - 1 < 0 ?
    0: data.expression.length - 1
    const is_number = !isNaN(Number(data.expression[last_position]))
    if (math === 'sqrt') {
      if (data.expression[0] === '') {
        data.expression[0] = 'sqrt('
        data.expression_display[0] = '√('
      } else {
        const condition = !isNaN(Number(data.expression[last_position]))
        if (condition ||
          data.expression[last_position] === 'pi' ||
          data.expression[last_position] === 'e' ||
          data.expression[last_position] === ')') {
          data.expression.push('*')
          data.expression_display.push('×')
        }
        data.expression.push('sqrt(')
        data.expression_display.push('√(')
      }
    } else if (math === 'sin') {
      if (data.expression[0] === '') {
        if (!data.deg) {
          data.expression[0] = 'sin(rad'
          data.expression_display[0] = 'sin('
        } else {
          data.expression[0] = 'sin(deg'
          data.expression_display[0] = 'sin('
        }
      } else {
        const condition = !isNaN(Number(data.expression[last_position]))
        if (condition ||
          data.expression[last_position] === 'pi' ||
          data.expression[last_position] === 'e' ||
          data.expression[last_position] === ')') {
          data.expression.push('*')
          data.expression_display.push('×')
        }
        if (!data.deg) {
          data.expression.push('sin(rad')
          data.expression_display.push('sin(')
        } else {
          data.expression.push('sin(deg')
          data.expression_display.push('sin(')
        }
      }
    } else if (math === 'cos') {
      if (data.expression[0] === '') {
        if (!data.deg) {
          data.expression[0] = 'cos(rad'
          data.expression_display[0] = 'cos('
        } else {
          data.expression[0] = 'cos(deg'
          data.expression_display[0] = 'cos('
        }
      } else {
        const condition = !isNaN(Number(data.expression[last_position]))
        if (condition ||
          data.expression[last_position] === 'pi' ||
          data.expression[last_position] === 'e' ||
          data.expression[last_position] === ')') {
          data.expression.push('*')
          data.expression_display.push('×')
        }
        if (!data.deg) {
          data.expression.push('cos(rad')
          data.expression_display.push('cos(')
        } else {
          data.expression.push('cos(deg')
          data.expression_display.push('cos(')
        }
      }
    } else if (math === 'tan') {
      if (data.expression[0] === '') {
        if (!data.deg) {
          data.expression[0] = 'tan(rad'
          data.expression_display[0] = 'tan('
        } else {
          data.expression[0] = 'tan(deg'
          data.expression_display[0] = 'tan('
        }
      } else {
        const condition = !isNaN(Number(data.expression[last_position]))
        if (condition ||
          data.expression[last_position] === 'pi' ||
          data.expression[last_position] === 'e' ||
          data.expression[last_position] === ')') {
          data.expression.push('*')
          data.expression_display.push('×')
        }
        if (!data.deg) {
          data.expression.push('tan(rad')
          data.expression_display.push('tan(')
        } else {
          data.expression.push('tan(deg')
          data.expression_display.push('tan(')
        }
      }
    } else if (math === 'ln') {
      if (data.expression[0] === '') {
        data.expression[0] = 'log('
        data.expression_display[0] = 'ln('
      } else {
        const condition = !isNaN(Number(data.expression[last_position]))
        if (condition ||
          data.expression[last_position] === 'pi' ||
          data.expression[last_position] === 'e' ||
          data.expression[last_position] === ')') {
          data.expression.push('*')
          data.expression_display.push('×')
        }
        data.expression.push('log(')
        data.expression_display.push('ln(')
      }
    } else if (math === 'log') {
      if (data.expression[0] === '') {
        data.expression[0] = 'log10('
        data.expression_display[0] = 'log('
      } else {
        const condition = !isNaN(Number(data.expression[last_position]))
        if (condition ||
          data.expression[last_position] === 'pi' ||
          data.expression[last_position] === 'e' ||
          data.expression[last_position] === ')') {
          data.expression.push('*')
          data.expression_display.push('×')
        }
        data.expression.push('log10(')
        data.expression_display.push('log(')
      }
    } else if (math === '1/x') {
      if (data.expression[0] === '') {
        data.expression[0] = '1'
        data.expression.push('/')
        data.expression_display[0] = '1'
        data.expression_display.push('÷')
      } else {
        const condition = !isNaN(Number(data.expression[last_position]))
        if (condition ||
          data.expression[last_position] === 'pi' ||
          data.expression[last_position] === 'e' ||
          data.expression[last_position] === ')') {
          data.expression.push('*')
          data.expression_display.push('×')
        }
        data.expression.push('1')
        data.expression.push('/')
        data.expression_display.push('1')
        data.expression_display.push('÷')
      }
    } else if (math === 'e^x') {
      if (data.expression[0] === '') {
        data.expression[0] = 'e^('
        data.expression_display[0] = 'e^('
      } else {
        const condition = !isNaN(Number(data.expression[last_position]))
        if (condition ||
          data.expression[last_position] === 'pi' ||
          data.expression[last_position] === 'e' ||
          data.expression[last_position] === ')') {
          data.expression.push('*')
          data.expression_display.push('×')
        }
        data.expression.push('e^(')
        data.expression_display.push('e^(')
      }
    } else if (math === 'x^2') {
      if (data.expression[last_position] !== '' &&
        is_number || data.expression[last_position] === ')') {
        data.expression.push('^(')
        data.expression.push('2')
        data.expression.push(')')
        data.expression_display.push('^(')
        data.expression_display.push('2')
        data.expression_display.push(')')
      }
    } else if (math === 'x^y') {
      if (data.expression[last_position] !== '' &&
        is_number || data.expression[last_position] === ')') {
        data.expression.push('^(')
        data.expression_display.push('^(')
      }
    } else if (math === 'abs') {
      if (data.expression[0] === '') {
        data.expression[0] = 'abs('
        data.expression_display[0] = 'abs('
      } else {
        const condition = !isNaN(Number(data.expression[last_position]))
        if (condition ||
          data.expression[last_position] === 'pi' ||
          data.expression[last_position] === 'e' ||
          data.expression[last_position] === ')') {
          data.expression.push('*')
          data.expression_display.push('×')
        }
        data.expression.push('abs(')
        data.expression_display.push('abs(')
      }
    } else if (math === 'pi') {
      if (data.expression[0] === '') {
        data.expression[0] = 'pi'
        data.expression_display[0] = 'π'
      } else {
        const condition = !isNaN(Number(data.expression[last_position]))
        if (condition ||
          data.expression[last_position] === 'e' ||
          data.expression[last_position] === 'pi' ||
          data.expression[last_position] === ')') {
          data.expression.push('*')
          data.expression_display.push('×')
        }
        data.expression.push('pi')
        data.expression_display.push('π')
      }
    } else if (math === 'e') {
      if (data.expression[0] === '') {
        data.expression[0] = 'e'
        data.expression_display[0] = 'e'
      } else {
        const condition = !isNaN(Number(data.expression[last_position]))
        if (condition ||
          data.expression[last_position] === 'pi' ||
          data.expression[last_position] === 'e' ||
          data.expression[last_position] === ')') {
          data.expression.push('*')
          data.expression_display.push('×')
        }
        data.expression.push('e')
        data.expression_display.push('e')
      }
    }
    utils.calculate()
    utils.formatt()
  }