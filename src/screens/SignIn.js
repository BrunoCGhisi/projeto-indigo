import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { auth, onAuthStateChanged } from "../config/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth"; // propriedade firebase
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const SignInUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ); //userCredential vai instanciar com os dados que ele vai receber
      console.log("User logged in:", userCredential.user.displayName);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error logging in:", error);
      //Alert.alert('Error', error.message);
      setError(true);
    }
  };
  useEffect(() => {
    const statusAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home", { user: { uid: user.uid } });
      }
    });

    return statusAuth;
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image source={require("../../logos/indigo3.png")} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"#241447"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={"#241447"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error === true && (
        <View style={styles.alert}>
          <Ionicons name="alert-circle" size={24} color="red" />
          <Text style={styles.txtalert}>email ou senha inválidos</Text>
        </View>
      )}
      {email === "" || password == "" ? (
        <TouchableOpacity style={styles.btnLogin} disabled={true}>
          <Text style={styles.txtbtnLogin}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btnLogin} onPress={SignInUser}>
          <Text style={styles.txtbtnLogin}>Login</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.txtNewUser}>
        Não possui uma conta?
        <Text
          style={styles.txtSignup}
          onPress={() => navigation.navigate("SignUp")}
        >
          {" "}
          Signup
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#d9d9d9",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
    color: "#241447",
  },
  input: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: "#241447",
  },
  alert: {
    flexDirection: "row",
    marginTop: 10,
  },
  txtalert: {
    fontSize: 16,
    color: "red",
  },
  btnLogin: {
    backgroundColor: "#cf6efa",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    width: "50%",
  },
  txtbtnLogin: {
    color: "#EFF1ED",
    fontSize: 16,
    fontWeight: "bold",
  },
  txtNewUser: {
    marginTop: 5,
  },
  txtSignup: {
    color: "#00ad85",
  },
  logo: {
    width: 90,
    height: 90,
  },
});
