// const lodash = require('lodash')


//================================================== creating fallingCode in HTML
const fallingCode = document.querySelector('.falling-code')



const deley = fallingCode.dataset.settimeoutdeley
const params = [
  {
  rightShift: 0,
  speed: 160,
  },
  {
  rightShift: 4,
  speed: 180,
  },
  {
  rightShift: 8,
  speed: 100,
  },
  {
  rightShift: 10,
  speed: 130,
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


let strings // it is store
let strings2 

// ================================================ run fallingCode 
setTimeout(() => {
  strings = createStrings(params)
  strings2 = [...strings]
  strings = filterElements(strings2)
  

  forEachCycle(strings)
  // checkResize()


  setInterval(() => {
    strings.forEach(elem => getAnimation(elem))
  }, 90)

  // strings.forEach(elem => {
  //   setInterval(() => {
  //     getAnimation(elem)
  //   },100)
  // })

}, deley)


//this part of code for testing
// let count = 0

// setTimeout(() => {
//   console.log(count)
// },2000)

// setInterval(() => {
//   const difference = Math.round((2808 / count) * 10)/ 10
//   console.log(`difference ${difference}`)
//   console.log(`count ${count}`)
//   count = 0
// }, 2000)


//====================================================== functions
function checkResize() {
  window.addEventListener('resize', () => {
    // it triggers when viewPort changes the size
    strings = filterElements(strings2)
    forEachCycle(strings)
  })
}
function forEachCycle(strings) {
  strings.forEach((elem) => {
    // it triggers when app is opened a first time
    createSpan(elem)
  })
}
function createStrings(params) {
  // it creats span elements in fallingCode
  const strings = []
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
    strings.push(string)
  }

  return strings
}
function createSpan(nodeElem) {
  // it creates string letter elements in string
  // it clean string elements from .letter
  // it assign animationDuration param to indicator-style element
  // console.log(nodeElem)
  // it assign speed 

  fallingCode.append(nodeElem)
  const viewPort = document.getElementById("home")
  const string = nodeElem
  const letters = nodeElem.querySelectorAll(`.letter`)
  const indicator = nodeElem.querySelector(`.indicator-style`)
  const timeDistense = indicator.dataset.time
  cleanList(letters)

  const bottomViewPort = viewPort.clientHeight // it is bottom of viewport
  let bottomString = string.clientHeight
  // console.log(string.className === 'string1')

  


  while (bottomViewPort > bottomString) {

    //it calculates distence and then add span elements into string, count of span's elements depends on calculated distanse 
    bottomString = string.clientHeight
    const span = document.createElement('span')
    span.classList.add('letter')
    span.textContent = `${randomInteger(0, 1)}`
    string.append(span)
  }
  assignSpeed(timeDistense)


  function cleanList(list) {
    const length = list.length
    for (let i = 0; i < length; i++){
      list[i].remove()
    }
  }
  function assignSpeed(timeDistanse) {
    // it assigns speed of moving for indicator
    const time = Math.round(bottomString / timeDistense * 10) / 10
    indicator.style.animationDuration = `${time}s`

  }
  function randomInteger(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
  }
} 
function getAnimation(nodeElem) {
  // it assigns 'active' class to eaxh elements that indicator touched
  const indicator = nodeElem.querySelector('.indicator-style')
  const letters = nodeElem.querySelectorAll(`.letter`)
  const heightStr = indicator.offsetTop
  // check2(nodeElem)

  
  
  for (let i = 0; i < letters.length; i++) {
    // count ++
    const height = letters[i].offsetHeight
    const top = letters[i].offsetTop
    const bottom = top + height
    
    const difference = Math.floor((heightStr - top) / height)
    if (difference > 1) {
      i += difference -1
      continue
    }

    if (heightStr >= top && heightStr <= bottom) {
      indicator.textContent = letters[i].textContent
      letters[i].classList.add('active')
      setTimeout(() => {
        letters[i].classList.remove('active')
      },0)
      break
    }
  }


}
function filterElements(strings) {

  const viewPort = window.innerWidth

  switch (true) {
    case (viewPort <= 375):
      return getResult(9)

    case (viewPort <= 462):
      return getResult(9)

    case (viewPort <= 520):
      return getResult(9)

    case (viewPort <= 768):
      return getResult(2)

    case (viewPort <= 992): 
      return getResult(1)

    default:
      return strings
  }

  function getResult(count) {
    const newList = getElements(count)
    cleanOldElements(newList)
    return newList
  }

  function getElements(count) {
    const length = strings.length
    const lastIndex = length - count
    const result = strings.slice(0, lastIndex)
    
    return result
  }
  function cleanOldElements(list) {
    const classNames = []
    list.forEach(elem => classNames.push(elem.className))
    const oldList = document.querySelectorAll('.falling-code > span')
    oldList.forEach(elem => {
      const oldName = elem.className
      if (classNames.includes(oldName)) return
      else elem.remove()
    })
  }
}





