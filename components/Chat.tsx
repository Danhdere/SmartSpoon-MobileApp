import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Text,
} from "react-native";

type Message = {
  id: number;
  text: string;
  sender: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Define the state with Message type
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    // Fetch initial messages or set up a real-time listener
    // For example: Fetch messages from an API or WebSocket
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObject: Message = {
        id: Date.now(),
        text: newMessage,
        sender: "currentUser", // Replace with the actual username
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObject]); // Add the new message to the list
      setNewMessage(""); // Clear the input
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text style={styles.sender}>{item.sender}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  message: { marginBottom: 10 },
  sender: { fontWeight: "bold" },
  text: { fontSize: 14 },
  inputContainer: { flexDirection: "row", marginTop: 10 },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default Chat;
