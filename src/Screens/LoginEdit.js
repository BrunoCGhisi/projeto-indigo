import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { auth } from "../config/firebaseconfig";
import { updateProfile } from "firebase/auth";
import { UserContext } from "../contexts/UserContext";

export default function LoginEdit({ navigation }) {
  const [displayName, setDisplayName] = useState("");
  const { setRefreshUser } = useContext(UserContext);
  const user = auth.currentUser;

  useEffect(() => {
    setDisplayName(user?.displayName || "");
  }, [user]);

  const handleUpdate = async () => {
    try {
      // Atualizar o nome de exibição do perfil
      if (displayName && displayName !== user.displayName) {
        await updateProfile(user, { displayName });
        setRefreshUser((prev) => !prev);
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>Home</Text>
      </TouchableOpacity>
      <Text>LoginEdit</Text>
      <Text style={styles.profileText}>
        Perfil {user?.displayName || "Usuário"}
      </Text>

      <TextInput
        style={styles.titleInput}
        placeholder="Nome de usuário"
        onChangeText={setDisplayName}
        value={displayName}
      />
      <TouchableOpacity style={styles.btnsave} onPress={handleUpdate}>
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
  profileText: {
    marginTop: 70,
    marginBottom: 20,
    fontSize: 16,
    color: "#373D20",
  },
  titleInput: {
    width: "90%",
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#373D20",
  },
  btnsave: {
    width: "60%",
    backgroundColor: "#373D20",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: 50,
    bottom: "15%",
    borderRadius: 20,
  },
  txtbtnsave: {
    color: "#EFF1ED",
    fontSize: 25,
    fontWeight: "bold",
  },
});
