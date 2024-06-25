import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { auth, database, functions } from "../config/firebaseconfig";
import deletePost from "../services/posts/deletePost";
import { httpsCallable } from "firebase/functions";

import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image
} from "react-native";

import { UserContext } from "../contexts/UserContext";
import { ScrollView } from "react-native-gesture-handler";

export default function UserProfile({ route, navigation }) {
  const [posts, setPosts] = useState({
    post: {
      id: "",
      title: "",
      description: "",
      userId: "",
    },
  });
  const { refreshUser } = useContext(UserContext);

  const currentUser = auth.currentUser;

  let user;
  if (route.params?.user) {
    user = route.params.user;
  } else {
    user = currentUser;
  }

  const signOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

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
        const filteredPosts = resolvedList.filter(
          (item) => item.post.userId === user.uid
        );
        setPosts(filteredPosts);
        console.log(filteredPosts);
      } catch (error) {
        console.error(error);
      }
    });

    return () => unsubscribe();
  }, [refreshUser]);

  return (
    <View style={styles.container}>
      <View style={{width:385, height:130, backgroundColor:'gray'}}></View>
      <Image source={require('../../assets/placeholderpfp.jpg')} style={styles.profilePicture}/>
      <View style={styles.container1}>
        <Text style={styles.username}>
          Perfil {user.displayName}
        </Text>
      </View>

      {user.uid === currentUser.uid && (
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginEdit", { user: user })}
        >
          <Text style={{fontSize:16, fontWeight:'bold'}}> Editar Perfil </Text>
        </TouchableOpacity>
      )}
      <ScrollView style={styles.container2}>
      <FlatList
        data={posts}
        style={{ padding: 20 }}
        renderItem={({ item }) => (
          <>
            {user.uid === item?.post.userId && (
              <TouchableOpacity
                style={{ borderWidth: 5, borderRadius: 15, borderColor: "black", marginBottom: 5,}}
                onPress={() =>
                  navigation.navigate("PostDetails", {
                    post: item.post,
                    user: {
                      userId: user.uid,
                    },
                  })
                }
              >
                <View style={{paddingLeft:10}}>
                  <Text style={{fontSize:20, fontWeight:'bold'}}>{item?.post.title}</Text>
                  <Text>{item?.post.description}</Text>
                  <Text style={{color:'gray', paddingTop:20}}>{item?.user.displayName}</Text>
                  <Text style={{color:'gray', paddingBottom:5,}}>{item?.user.email}</Text>
                </View>
                {user.uid === currentUser.uid && (
                <TouchableOpacity style={{paddingLeft:10, paddingTop:5}} onPress={() => deletePost(item?.post.id)}>
                <Text style={{color:'red', fontWeight:'bold'}}>Deletar</Text>
                </TouchableOpacity>
                )}
              </TouchableOpacity>
            )}
          </>
        )}
        keyExtractor={(item) => item?.post.id}
      />
      {user.uid === currentUser.uid && (
        <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={() => signOut()}>
          <Text style={{fontSize:16, fontWeight:'bold'}}>SingOut</Text>
        </TouchableOpacity>
      )}
      </ScrollView>
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
  profilePicture: {
    position: 'absolute',
    top: 100,
    width: 120,
    height: 120,
    borderRadius: 100,
    zIndex: 1
  },
  container1: {
    width: 370,
    height: 110,
    elevation: 5,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor:'#d9d9d9',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  container2: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    width: 370,
    height: 410,
    elevation: 5,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor:'#d9d9d9',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  username: {
    fontSize: 26,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 40,
    color: "black",
  },
});

//Tela do próprio usuario
//Informações necessárias
//Nome do usuario em destaque
//Descrição do usuario em destaque?
//Botão abrir editar Login
//Listas dos posts do Usuário em questão
