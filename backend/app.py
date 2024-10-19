import os
import openai

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
openai.api_key = os.getenv('OPENAI_API_KEY')

# tokenizer, max_length = load_tokenizer(), load_max_length()

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    seed_text = data.get('seed_text', '')
    if not seed_text:
        return jsonify({'error': 'Seed text is required.'}), 400
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": seed_text}
            ],
            max_tokens=500
        )
        proposal = response.choices[0].message['content'].strip()
        return jsonify({'proposal': proposal}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()