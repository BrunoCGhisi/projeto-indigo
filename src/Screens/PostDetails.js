import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import deletePost from "../services/posts/deletePost";
import { auth } from "../config/firebaseconfig";

export default function PostDetails({ route, navigation }) {
  const { post, user } = route.params;

  const handleDeletePost = (id) => {
    deletePost(id);
    navigation.navigate("Home");
  };

  const currentUser = auth.currentUser;

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <View
          style={{
            width: "30rem",
            height: "2rem",
            marginLeft: "2rem",
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() =>
              navigation.navigate("UserProfile", {
                user: { ...user, uid: post.userId },
              })
            }
          >
            <Text style={styles.postCredits}>
              By: {user.displayName} ({user.email})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.container2}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.postDescription}>{post.description}</Text>
      </ScrollView>

      {post.userId === currentUser.uid && (
        <View style={styles.postButtons}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Postagem", {
                post: post,
                user: {
                  displayName: user.displayName,
                  email: user.email,
                },
              })
            }
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Alterar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeletePost(post.id)}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "red" }}>
              Deletar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "left",
    alignItems: "left",
    marginLeft: "1rem",
    padding: 10,
    backgroundColor: "#d9d9d9",
  },
  container1: {
    borderRadius: 10,
    backgroundColor: "white",
    height: 100,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  postTitle: {
    fontSize: 26,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 10,
    color: "black",
  },
  postDescription: {
    fontSize: 16,
    marginLeft: "2rem",
    padding: 10,
    color: "black",
  },
  postCredits: {
    paddingLeft: 10,
    fontSize: 15,
    color: "gray",
  },
  container2: {
    flex: 1,
    borderRadius: 10,
    marginTop: "1rem",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  postButtons: {
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    flexDirection: "row",
    gap: 80,
    marginVertical: 10,
    width: "100%",
  },
});
