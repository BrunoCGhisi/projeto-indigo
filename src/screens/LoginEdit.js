import React, { useState, useEffect } from "react";
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

export default function LoginEdit({ navigation }) {
  const [displayName, setDisplayName] = useState("");
  const [refresh, setRefresh] = useState(false); // Estado para forçar o refresh da página
  const user = auth.currentUser;

  useEffect(() => {
    setDisplayName(user?.displayName || "");
  }, [user, refresh]); // Adicione 'refresh' como dependência

  const handleUpdate = async () => {
    try {
      // Atualizar o nome de exibição do perfil
      if (displayName && displayName !== user.displayName) {
        await updateProfile(user, { displayName });
        setRefresh(!refresh); // Altera o estado para forçar o refresh
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        navigation.navigate("Home", { user });
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home", { user })}>
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
