//================================================== creating fallingCode in HTML
console.log('hey')
const fallingCode = document.querySelector('.falling-code')
const deley = fallingCode.dataset.settimeoutdeley
const params = [
  {
  rightShift: 0,
  speed: 180,
  },
  {
  rightShift: 4,
  speed: 200,
  },
  {
  rightShift: 8,
  speed: 130,
  },
  {
  rightShift: 10,
  speed: 100,
  },
  {
  rightShift: 12,
  speed: 105,
  },
  {
  rightShift: 14,
  speed: 95,
  },
  {
  rightShift: 17,
  speed: 125,
  },
  {
  rightShift: 20,
  speed: 145,
  },
  {
  rightShift: 24,
  speed: 132,
  },
  {
  rightShift: 28,
  speed: 121,
  },
  {
  rightShift: 36,
  speed: 155,
  },
  {
  rightShift: 42,
  speed: 141,
  },
  {
  rightShift: 52,
  speed: 134,
  },
]
// console.log("here", window.innerWidth)


// ================================================ run fallingCode 
setTimeout(() => {
  createStrings(params)
  const lines = document.querySelectorAll('.falling-code>span')
  let strings = [] // [{string:'.string1', indicator:'.indicator1', time:'180'}]
  lines.forEach(elem => {
    // it generating data which was got from html into strings
    const string = `.${elem.className.split(' ')[0]}`
    const indicatorElem = elem.firstElementChild
    const indicator = `.${indicatorElem.className.split(' ')[0]}`
    const time = parseInt(indicatorElem.dataset.time) 
    strings.push({string, indicator, time})
  })

  strings.forEach((elem) => {
    // it triggers when app is opened a first time
    createSpan(elem.string, elem.indicator, elem.time) 
    // it triggers when viewPort changes the size
    window.addEventListener('resize', (e) => {
      createSpan(elem.string, elem.indicator, elem.time)
    })
  })

  setInterval(() => {
    strings.forEach(elem => getAnimation(elem.string, elem.indicator))
  }, 50)

}, deley)




//====================================================== functions
function createStrings(params) {
  // it creats span elements in fallingCode
  const length = params.length
  for (let i = 0; i < length; i++) {
    const {rightShift, speed} = params[i]
    const string = document.createElement('span')
    string.classList.add(`string${i + 1}`)
    string.style = `--shift: ${rightShift}rem`
  
    const indicator = document.createElement('span')
    indicator.classList.add(`indicator${i+1}`)
    indicator.classList.add(`indicator-style`)
    indicator.dataset.time = `${speed}`

    string.prepend(indicator)
    fallingCode.append(string)
  }
}
function createSpan(stringName, indicateName, timeDistense) {
  const viewPort = document.getElementById("home")
  const string = document.querySelector(stringName)
  const letters = document.querySelectorAll(`${stringName} .letter`)
  const indicator = document.querySelector(indicateName)
  clenList(letters)

  let bottomViewPort
  let bottomString1
  do {
    bottomViewPort = viewPort.getBoundingClientRect().bottom // it is bottom of viewport
    bottomString1 = string.getBoundingClientRect().bottom
    string.children
    const span = document.createElement('span')
    span.classList.add('letter')
    span.textContent = `${randomInteger(0, 1)}`
    string.append(span)
  }
  while (  
    bottomViewPort > bottomString1
  )
  const time = Math.round(bottomString1 / timeDistense * 10) / 10
  try {
    indicator.style.animationDuration = `${time}s`
  } catch {
    return
  }
  function clenList(list) {
    const length = list.length
    for (let i = 0; i < length; i++){
      list[i].remove()
    }
  }
  function randomInteger(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
}  
function getAnimation(stringName, indicateName) {
  // it assigns 'active' class to eaxh elements that indicator touched
  const indicator1 = document.querySelector(indicateName)
  const letters1 = document.querySelectorAll(`${stringName} .letter`)
  const indicator = indicator1.offsetTop

  for (let i of letters1) {
    const height = i.offsetHeight
    const top = i.offsetTop
    const bottom = top + height
    if (indicator > top && indicator < bottom) {
      indicator1.textContent = i.textContent
      i.classList.add('active')
      setTimeout(() => {
        i.classList.remove('active')
      }, )
    }
  }
}






