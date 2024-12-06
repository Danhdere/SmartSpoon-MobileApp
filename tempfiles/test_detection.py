import cv2
import numpy as np
from roboflow import Roboflow

# Initialize RoboFlow and load the model
rf = Roboflow(api_key="PAfKylPxXHmAqTYN1kK0")
project = rf.workspace().project("multiclass-object-detection-model")
model = project.version(1).model

# Set the model input size (default is 640x640 for YOLO)
MODEL_SIZE = (640, 640)

# Function to preprocess the frame
def preprocess(frame):
    """
    Resize and normalize the image for RoboFlow model input.
    """
    resized_frame = cv2.resize(frame, MODEL_SIZE)
    return resized_frame

# Function to draw bounding boxes on the frame
def draw_detections(frame, predictions, input_shape):
    """
    Draw bounding boxes and labels on the image.
    """
    for prediction in predictions["predictions"]:
        x = int(prediction["x"] - prediction["width"] / 2)
        y = int(prediction["y"] - prediction["height"] / 2)
        width = int(prediction["width"])
        height = int(prediction["height"])
        confidence = prediction["confidence"]
        label = prediction["class"]

        # Draw bounding box
        cv2.rectangle(frame, (x, y), (x + width, y + height), (0, 255, 0), 2)
        # Draw label
        label_text = f"{label} ({confidence:.2f})"
        cv2.putText(frame, label_text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    return frame

# Open the live camera feed
cap = cv2.VideoCapture(1)  # Change the index if necessary for your camera

if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

print("Press 'q' to quit the live feed.")

while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: Could not read frame from camera.")
        break

    # Preprocess the frame
    preprocessed_frame = preprocess(frame)

    # Run inference on the frame using the RoboFlow model
    predictions = model.predict(preprocessed_frame, confidence=40, overlap=30).json()

    # Draw detections on the frame
    frame_with_detections = draw_detections(frame, predictions, MODEL_SIZE)

    # Display the frame
    cv2.imshow("Live Detection", frame_with_detections)

    # Exit on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()
