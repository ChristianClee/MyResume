// const axios = require('axios')

const popUp = document.querySelector('.pop-up')
// console.log(popUp)
// popUp.style.display = 'block'
const showPopUp = () => {
  popUp.classList.add('active')
  setTimeout(()=>{popUp.classList.remove('active')},5000)

}

const TOKEN = '6311982431:AAH3Ly7SFsEUOtEGE2eefpuuSxu4QT8lPQE'
const CHAT_ID = '-1001481230538'
const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`

document.getElementById('tg').addEventListener('submit', function (e) {
  e.preventDefault()
  let message = `<b>new message!</b>\n`;
  message += `<b>name: </b> ${this.name.value}\n`
  message += `<b>mail: </b> ${this.email.value}\n`
  message += `<b>phone: </b> ${this.phone.value}\n`
  message += `<b>text: </b> ${this.textAria.value}\n`
  axios.post(URL, {
    chat_id: CHAT_ID,
    parse_mode: 'html',
    text: message
  })
  .then((res) => {
    this.name.value = ''
    this.email.value = ''
    this.phone.value = ''
    this.textAria.value = ''
    showPopUp()
  })
  .catch((err) => {
    console.warn(err)
  })
  .finally(() => {
    console.log('end')
  })
})