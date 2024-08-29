const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function appendMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.innerHTML = `<div class="bubble ${type}">${message}</div>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        appendMessage(message, 'user');
        userInput.value = '';
        getBotResponse(message);
    }
}

function getBotResponse(message) {
    appendMessage('<div class="typing-indicator">•••</div>', 'bot');
    fetch('/get-response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => {
        const botMessageElement = chatBox.querySelector('.message.bot .bubble');
        if (botMessageElement) {
            botMessageElement.innerHTML = data.response;
        } else {
            appendMessage(data.response, 'bot');
        }
    });
}
