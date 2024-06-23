import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import deletePost from "../services/posts/deletePost";

export default function PostDetails({ route, navigation }) {
  const { post, user } = route.params;
  console.log(post);
  console.log(user.userId);
  const handleDeletePost = (id) => {
    deletePost(id);
    navigation.navigate("Home", {user: user});
  };

  return (
    <View style={styles.container}>
      <Text>{post.title}</Text>
      <Text>{post.description}</Text>
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
            <Text>Alterar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
