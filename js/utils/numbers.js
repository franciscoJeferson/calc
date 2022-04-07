import {
  data,
  expression_display,
  display_result,
} from '../index.js'
export default {
  operators_symbols: /\+|\-|\*|\//,
  percentage_parentheses_end: /\%|\)/,
  tenDigitsDecimal(str) {
    const lastPosition = data.expression.length - 1 < 0 ? 0:
    data.expression.length - 1
    const index = str.search(/\./)
    let decimals
    if (index >= 0) {
      decimals = str.substring(index, str.length - 1)
      decimals = decimals ? decimals.length: 0
    }
    if (data.expression[lastPosition].length < 16 &&
      decimals === 10) {
      return true
    } else {
      return false
    }
  },
  formatt() {
    expression_display.value = ''
    data.expression_display.forEach(item => {
      const number = Number(item)
      if (!isNaN(number) && number !== 0 || item.search(/\./) > -1 && item.search(/\e/) < 0) {
        if (item.search(/\./) > -1) {
          const [integer,
            decimal] = item.split('.')
          expression_display.value += Number(integer).toLocaleString('pt-BR', {
            maximumFractionDigits: 10,
          }) + ',' + decimal
        } else {
          expression_display.value += number.toLocaleString('pt-BR', {
            maximumFractionDigits: 10,
          })
        }
      } else {
        expression_display.value += item
      }
      // if (!isNaN(number) && number !== 0 || item.search(/\./) > -1) {
      //   if (item.search(/\./) > -1 && number.toString().search(/\./) < 0) {
      //     expression_display.value += number.toLocaleString('pt-BR', {
      //       maximumFractionDigits: 10,
      //     }) + ','
      //   } else {
      //     expression_display.value += number.toLocaleString('pt-BR', {
      //       maximumFractionDigits: 10,
      //     })
      //   } else {
      //expression_display.value += item
    })
    try {
      const is_small_number = data.result.search(/\e/) < 0
      if (is_small_number && data.result !== '') {
        display_result.value = Number(data.result).toLocaleString('pt-BR', {
          maximumFractionDigits: 10,
        })
      } else {
        display_result.value = data.result.replace(/\./gi, ',')
      }
    } catch (error) {
      display_result.value = ''
    }
    expression_display.focus()
  },
  calculate() {
    try {
      let result = math.evaluate(
        data.expression.join('')
        .replace(/rad/gi, 'pi/180*')
        .replace(/deg/gi, ''))
      if (result.toString().length > 15) {
        data.result = math.format(
          result, {
            notation: 'engineering'
          }
        ) !== 'undefined' ?
        math.format(result): ''
      } else {
        data.result = result.toString()
      }
    } catch (error) {
      data.result = ''
    }
  },
  alert(msg) {
    const innerAlerts = document.querySelector('.inner-alerts')
    const div = document.createElement('div')
    div.classList.add('alert', 'alert-warning')
    div.setAttribute('role', 'alert')
    div.textContent = msg
    if (innerAlerts.querySelector('.alert') === null) {
      innerAlerts.append(div)
      div.animate(
        [{
          opacity: 0
        },
          {
            opacity: 1
          }],
        {
          duration: 400, fill: 'forwards'
        }
      )
      setTimeout(() => {
        div.animate(
          [{
            opacity: 1
          },
            {
              opacity: 0
            }],
          {
            duration: 400, fill: 'forwards'
          }
        )
        setTimeout(() => {
          div.remove()
        }, 400)
      }, 1500)
    }
  },
}