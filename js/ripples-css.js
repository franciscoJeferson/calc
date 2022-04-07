let rippleTimeout
let rippleEnd = false
let rippleTransition
const getElementsStyles = (element, style) => window.getComputedStyle(element).getPropertyValue(style)

document.body.addEventListener('pointerdown', event => {
  startRipple(event)
})

document.body.addEventListener('mouseup', event => {
  endRipple(event)
})

document.body.addEventListener('touchend', event => {
  endRipple(event)
})

const startRipple = (event) => {
  event.stopPropagation()
  const conditionForRunTheRipple = getElementsStyles(event.target, '--rp-size')
  if (conditionForRunTheRipple) {
    rippleTransition = getElementsStyles(event.target, '--rp-transition')
    const options = {
      size: getElementsStyles(event.target, '--rp-size'),
      color: getElementsStyles(event.target, '--rp-color'),
      transition: rippleTransition,
      halfHeight: event.target.offsetHeight / 2,
      halfWidth: event.target.offsetWidth / 2
    }
    rippleTimeout = setTimeout(() => {
      rippleEnd = true
    }, rippleTransition)
    createRippple(event, options)
  }
}

const createRippple = (event, options) => {
  const ripple = document.createElement('span')
  ripple.classList.add('ripple')
  event.target.appendChild(ripple)
  /*==================================*/
  const touch_data = () => {
    return {
      top: parseInt(Math.abs(event.target.getBoundingClientRect().top - event.clientY)),
      bottom: parseInt(Math.abs(event.target.getBoundingClientRect().bottom - event.clientY)),
      left: parseInt(Math.abs(event.target.getBoundingClientRect().left - event.clientX)),
      right: parseInt(Math.abs(event.target.getBoundingClientRect().right - event.clientX))
    }
  }
  const formula = () => {
    return {
      a: Math.sqrt((touch_data().bottom ** 2) + (touch_data().right ** 2)),
      b: Math.sqrt((touch_data().bottom ** 2) + (touch_data().left ** 2)),
      c: Math.sqrt((touch_data().top ** 2) + (touch_data().right ** 2)),
      d: Math.sqrt((touch_data().top ** 2) + (touch_data().left ** 2))
    }
  }
  const calculate_scale = () => {
    return touch_data().top <= options.halfHeight && touch_data().left <= options.halfWidth ? formula().a: touch_data().top < options.halfHeight && touch_data().left > options.halfWidth ? formula().b: touch_data().top > options.halfHeight && touch_data().left < options.halfWidth ? formula().c: touch_data().top > options.halfHeight && touch_data().left > options.halfWidth ? formula().d: formula().d
  }
  /*=================================*/
  ripple.style.top = `${touch_data().top - (options.size / 2)}px`
  ripple.style.left = `${touch_data().left - (options.size / 2)}px`
  ripple.style.willChange = 'transform border-radius width height top left'
  ripple.style.backgroundColor = options.color
  ripple.style.transform = `scale(${calculate_scale() / (options.size / 2)})`
  ripple.style.width = `${options.size}px`
  ripple.style.height = `${options.size}px`
  ripple.style.borderRadius = '100%'
  ripple.style.position = 'absolute'
  ripple.style.pointerEvents = 'none'
  ripple.style.opacity = '1'
  ripple.style.transition = `opacity ease 0.4s, transform ease ${options.transition}ms`
}

const endRipple = (event) => {
  const conditionForRunTheRipple = getElementsStyles(event.target, '--rp-size')
  if (conditionForRunTheRipple) {
    event.stopPropagation()
    document.querySelectorAll('.ripple').forEach((ripple, index) => {
      if (rippleEnd) {
        ripple.style.opacity = '0'
        ripple.style.transition = 'opacity ease 0.4s'
        ripple.addEventListener('transitionend', () => {
          ripple.remove()
        })
      } else {
        setTimeout(() => {
          ripple.style.opacity = '0'
          ripple.style.transition = 'opacity ease 0.4s'
          ripple.addEventListener('transitionend', () => {
            ripple.remove()
          })
        }, rippleTransition)
      }
      clearTimeout(rippleTimeout)
      rippleEnd = false
    })
  }
}
