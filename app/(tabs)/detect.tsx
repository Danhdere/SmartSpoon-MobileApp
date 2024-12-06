import { View, StyleSheet } from 'react-native'
import React from 'react'
import FoodDetector from '@/components/ObjectDetector'

const DetectScreen = () => {
  return (
    <View style={styles.container}>
      <FoodDetector />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#4B6A43" },
  newThreadContainer: { marginBottom: 20 },
  newThreadInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  newThreadImagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  imagePickerButton: {
    backgroundColor: "#c3a687",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerButtonText: { color: "#fff", fontWeight: "bold" },
  newThreadButton: {
    backgroundColor: "#4B6A43",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  newThreadButtonText: { color: "#fff", fontWeight: "bold" },
  postContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postHeader: {
    flexDirection: "column",
    marginBottom: 10,
  },
  postAttachedImage: {
    width: 200, // Set a fixed width
    height: 200, // Make height equal to width
    borderRadius: 8, // Optional: Keep the rounded corners
    alignSelf: "center", // Center the image in the post
    marginBottom: 10, // Add space below the image
    resizeMode: "cover", // Ensures the image scales properly without distortion
  },
  
  postUser: { fontWeight: "bold", marginBottom: 5 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  comment: {
    flexDirection: "row",
    marginBottom: 5,
  },
  commentUser: { fontWeight: "bold", marginRight: 5 },
  commentText: { fontSize: 14 },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: "#4B6A43",
    padding: 10,
    borderRadius: 8,
  },
  commentButtonText: { color: "#fff", fontWeight: "bold" },
  noCommentsText: { color: "#aaa", fontStyle: "italic" },
});


export default DetectScreen