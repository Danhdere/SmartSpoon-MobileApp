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

@app.route('/detect-food', methods=['POST'])
def detect_food():
    try:
        # Check if image file is present in request
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
            
        image_file = request.files['image']
        if image_file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Save uploaded file
        filename = secure_filename(image_file.filename)
        temp_path = os.path.join(UPLOAD_FOLDER, filename)
        image_file.save(temp_path)
        
        # Run inference
        try:
            result = model.predict(temp_path, confidence=40, overlap=30).json()
        except Exception as e:
            return jsonify({'error': f'Roboflow prediction failed: {str(e)}'}), 500

        # Extract detections
        detections = sv.Detections.from_roboflow(result)
        labels = [item["class"] for item in result["predictions"]]
        
        # Load and annotate image
        image = cv2.imread(temp_path)
        if image is None:
            return jsonify({'error': 'Failed to load image'}), 500

        # Annotate image
        label_annotator = sv.LabelAnnotator()
        box_annotator = sv.BoxAnnotator()
        
        annotated_image = box_annotator.annotate(scene=image, detections=detections)
        annotated_image = label_annotator.annotate(
            scene=annotated_image, 
            detections=detections, 
            labels=labels
        )

        # Save annotated image
        annotated_path = os.path.join(UPLOAD_FOLDER, f'annotated_{filename}')
        cv2.imwrite(annotated_path, annotated_image)

        # Clean up original image
        os.remove(temp_path)
        
        # Return annotated image
        return send_file(
            annotated_path,
            mimetype='image/jpeg',
            as_attachment=False,
            download_name='annotated.jpg'
        )
        
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({'error': f'Server error: {str(e)}'}), 500
    finally:
        # Clean up annotated image
        try:
            if 'annotated_path' in locals():
                os.remove(annotated_path)
        except:
            pass



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