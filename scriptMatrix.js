//================================================== creating fallingCode in HTML

const fallingCode = document.querySelector('.falling-code')
console.dir(fallingCode)


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

let strings2 = []
let strings = [] 
// ================================================ run fallingCode 
setTimeout(() => {


  createStrings(params)
  


  strings2.forEach((elem) => {
    // it triggers when app is opened a first time
    // createSpan(elem.string, elem.indicator, elem.time) 
    createSpan2(elem)
    // it triggers when viewPort changes the size
    window.addEventListener('resize', () => {
      // createSpan(elem.string, elem.indicator, elem.time)
      createSpan2(elem)
    })
  })

  setInterval(() => {
    strings2.forEach(elem => getAnimation2(elem))
  }, 110)

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
    strings2.push(string)
  }
}
function createSpan(stringName, indicateName, timeDistense) {
  const viewPort = document.getElementById("home")
  const string = document.querySelector(stringName)
  const letters = document.querySelectorAll(`${stringName} .letter`)
  const indicator = document.querySelector(indicateName)
  clenList(letters)

  const bottomViewPort = viewPort.getBoundingClientRect().bottom // it is bottom of viewport
  let bottomString1 = string.getBoundingClientRect().bottom
  while (bottomViewPort > bottomString1) {
    bottomString1 = string.getBoundingClientRect().bottom
    const span = document.createElement('span')
    span.classList.add('letter')
    span.textContent = `${randomInteger(0, 1)}`
    string.append(span)
  }

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
    // console.log(height)
    if (indicator > top && indicator < bottom) {
      indicator1.textContent = i.textContent
      i.classList.add('active')
      setTimeout(() => {
        i.classList.remove('active')
      }, )
    }
  }
}
function getAnimation2(nodeElem) {
  // it assigns 'active' class to eaxh elements that indicator touched
  const indicator = nodeElem.querySelector('.indicator-style')
  const letters = nodeElem.querySelectorAll(`.letter`)
  const heightStr = indicator.offsetTop

  for (let i of letters) {
    const height = i.offsetHeight
    // console.log(height)
    const top = i.offsetTop
    const bottom = top + height
    if (heightStr > top && heightStr < bottom) {
      indicator.textContent = i.textContent
      i.classList.add('active')
      setTimeout(() => {
        i.classList.remove('active')
      }, )
    }
  }
}
function createSpan2(nodeElem) {
  const viewPort = document.getElementById("home")
  const string = nodeElem
  const letters = nodeElem.querySelectorAll(`.letter`)
  const indicator = nodeElem.querySelector(`.indicator-style`)
  const timeDistense = indicator.dataset.time
  clenList(letters)

  const bottomViewPort = viewPort.getBoundingClientRect().bottom // it is bottom of viewport
  let bottomString1 = string.getBoundingClientRect().bottom
  while (bottomViewPort > bottomString1) {
    //it calculates distence and then add span elements into string, count of span's elements depends on calculated distanse 
    bottomString1 = string.getBoundingClientRect().bottom
    const span = document.createElement('span')
    span.classList.add('letter')
    span.textContent = `${randomInteger(0, 1)}`
    string.append(span)
  }

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





