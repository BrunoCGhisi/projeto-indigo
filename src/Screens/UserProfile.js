import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { database, doc, deleteDoc, auth } from "../config/firebaseconfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import AntDesign from "@expo/vector-icons/AntDesign";
import { signOut } from "firebase/auth";

export default function UserProfile({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.error("nenhum user logado");
      return;
    }

    const postCollection = collection(database, "Posts");
    const q = query(postCollection, where("idUser", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setTask(list);
    });

    return () => unsubscribe();
  }, []);

  function deletePost(id) {
    //database.collection("Tasks").doc(id).deleteDoc()
    const postDocRef = doc(database, "Posts", id);
    deleteDoc(postDocRef);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={posts}
        renderItem={({ post }) => {
          return (
            <View style={styles.tasks}>
              <TouchableOpacity
                style={styles.btnDeleteTask}
                onPress={() => {
                  deletePost(post.id);
                }}
              >
                <AntDesign name="delete" size={24} color="#373D20" />
              </TouchableOpacity>
              <Text
                style={styles.txtdescription}
                onPress={() => {
                  navigation.navigate("Post", {
                    id: post.id,
                    title: post.title,
                    description: post.description,
                  });
                }}
              >
                {post.title}
                {post.description}
              </Text>
            </View>
          );
        }}
      />

      <TouchableOpacity style={styles.btnNewTask}>
        <Text
          style={styles.iconBtn}
          onPress={() => navigation.navigate("Post")}
        >
          {" "}
          +{" "}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF1ED",
    paddingTop: 20,
  },
  btnNewTask: {
    backgroundColor: "#373D20",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: 60,
    width: 60,
    bottom: 30,
    left: 20,
    borderRadius: 20,
  },
  iconBtn: {
    color: "#EFF1ED",
    fontSize: 25,
    fontWeight: "bold",
  },
  tasks: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  btnDeleteTask: {
    justifyContent: "center",
    paddingLeft: 15,
  },
  txtdescription: {
    width: "80%",
    alignContent: "flex-start",
    backgroundColor: "#bcbd8b",
    padding: 12,
    paddingHorizontal: 20,
    marginBottom: 5,
    marginRight: 15,
    color: "#766153",
  },
  btnLogout: {
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: 50,
    width: "60%",
    bottom: 30,
    right: 20,
    borderRadius: 20,
  },
  txtbtnLogout: {
    color: "#EFF1ED",
    fontSize: 18,
    fontWeight: "bold",
  },
});

//Tela do próprio usuario
//Informações necessárias
//Nome do usuario em destaque
//Descrição do usuario em destaque?
//Botão abrir editar Login
//Listas dos posts do Usuário em questão
