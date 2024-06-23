import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { auth, database, functions } from "../config/firebaseconfig";
import deletePost from "../services/posts/deletePost";
import { httpsCallable } from "firebase/functions";

export default function Home({ route, navigation }) {
  const [posts, setPosts] = useState({
    post: {
      id: "",
      title: "",
      description: "",
      userId: "",
    },
    user: {
      displayName: "",
      email: "",
    },
  });
  const { user } = route.params;

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
          console.log(user.displayName)
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
                post: item.post,
                user: {
                  userId: user.userId,
                },
              })
            }
          >
            <Text>{item?.post.title}</Text>
            <Text>{item?.post.description}</Text>
            <Text>{item?.user.displayName}</Text>
            <Text>{item?.user.email}</Text>
            {user.userId === item?.post.userId && (
              <TouchableOpacity onPress={() => deletePost(item?.post.id)}>
                <Text>Deletar</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item?.post.id}
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
