// npm run dev

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

    if(element.textContent === '....'){
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
          <div class="profile">
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

  const data = new FormData(form);

  //users chtastripe
  chat_container.innerHTML += chatStripe(false, data.get('prompt'));
  form.reset();

  //bots chatstripe
  const uniqueId = generateUniqueId()
  chat_container.innerHTML += chatStripe(true, " ", uniqueId);

  chat_container.scrollTop = chat_container.scrollHeight; //this will put new mesg in view

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  // fetch data from the server -> get bots response
  const response = await fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        prompt: data.get('prompt')
    })
})

  clearInterval(loadInterval);
  messageDiv.innerHTML = '';
  if(response.ok){
    const data = await response.json();
    const parsedData = data.bot.trim();
    typeText(messageDiv, parsedData);

  }else{
    const err = await response.text();
    messageDiv.innerHTML = "Something went wrong!";
    alert(err);
  }
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if(e.keyCode === 13){ //keycode for enter button is 13
    handleSubmit(e);
  }
})