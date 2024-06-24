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

export default function LoginEdit(route, navigation) {
  let user;
  if (route.params) {
    user = user.route.params;
  }
  console.log(user);

  const currentUser = auth.currentUser;

  const [displayName, setDisplayName] = useState(user ? user.displayName : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState(user ? user.password : "");

  const updatePost = async () => {
    try {
      const userDocRef = doc(database, "Users", user.userId);
      await updateDoc(userDocRef, {
        ...user,
        displayName: displayName,
        email: email,
        password: password,
      });
    } catch (error) {
      console.error("Deu erro no usuario meu: ", error);
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home", { user: user })}
      >
        <Text>Home</Text>
      </TouchableOpacity>
      <Text>LoginEdit</Text>
      <Text style={{ marginTop: 70, marginBottom: 20 }}>
        Perfil {currentUser ? currentUser.displayName : "Usuário"}
      </Text>

      <TextInput
        style={styles.titleInput}
        placeholder="Nome de usuario"
        onChangeText={setDisplayName}
        value={displayName}
      />
      <TextInput
        style={styles.descInput}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.descInput}
        placeholder="Senha"
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity
        style={styles.btnsave}
        disabled={displayName === "" || email === "" || password === ""}
        onPress={() => {
          updatePost();
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
    backgroundColor: "#EFF1ED",
  },
  txtTitle: {
    width: "90%",
    marginTop: 70,
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 16,
    color: "#373D20",
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
    maxHeight: 200,
    borderBottomWidth: 1,
    borderBottomColor: "#373D20",
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
