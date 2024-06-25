import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { database, auth } from "../config/firebaseconfig";
import { updateDoc, doc } from "firebase/firestore";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";

export default function LoginEdit({ navigation }) {
  const user = auth.currentUser;

  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    try {
      // Update profile display name
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName });
      }
      // Update email
      if (email !== user.email) {
        await updateEmail(user, email);
      }
      // Update password
      if (password) {
        await updatePassword(user, password);
      }

      
      // const userDocRef = doc(database, "users", user.uid);
      // await updateDoc(userDocRef, {
      //   displayName,
      //   email,
      // });

      Alert.alert("Success", "Profile updated successfully!");
      navigation.navigate("Home", { user });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home", { user })}>
        <Text>Home</Text>
      </TouchableOpacity>
      <Text>LoginEdit</Text>
      <Text style={styles.profileText}>
        Perfil {user.displayName || "Usuário"}
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
      <TouchableOpacity style={styles.btnsave} onPress={handleUpdate}>
        <Text style={styles.txtbtnsave}>Save</Text>
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
  descInput: {
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
    bottom: "5%",
    borderRadius: 20,
  },
  txtbtnsave: {
    color: "#EFF1ED",
    fontSize: 25,
    fontWeight: "bold",
  },
});
