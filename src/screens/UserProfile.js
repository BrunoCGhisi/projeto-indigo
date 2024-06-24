import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, database, functions } from "../config/firebaseconfig";
import deletePost from "../services/posts/deletePost";
import { httpsCallable } from "firebase/functions";

import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

export default function UserProfile({ route, navigation }) {
  const [posts, setPosts] = useState({
    post: {
      id: "",
      title: "",
      description: "",
      userId: "",
    },
  });
  const { user } = route.params;
  const currentUser = auth.currentUser;

  useEffect(() => {
    const postsCollection = collection(database, "Posts");
    const unsubscribe = onSnapshot(postsCollection, async (querySnapshot) => {
      try {
        const fetchUserData = async (userId) => {
          const getUserData = httpsCallable(functions, "getUserData");
          const response = await getUserData({ uid: userId });

          if (response.data.success) {
            return response.data.data;
          } else {
            console.error("Error fetching user data:", response.data.error);
            return null;
          }
        };

        const promises = querySnapshot.docs.map(async (post) => {
          const postData = post.data();
          const user = await fetchUserData(postData.userId);
          console.log(user.displayName);
          return {
            post: { ...postData, id: post.id },
            user: user
              ? { email: user.email, displayName: user.displayName }
              : { email: "Unknown", displayName: "Unknown" },
          };
        });

        const resolvedList = await Promise.all(promises);
        setPosts(resolvedList);
        console.log(resolvedList);
      } catch (error) {
        console.error(error);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 70, marginBottom: 20 }}>
        Perfil {currentUser ? currentUser.displayName : "Usuário"}
      </Text>

      <TouchableOpacity
        style={{ backgroundColor: "cyan", marginBottom: 10 }}
        onPress={() => navigation.navigate("LoginEdit", { user: user })}
      >
        <Text> Editar Perfil </Text>
      </TouchableOpacity>

      <FlatList
        data={posts}
        style={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ borderWidth: 1, borderColor: "red" }}
            onPress={() =>
              navigation.navigate("PostDetails", {
                post: item.post,
                user: {
                  userId: user.uid,
                },
              })
            }
          >
            {user.uid === item?.post.userId && (
              <View>
                <Text>{item?.post.title}</Text>
                <Text>{item?.post.description}</Text>
                <Text>{item?.user.displayName}</Text>
                <Text>{item?.user.email}</Text>
              </View>
            )}
            {user.uid === item?.post.userId && (
              <TouchableOpacity onPress={() => deletePost(item?.post.id)}>
                <Text>Deletar</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item?.post.id}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Home", { user: user })}
      >
        <Text>Home</Text>
      </TouchableOpacity>
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
