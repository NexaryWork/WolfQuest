document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            window.botData = data;
        });

    document.querySelector('.tablink').click();
});

function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    const tablinks = document.getElementsByClassName('tablink');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const chatbox = document.getElementById('chatbox');
    const userMessage = document.createElement('div');
    userMessage.className = 'userMessage';
    userMessage.textContent = userInput;
    chatbox.appendChild(userMessage);

    const botResponse = getBotResponse(userInput);
    const botMessage = document.createElement('div');
    botMessage.className = 'botMessage';
    botMessage.textContent = botResponse;
    chatbox.appendChild(botMessage);

    document.getElementById('userInput').value = '';
    chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotResponse(input) {
    const data = window.botData;
    return data[input] || 'Lo siento, no tengo una respuesta para eso.';
}

function submitFeedback() {
    const newQuestion = document.getElementById('newQuestion').value;
    const newAnswer = document.getElementById('newAnswer').value;

    if (newQuestion && newAnswer) {
        window.botData[newQuestion] = newAnswer;
        updateJSONFile(window.botData);
        alert('¡Gracias por tu feedback!');
    } else {
        alert('Por favor, completa ambos campos.');
    }
}

function updateJSONFile(data) {
    fetch('update_json.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('JSON actualizado:', result);
    })
    .catch(error => {
        console.error('Error al actualizar el JSON:', error);
    });
}
