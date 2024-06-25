import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { database, auth } from "../config/firebaseconfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export default function NewPost({ route, navigation }) {
  const post = route.params?.post;

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
      navigation.navigate("Home");
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

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error in task: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      style={styles.container}
    >
      <Text style={styles.txtTitle}>
        {isUpdating ? "Alterar Post" : "Nova postagem"}
      </Text>
      <TextInput
        style={styles.titleInput}
        placeholder="Título"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.descInput}
        placeholder="Descrição"
        onChangeText={setDescription}
        value={description}
        multiline
      />

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
        <Text style={styles.txtbtnsave}>
          {isUpdating ? "Salvar" : "Postar"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    paddingHorizontal: 5,
    gap: 15
  },
  txtTitle: {
    width: "90%",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    color: "#22123C",
  },
  titleInput: {
    width: "95%",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
    marginHorizontal: "auto",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  descInput: {
    marginTop: 10,
    padding: 10,
    borderRadius: 4,
    marginHorizontal: "auto",
    width: "95%",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    maxHeight: "35%",
  },
  btnsave: {
    width: "60%",
    backgroundColor: "#22123C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    marginVertical: 20,
  },
  txtbtnsave: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
});
