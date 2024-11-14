from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

@app.route('/', methods=['GET'])
def home():
    return "Server is running!"

@app.route('/generate_recipe', methods=['POST'])
def generate_recipe():
    try:
        print("Received request") # Debug print
        data = request.get_json()
        print("Request data:", data) # Debug print
        
        cuisine = data.get('cuisine', '')
        time = data.get('time', 30)
        num_recipes = data.get('num_recipes', 1)

        # Create the prompt for OpenAI
        prompt = f"Generate {num_recipes} {cuisine} recipe(s) that can be made in {time} minutes. Include ingredients and step-by-step instructions."
        
        print("Calling OpenAI with prompt:", prompt) # Debug print

        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful cooking assistant. Provide recipes in a clear, step-by-step format."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )

        recipe_text = response.choices[0].message.content
        print("Generated recipe:", recipe_text) # Debug print

        return jsonify({"recipes": recipe_text})

    except Exception as e:
        print("Error:", str(e)) # Debug print
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting server on port 5000...") # Debug print
    app.run(host='0.0.0.0', port=5000, debug=True)