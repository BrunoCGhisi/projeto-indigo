import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { database, auth } from "../config/firebaseconfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export default function NewPost({ route, navigation }) {
  let post;
  if (route.params) {
    post = route.params.post;
  }
  console.debug(post);

  const [title, setTitle] = useState(post ? post.title : "");
  const [description, setDescription] = useState(post ? post.description : "");

  const isUpdating = Boolean(post);

  const addPost = async () => {
    try {
      const user = auth.currentUser; // Obtém o usuário atualmente autenticado
      if (!user) {
        throw new Error("No user is authenticated");
      }
      const tasksCollection = collection(database, "Posts");
      const postDocRef = await addDoc(tasksCollection, {
        title: title,
        description: description,
        userId: user.uid, // Inclui o ID do usuário
      });
      navigation.navigate("PostDetails", {
        post: {
          id: postDocRef.id,
          title: title,
          description: description,
          userId: user.uid,
        },
        user: { userId: user.uid },
      });
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const updatePost = async () => {
    if (!isUpdating) return;
    try {
      const user = auth.currentUser; // Obtém o usuário atualmente autenticado
      if (!user) {
        throw new Error("No user is authenticated");
      }

      const postDocRef = doc(database, "Posts", post.id);
      await updateDoc(postDocRef, {
        ...post,
        title: title,
        description: description,
      });

      navigation.navigate("PostDetails", {
        post: { ...post, title: title, description: description },
        user: { userId: user.uid },
      });
    } catch (error) {
      console.error("Error in task: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>
        {isUpdating ? "Alterar Post" : "Nova postagem"}
      </Text>
      <View style={styles.titleContainer}>

        <TextInput
          style={styles.titleInput}
          placeholder="Título"
          onChangeText={setTitle}
          value={title}
        />
      </View>
      <View style={styles.postContainer}>
        <TextInput
          style={styles.descInput}
          placeholder="Descrição"
          onChangeText={setDescription}
          value={description}
          multiline
        />
      </View>
      <TouchableOpacity
        style={styles.btnsave}
        disabled={title === "" || description === ""}
        onPress={() => {
          if (isUpdating) {
            updatePost();
          } else {
            addPost();
          }
        }}
      >
        <Text style={styles.txtbtnsave}> Salvar </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',

  },
  titleContainer: {
    borderRadius: 10,
    height: 80,
    marginBottom: 20,
    width: '95%',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  postContainer: {
    borderRadius: 10,
    height: 200,
    width: '95%',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  txtTitle: {
    width: "90%",
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 16,
    color: "#22123C",
  },
  titleInput: {
    width: "90%",
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#373D20",
    marginHorizontal: "auto",
  },
  descInput: {
    width: "90%",
    marginTop: 10,
    padding: 10,
    height: '100%',
    marginHorizontal: "auto",
  },
  btnsave: {
    width: "60%",
    backgroundColor: "#373D20",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: 50,
    bottom: "5%",
    left: "20%",
    borderRadius: 20,
  },
  txtbtnsave: {
    color: "#EFF1ED",
    fontSize: 25,
    fontWeight: "bold",
  },
});
