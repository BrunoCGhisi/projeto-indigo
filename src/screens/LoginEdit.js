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
      <Text style={styles.editTitle}>LoginEdit</Text>
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
    marginTop: 30,
    alignItems: "center",
  },
  editTitle: {
    fontSize: 26,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 10,
    color: "black",
  },
  profileText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20,
    color: "#373D20",
  },
  titleInput: {
    width: "90%",
    marginTop: 30,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#373D20",
  },
  btnsave: {
    width: "30%",
    backgroundColor: "#373D20",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: 50,
    bottom: "15%",
    borderRadius: 10,
  },
  txtbtnsave: {
    color: "#EFF1ED",
    fontSize: 20,
    fontWeight: "bold",
  },
});
