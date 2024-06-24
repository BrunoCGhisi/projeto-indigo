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

      <View style={styles.post}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text>{post.description}</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#d9d9d9',
  },
  postTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'red'
  },
  post: {
    width: '100%',
    height: '30%',
    backgroundColor: 'blue',
    padding: 20,
  }
});
