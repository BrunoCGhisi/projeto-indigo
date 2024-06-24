import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView
} from "react-native";
import { auth, database, functions } from "../config/firebaseconfig";
import deletePost from "../services/posts/deletePost";
import { httpsCallable } from "firebase/functions";
import Header from "../../Header";

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

      <Header/>
      <TouchableOpacity
        style={styles.postNew}
        onPress={() => navigation.navigate("NewPost")}
      >
        <Text style={styles.txt_postNew}>+</Text>
      </TouchableOpacity>

      <ScrollView>

      <FlatList
        style={styles.flatlist}
        data={posts}

        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item_flatlist}
            onPress={() =>
              navigation.navigate("PostDetails", {
                post: item.post,
                user: {
                  userId: user.userId,
                },
              })
            }
          >
          <View style={styles.post_container} >
            <Text style={styles.postTitle}>{item?.post.title}</Text>
            <Text style={styles.postUser}>{item?.user.displayName}</Text>
            <Text style={styles.postDesc}>{item?.post.description}</Text>
            <Text style={styles.postUser}>by: {item?.user.email}</Text>
            {user.userId === item?.post.userId && (
              <TouchableOpacity style={styles.postDel} onPress={() => deletePost(item?.post.id)}>
                <Text>Deletar</Text>
              </TouchableOpacity>
            )}
          </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item?.post.id}
      />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  flatlist: {
   margin: 10,
  },
  item_flatlist:{
  },
  post_container:{
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  postTitle:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  postDesc: {
    marginBottom: 12,
    marginTop: 12
  },
  postUser:{
    fontSize: 12,
  },
  postDel:{
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 'bold',
    backgroundColor: '#D16DFD',
    width: 60,
    padding: 4,
    margin: 3,
    marginTop: 13,
    borderRadius: 8,
    alignSelf: 'flex-end'
  },
  postNew:{
    position: 'absolute ',
    top: 500,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 50,
    backgroundColor: '#00ad85',
    alignSelf: 'flex-end',
    zIndex: 1,
  },
  txt_postNew:{
    fontSize: 40,
    paddingBottom: 9
  }

});