import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

type Comment = {
  id: number;
  user: string;
  text: string;
};

type Post = {
  id: number;
  user: string;
  text: string;
  image: string | null; // Image URL or local path
  comments: Comment[];
};

const SocialThread = ({ username }: { username?: string }) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "Sean",
      text: "Sean made Steak",
      image: require("../../assets/images/steak.jpg"), // Replace with Sean's image
      comments: [],
    },
  ]);
  const [newThreadText, setNewThreadText] = useState<string>("");
  const [newThreadImage, setNewThreadImage] = useState<string | null>(null);

  const addNewThread = () => {
    if (newThreadText.trim() || newThreadImage) {
      const newPost: Post = {
        id: Date.now(),
        user: username || "Anon", // Default to "Anon" if username is not provided
        text: newThreadText,
        image: newThreadImage, // Attach the selected image
        comments: [],
      };
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setNewThreadText("");
      setNewThreadImage(null);
    }
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
      },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          setNewThreadImage(response.assets[0].uri || null);
        }
      }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Threads</Text>

      {/* New Thread Input */}
      <View style={styles.newThreadContainer}>
        <TextInput
          style={styles.newThreadInput}
          value={newThreadText}
          onChangeText={setNewThreadText}
          placeholder="Start a new thread..."
        />
        {newThreadImage && (
          <Image
            source={{ uri: newThreadImage }}
            style={styles.newThreadImagePreview}
          />
        )}
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          <Text style={styles.imagePickerButtonText}>Attach Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newThreadButton} onPress={addNewThread}>
          <Text style={styles.newThreadButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Display Posts */}
      {posts.map((post) => (
        <PostItem key={post.id} post={post} username={username || "Anon"} setPosts={setPosts} />
      ))}
    </ScrollView>
  );
};

const PostItem = ({
  post,
  username,
  setPosts,
}: {
  post: Post;
  username: string;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}) => {
  const [newComment, setNewComment] = useState<string>("");

  const addComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        user: username, // Use the username passed from SocialThread
        text: newComment,
      };
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id ? { ...p, comments: [...p.comments, comment] } : p
        )
      );
      setNewComment("");
    }
  };

  return (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Text style={styles.postUser}>{post.user}</Text>
        <Text>{post.text}</Text>
      </View>

      {/* Post Image */}
      {post.image && (
        <Image
          source={typeof post.image === "string" ? { uri: post.image } : post.image}
          style={styles.postAttachedImage}
        />
      )}

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Text>❤️</Text>
        <Text>💬</Text>
        <Text>🔁</Text>
      </View>

      {/* Comments Section */}
      <FlatList
        data={post.comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentUser}>{item.user}:</Text>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noCommentsText}>No comments yet.</Text>}
      />

      {/* Add Comment */}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
        />
        <TouchableOpacity style={styles.commentButton} onPress={addComment}>
          <Text style={styles.commentButtonText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

export default SocialThread;
