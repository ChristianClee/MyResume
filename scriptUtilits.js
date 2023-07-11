// const axios = require("axios")
// toggle icon navbar
const mebuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

mebuIcon.onclick = () => {
  mebuIcon.classList.toggle('bx-x')
  navbar.classList.toggle('active')
}

//scroll sections
const sections = document.querySelectorAll('section')
const header = document.querySelector('header')
const navLinks = document.querySelectorAll('header nav a')
  window.onscroll = () => {
    sections.forEach(sec => {
      const heighHeader = header.getBoundingClientRect().height // it determines height of header
      const top = window.scrollY
      const offset = sec.offsetTop - heighHeader
      const height = sec.offsetHeight
      const id = sec.getAttribute("id")
      if (top >= offset && top < offset + height) {
        // active navbar links
        navLinks.forEach(links => {
          links.classList.remove('active');
          document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
        })
         // active sections for animation on scroll
      // sec.classList.add('show-animate')
      }
      // if want to use animation that repeats on scroll use this
      // else {
      //   sec.classList.remove('show-animate')
      // }

    })
  
      // sticky header
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // remove toggle icon and navbar when click navbar links (scroll)
    mebuIcon.classList.remove('bx-x')
    navbar.classList.remove('active')
}


//================================= my animation
const elemsSpan = document.querySelectorAll('.animate2')

const observerTest = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entrie => {
      const { isIntersecting, target } = entrie
      if (isIntersecting) {
        target.classList.add("active")
      }
      // else {
      //   target.classList.remove("active")
      // }
    })
  }, {}
)
elemsSpan.forEach(elem => observerTest.observe(elem))

// =============================== my buttons

const details = document.querySelector('.about-content .details')
const buttonDetails = document.querySelector('.about-content .btn')
buttonDetails.onclick = () => {
  details.classList.toggle('active')
  const condition = details.classList.value.split(' ').includes('active')
  if (condition) {
    buttonDetails.textContent = "Hide"
  } else {
    buttonDetails.textContent = 'Read more'
  }
}

// ========================== aducation-content
 
const contents = document.querySelectorAll('.aducation-content .content .year')
const maxHeight = () => {
  let maxheight = 0
  contents.forEach(content => {
    const contentHeight = content.getBoundingClientRect().height;
    if (contentHeight > maxheight) {
      maxheight = contentHeight
    } 
  })
  contents.forEach(content => { 
    content.style.height = `${maxheight}px`
  })
}
maxHeight()

window.addEventListener('resize', () => {
  maxHeight()
})
