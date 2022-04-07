import {
  data
} from '../index.js'
import {
  default as utt
  } from './numbers.js'


  const turnRadOrDeg = () => {
    const button = document.querySelectorAll('[data-value="mode"]')
    data.deg = !data.deg
    if (data.deg) {
      button.forEach(item => {
        item.textContent = 'Deg'
      })
      data.expression.forEach((item, index) => {
        if (item.search(/rad/) > -1) {
          data.expression[index] = data.expression[index].replace(/rad/gi, 'deg')
        }
      })
    } else {
      button.forEach(item => {
        item.textContent = 'Rad'
      })
      data.expression.forEach((item, index) => {
        if (item.search(/deg/) > -1) {
          data.expression[index] = data.expression[index].replace(/deg/gi, 'rad')
        }
      })
    }
    utt.calculate()
    utt.formatt()
  }
  const turnMathContainer = () => {
    if (data.mathContainer === 1) {
      const mathContainer1 = document.querySelector('[data-math-container="1"]')
      const mathContainer2 = document.querySelector('[data-math-container="2"]')
      mathContainer1.style.display = 'none'
      mathContainer2.style.display = 'flex'
      data.mathContainer = 2
    } else {
      const mathContainer1 = document.querySelector('[data-math-container="1"]')
      const mathContainer2 = document.querySelector('[data-math-container="2"]')
      mathContainer1.style.display = 'flex'
      mathContainer2.style.display = 'none'
      data.mathContainer = 1
    }
  }

  export default (utils) => {
    console.log(utils)
    if (utils === 'mode') {
      turnRadOrDeg()
    } else if (utils === 'mathContainer') {
      turnMathContainer()
    }

  }