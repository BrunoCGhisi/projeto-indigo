import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import deletePost from "../services/posts/deletePost";

export default function PostDetails({ route, navigation }) {
  const { post, user } = route.params;

  console.log(post);
  console.log(user.userId);
  const handleDeletePost = (id) => {
    deletePost(id);
    navigation.navigate("Home", { user: user });
  };

  return (
    <View style={styles.container}>
      <View style={styles.post}>
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
            <Text style={styles.postCredits}>
              By: {user.displayName} ({user.email})
            </Text>
          </View>
        </View>
        <ScrollView style={styles.container2}>
          <Text style={styles.postDescription}>{post.description}</Text>
        </ScrollView>
      </View>

      {post.userId === user.userId && (
        <View>
          <TouchableOpacity onPress={() => handleDeletePost(post.id)}>
            <Text>Deletar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("NewPost", {
                post: post,
              })
            }
          >
            <Text style={styles.btn}>Alterar</Text>
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
    backgroundColor: '#d9d9d9'
  },
  container1: {
    height: 150,
    width: "98%",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  postTitle: {
    fontSize: 42,
    fontWeight: "bold",
    marginLeft: "2rem",
    marginTop: "1rem",
    color: "black",
  },
  postDescription: {
    fontSize: 20,
    marginLeft: "2rem",
    marginTop: "1rem",
    color: "black",
  },
  postCredits: {
    fontSize: 15,
    color: "gray",
  },
  container2: {
    marginTop: "1rem",
    height: "50rem",
    width: "98%",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});
