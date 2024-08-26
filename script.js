document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const userInput = document.getElementById('userInput');
    const messages = document.getElementById('messages');
    const submitFeedback = document.getElementById('submitFeedback');
    const questionInput = document.getElementById('questionInput');
    const variableInput = document.getElementById('variableInput');
    const answerInput = document.getElementById('answerInput');

    // Referencias a las secciones
    const chatSection = document.getElementById('chatSection');
    const feedbackSection = document.getElementById('feedbackSection');

    // Pestañas
    const chatTab = document.getElementById('chatTab');
    const feedbackTab = document.getElementById('feedbackTab');

    // Cambia la sección visible
    chatTab.addEventListener('click', () => {
        switchSection(chatSection, chatTab);
    });

    feedbackTab.addEventListener('click', () => {
        switchSection(feedbackSection, feedbackTab);
    });

    function switchSection(section, tab) {
        chatSection.style.display = 'none';
        feedbackSection.style.display = 'none';
        section.style.display = 'block';

        chatTab.style.color = '#E0E0E0';
        feedbackTab.style.color = '#E0E0E0';
        tab.style.color = '#c62828';
    }

    // Enviar mensaje del usuario al hacer clic en el botón o presionar "Enter"
    sendButton.addEventListener('click', () => {
        enviarMensaje();
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') enviarMensaje();
    });

    function enviarMensaje() {
        const messageText = userInput.value.trim();
        if (messageText && !contieneContenidoInapropiado(messageText)) {
            fetch('https://raw.githubusercontent.com/tu-usuario/tu-repositorio/main/data.json') // URL al archivo JSON en GitHub
                .then(response => response.json())
                .then(data => {
                    const preguntasRespuestas = data.preguntas_respuestas;
                    
                    // Busca la respuesta en el JSON
                    function buscarRespuesta(pregunta) {
                        const respuestaEncontrada = preguntasRespuestas.find(item => item.pregunta.toLowerCase() === pregunta.toLowerCase());
                        return respuestaEncontrada ? respuestaEncontrada.respuesta : "No tengo una respuesta para eso.";
                    }

                    const respuesta = buscarRespuesta(messageText);
                    
                    // Crear contenedor para mensajes
                    const messageContainer = document.createElement('div');
                    messageContainer.className = 'message-container';
                    
                    // Mensaje del usuario
                    const userMessageElement = document.createElement('div');
                    userMessageElement.className = 'message user';
                    userMessageElement.innerHTML = `<strong>Usuario:</strong> ${messageText}`;
                    
                    // Mensaje del bot
                    const botMessageElement = document.createElement('div');
                    botMessageElement.className = 'message bot';
                    botMessageElement.innerHTML = `<strong>Asistente:</strong> ${respuesta}`;
                    
                    // Añadir mensajes al contenedor
                    messageContainer.appendChild(userMessageElement);
                    messageContainer.appendChild(botMessageElement);
                    
                    // Añadir contenedor al área de mensajes
                    messages.appendChild(messageContainer);
                    userInput.value = ''; // Limpiar campo de entrada
                    messages.scrollTop = messages.scrollHeight; // Desplazar hacia abajo
                });
        }
    }

    function contieneContenidoInapropiado(texto) {
        const palabrasProhibidas = ["malo", "inapropiado", "prohibido"]; // Añade palabras que deseas filtrar
        return palabrasProhibidas.some(palabra => texto.toLowerCase().includes(palabra));
    }

    // Enviar feedback
    submitFeedback.addEventListener('click', () => {
        const question = questionInput.value.trim();
        const variable = variableInput.value.trim();
        const answer = answerInput.value.trim();

        if (question && answer) {
            fetch('https://tu-servicio-backend.com/guardar-feedback', { // Cambia la URL al endpoint de tu servicio de backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pregunta: question,
                    variable: variable,
                    respuesta: answer
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Feedback enviado con éxito:', data);
                questionInput.value = '';
                variableInput.value = '';
                answerInput.value = '';
                alert('Feedback enviado con éxito');
            })
            .catch(error => {
                console.error('Error al enviar feedback:', error);
                alert('Hubo un error al enviar el feedback');
            });
        } else {
            alert('Por favor, completa todos los campos obligatorios');
        }
    });
});
