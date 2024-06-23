import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { database } from "../config/firebaseconfig";
import deletePost from "../services/posts/deletePost";

export default function Home({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const { user } = route.params;

  useEffect(() => {
    const postsCollection = collection(database, "Posts");
    const unsubscribe = onSnapshot(postsCollection, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });

      setPosts(list);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 70, marginBottom: 20 }}>Home</Text>
      <TouchableOpacity
        style={{ backgroundColor: "cyan", marginBottom: 10 }}
        onPress={() => navigation.navigate("NewPost")}
      >
        <Text>Novo post</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        style={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ borderWidth: 1, borderColor: "red" }}
            onPress={() =>
              navigation.navigate("PostDetails", {
                post: item,
                user: {
                  userId: user.userId,
                },
              })
            }
          >
            <Text>{item?.title}</Text>
            <Text>{item?.description}</Text>
            {user.userId === item?.userId && (
              <TouchableOpacity onPress={() => deletePost(item?.id)}>
                <Text>Deletar</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item?.id}
      />
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
