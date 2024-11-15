// src/ObjectDetection.tsx

import React, { useState } from "react";
import axios from "axios";

interface Prediction {
  x: number;
  y: number;
  width: number;
  height: number;
  class: string;
  confidence: number;
}

const ObjectDetection: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Handler for file input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  };

  // Function to handle detection
  const handleDetection = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://127.0.0.1:5000/detect", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const predictions = response.data.predictions;
      setPredictions(predictions);
    } catch (error) {
      console.error("Error during detection:", error);
    }
  };

  // Render bounding boxes
  const renderBoundingBoxes = () => {
    if (!imageUrl) return null;

    return predictions.map((prediction, index) => {
      const { x, y, width, height, class: label, confidence } = prediction;
      return (
        <div
          key={index}
          style={{
            position: "absolute",
            border: "2px solid #00FF00",
            left: x - width / 2,
            top: y - height / 2,
            width: width,
            height: height,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: -20,
              left: 0,
              color: "#00FF00",
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "2px 5px",
              fontSize: "12px",
            }}
          >
            {label} ({(confidence * 100).toFixed(2)}%)
          </span>
        </div>
      );
    });
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <h2>Object Detection</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleDetection} disabled={!image}>
        Detect Objects
      </button>
      {imageUrl && (
        <div style={{ position: "relative", display: "inline-block", maxWidth: "80%", maxHeight: "80vh", overflow: "hidden" }}>
          <img src={imageUrl} alt="Uploaded" style={{ width: "100%", height: "auto", maxHeight: "600px", objectFit: "contain" }} />
          {renderBoundingBoxes()}
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
