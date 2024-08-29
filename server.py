from flask import Flask, request, jsonify
import random

app = Flask(__name__)

responses = [
    "Hola, ¿cómo puedo ayudarte?",
    "Lo siento, no entendí tu mensaje.",
    "¿Puedes decirme más sobre eso?",
]

@app.route('/get-response', methods=['POST'])
def get_response():
    data = request.json
    message = data.get('message')
    
    # Aquí puedes añadir lógica para procesar el mensaje
    # Por ejemplo, enviar respuestas predefinidas o usar algún modelo AI simple
    response = random.choice(responses)
    
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
