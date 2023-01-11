import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chat_container = document.querySelector('#chat_container');


// Loading logic 
let loadInterval;

function loader(element){
  element.textContent = '';
  loadInterval = setInterval(() => {
    element.textContent += '.';

    if(element.textContent === '...'){
      element.textContent = '';
    }

  }, 300)
}

function typeText(element, text){
  let index = 0
  let interval = setInterval(() => {
    if(index < text.length){
      element.innerHTML += text.charAt(index);
      index++;
    }else{
      clearInterval(interval)
    }

  })
}

function generateUniqueId(){
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexaDecimalString = randomNumber.toString(16);
  return `id-${timestamp}-${hexaDecimalString}`;
}

function chatStripe(isAi, value, uniqueId){
   return (
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div classname="profile">
            <img
              src="${isAi ? bot:user}"
              alt="${isAi ? 'bot':user}"
            />
          </div>
          <div class="message" id="${uniqueId}">${value}</div>
        </div>
      </div>
    `
   )
}

const handleSubmit = async(e) => {
  e.preventDefault(); //this will prevent the page to reload everytime 

}