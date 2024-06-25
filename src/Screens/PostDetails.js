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
    borderRadius: 10,
    height: 100,
    backgroundColor: "white",
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
    borderRadius: 10,
    marginTop: "1rem",
    height: 550,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});
