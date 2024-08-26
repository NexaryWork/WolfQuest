document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const feedbackInput = document.getElementById('feedbackInput');
    const feedbackButton = document.getElementById('feedbackButton');

    let data = {};

    // Cargar datos JSON
    fetch('data.json')
        .then(response => response.json())
        .then(json => {
            data = json;
        })
        .catch(error => console.error('Error cargando el archivo JSON:', error));

    // Enviar pregunta
    sendButton.addEventListener('click', () => {
        const question = userInput.value.trim();
        if (question) {
            displayMessage('Usuario', question);
            processQuestion(question);
            userInput.value = '';
        }
    });

    // Procesar pregunta
    function processQuestion(question) {
        let response = 'No se encontró respuesta.';
        const lowerQuestion = question.toLowerCase();
        
        for (const key in data) {
            if (data[key].toLowerCase().includes(lowerQuestion)) {
                response = data[key];
                break;
            }
        }
        
        // Validación de respuesta
        response = filterResponse(response);
        displayMessage('Asistente', response);
    }

    // Mostrar mensaje
    function displayMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Filtrar respuestas inapropiadas
    function filterResponse(response) {
        const inappropriateWords = ['malo', 'inapropiado']; // Añadir palabras a filtrar
        for (const word of inappropriateWords) {
            if (response.toLowerCase().includes(word)) {
                return 'Lo siento, no puedo proporcionar una respuesta para esa pregunta.';
            }
        }
        return response;
    }

    // Enviar feedback
    feedbackButton.addEventListener('click', () => {
        const feedback = feedbackInput.value.trim();
        if (feedback) {
            // Aquí puedes implementar la lógica para enviar el feedback a un servidor o guardarlo
            alert('Gracias por tu feedback!');
            feedbackInput.value = '';
        }
    });
});
