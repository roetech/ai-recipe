
let apiKey = '';

let messages = [];

const loaderContainer = document.querySelector('.loader-container');

function init() {
  submitBtn.addEventListener('click', () => handle_QUERY());
  inputField.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      handle_QUERY();
    }
  });
}


function handle_QUERY() {
  
  loaderContainer.style.display = 'flex';
  
  const result = document.getElementsByClassName('message');
  while(result.length > 0){
    result[0].parentNode.removeChild(result[0]);
  }

  let question = 'The answer should be in British English and embedded in HTML tags. Give me an ' +  style.value +' recipe using ' + chicken.value + ' and '  + inputField.value + '. Using European measurements. Recipe time should be' + time.value;
  
  messages.push({
    'role': 'user',
    'content': question
  })
  
  
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages       
    })
  })
  .then(response => response.json())
  .then(data => {    
    loaderContainer.style.display = 'none';
   
    messages.push({
      'role': 'assistant',
      'content': data.choices[0].message.content 
    });


    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add('bot');
    div.innerHTML = data.choices[0].message.content;
    results.appendChild(div);

    //scroll to bottom of results
    results.scrollTop = results.scrollHeight;
    
  });
}

fetch('./config.json')
.then(response => response.json())
.then(data => {
  apiKey = data.apiKey;
  init();
});