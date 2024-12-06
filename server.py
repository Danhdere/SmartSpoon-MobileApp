from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from openai import OpenAI
from roboflow import Roboflow
import supervision as sv
import cv2
import os


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Initialize Roboflow with the new model
rf = Roboflow(api_key="PAfKylPxXHmAqTYN1kK0")
project = rf.workspace().project("multiclass-object-detection-model")
model = project.version(1).model

UPLOAD_FOLDER = 'temp_uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/detect', methods=['POST'])
def detect_objects():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    # Get the uploaded image file from the request
    image_file = request.files['file']
    image_path = "temp.jpg"
    image_file.save(image_path)  # Save image temporarily on the server

    # Perform inference using the RoboFlow model
    result = model.predict(image_path).json()

    # Clean up the temporary image file
    os.remove(image_path)

    # Return the detection results to the frontend
    return jsonify(result)



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
        prompt = f"""Generate {num_recipes} {cuisine} recipe(s) that can be made in {time} minutes. 
        Include ingredients and step-by-step instructions. Ingredients you have and try to include from the pantry are:
        flour, sugar, oil, baking powder, salt, broccoli, garlic, onion, cabbage, tomato, chicken, pork, tofu, 
        beef, salmon, apple, orange, mango, rice, oats, quinoa, spaghetti, tortillas, butter, milk, yogurt, cheese. You are not limited to these ingredients however.
        """
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