// Añadir eventos para los botones
document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('submitFeedback').addEventListener('click', submitFeedback);

// Función para enviar el mensaje (implementa la lógica de chat aquí)
function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return;

    // Aquí deberías añadir el mensaje al chat
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `<strong>Usuario:</strong> ${userInput}`;
    messagesDiv.appendChild(messageDiv);

    // Limpiar el input del usuario
    document.getElementById('userInput').value = '';

    // Aquí puedes añadir la lógica para manejar la respuesta del chat
}

// Función para enviar feedback
async function submitFeedback() {
    const question = document.getElementById('questionInput').value;
    const answer = document.getElementById('answerInput').value;

    if (question.trim() === '' || answer.trim() === '') {
        alert('Por favor, completa ambos campos.');
        return;
    }

    // Preparar los datos
    const feedback = {
        question: question,
        answer: answer
    };

    // Enviar feedback al servidor (aquí simulamos el almacenamiento en un archivo JSON)
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Error al cargar el archivo JSON');

        let data = await response.json();
        data.push(feedback);

        // Actualizar el archivo JSON (esto no se puede hacer directamente desde el navegador,
        // necesitarías un servidor para manejar esta actualización)
        // Aquí solo mostramos un mensaje de éxito
        alert('Feedback enviado con éxito.');

        // Limpiar los campos de entrada
        document.getElementById('questionInput').value = '';
        document.getElementById('answerInput').value = '';
    } catch (error) {
        console.error('Error al enviar feedback:', error);
        alert('Hubo un error al enviar el feedback.');
    }
}
