import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { database, auth } from "../config/firebaseconfig";
import { updateDoc, doc } from "firebase/firestore";

export default function LoginEdit({ route, navigation }) {
  const user = route.params?.user;

  if (!user) {
    console.error("Usuário não definido");
    return (
      <View style={styles.container}>
        <Text>Erro: Usuário não definido</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentUser = auth.currentUser;

  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState(user.password || "");

  const updatePost = async () => {
    if (!user.userId) {
      console.error("userId não está definido");
      return;
    }

    try {
      const userDocRef = doc(database, "Users", user.userId);
      await updateDoc(userDocRef, {
        displayName: displayName,
        email: email,
        password: password,
      });
    } catch (error) {
      console.error("Deu erro no usuário: ", error);
    }
  };

  return (
    <View style={styles.container}>
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
        placeholder="Nome de usuário"
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
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.btnsave}
        disabled={displayName === "" || email === "" || password === ""}
        onPress={updatePost}
      >
        <Text style={styles.txtbtnsave}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF1ED",
    justifyContent: "center",
    alignItems: "center",
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
