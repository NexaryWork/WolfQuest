document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const message = inputField.value;

    if (message.trim() !== '') {
        displayUserMessage(message);
        inputField.value = '';
        generateBotResponse();
    }
}

function displayUserMessage(message) {
    const chatBox = document.getElementById('chat-box');
    const userBubble = document.createElement('div');
    userBubble.classList.add('bubble', 'user-bubble');
    userBubble.textContent = message;
    chatBox.appendChild(userBubble);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
}

function generateBotResponse() {
    const chatBox = document.getElementById('chat-box');
    const botBubble = document.createElement('div');
    botBubble.classList.add('bubble', 'bot-bubble', 'typing');
    botBubble.textContent = '';
    chatBox.appendChild(botBubble);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulación de respuesta del bot
    setTimeout(() => {
        botBubble.classList.remove('typing');
        botBubble.textContent = 'Aquí está una respuesta predefinida a tu mensaje.';
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);  // 1 segundo de espera para simular escritura
}