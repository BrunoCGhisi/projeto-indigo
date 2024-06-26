import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { auth, storage } from "../config/firebaseconfig";
import { updateProfile } from "firebase/auth";
import { UserContext } from "../contexts/UserContext";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export default function LoginEdit({ navigation }) {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState("");
  const { setRefreshUser } = useContext(UserContext);
  const [image, setImage] = useState(user.photoURL);
  const [modalVisible, setModalVisible] = useState(false);

  console.log(user.photoURL);

  useEffect(() => {
    setDisplayName(user?.displayName || "");
  }, [user]);

  const handleUpdate = async () => {
    try {
      // Atualizar o nome de exibição do perfil
      if (displayName) {
        if (displayName !== user.displayName) {
          await updateProfile(user, { displayName });
        }
        if (image) {
          await uploadImageToFirebase(image);
        } else {
          if (user.photoURL) {
            await deleteImageFromFirebase();
          }
        }
        setRefreshUser((prev) => !prev);
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", error.message);
    }
  };

  const uploadImageToFirebase = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      await updateProfile(user, { photoURL: downloadURL });
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao atualizar a imagem de perfil.");
    }
  };

  const deleteImageFromFirebase = async () => {
    try {
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      await deleteObject(storageRef);
      // Update the user profile to remove the photoURL
      await updateProfile(user, { photoURL: "" });
      await user.reload();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao deletar a imagem de perfil.");
    }
  };

  const uploadImage = async (mode) => {
    let result = {};

    try {
      if (mode === "camera") {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploading image: " + error.message);
      setModalVisible(false);
    }
  };

  const saveImage = async (image) => {
    try {
      console.log(image);
      setImage(image);
    } catch (error) {
      alert("Error saving image: " + error.message);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.editTitle}>LoginEdit</Text>
      <Text style={styles.profileText}>Seu Perfil</Text>

      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={{
          backgroundColor: "white",
          borderRadius: 500,
          overflow: "hidden",
        }}
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={
            image ? { uri: image } : require("../../assets/placeholderpfp.jpg")
          }
        />
      </Pressable>

      <TextInput
        style={styles.titleInput}
        placeholder="Nome de usuário"
        onChangeText={setDisplayName}
        value={displayName}
      />
      <TouchableOpacity style={styles.btnsave} onPress={handleUpdate}>
        <Text style={styles.txtbtnsave}>Salvar</Text>
      </TouchableOpacity>

      <Modal
        onDismiss={() => setModalVisible(false)}
        on
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        style={styles.centeredView}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Imagem de Perfil</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => uploadImage("camera")}
            >
              <Feather name="camera" size={24} color="black" />
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => uploadImage("gallery")}
            >
              <Feather name="image" size={24} color="black" />
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setImage(null);
                setModalVisible(false);
              }}
            >
              <FontAwesome name="trash-o" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginHorizontal: 20,
    marginVertical: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    aspectRatio: 1,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#D16DFD",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
