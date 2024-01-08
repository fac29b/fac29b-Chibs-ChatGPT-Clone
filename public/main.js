
const chatBox = document.querySelector(".chat-box");
const inputField = chatBox.querySelector("input[type='text']");
const button = chatBox.querySelector("button");
const chatBoxBody = chatBox.querySelector(".chat-box-body");
// let ChatGptMsg = "";
button.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {
  const message = inputField.value;
  inputField.value = "";
  chatBoxBody.innerHTML += `<div class="message"><p>${message}</p></div>`;
  chatBoxBody.innerHTML += `<div id="loading" class="response loading">.</div>`;
  scrollToBottom();
  window.dotsGoingUp = true;
  var dots = window.setInterval( function() {
      var wait = document.getElementById("loading");
      if ( window.dotsGoingUp ) 
          wait.innerHTML += ".";
      else {
          wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);
      if ( wait.innerHTML.length < 2)
          window.dotsGoingUp = true;
      }
      if ( wait.innerHTML.length > 3 )
          window.dotsGoingUp = false;
      }, 250);

  try {
  
    const response = await fetch('http://localhost:3000/api/gpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${apiKey}`
        },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    
    document.getElementById("loading").remove();

    
    chatBoxBody.innerHTML += `<div class="response"><p>${data.message}</p></div>`;
    scrollToBottom();
  } catch (error) {
    console.error(error);
    chatBoxBody.innerHTML += `<div class="response error"><p>Error: ${error.message}</p></div>`;
    scrollToBottom();
  }
}

function scrollToBottom() {
  // Scroll to the bottom of the chat box
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;

}
