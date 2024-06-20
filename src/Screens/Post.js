import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {database, doc, auth } from "../config/firebaseconfig";
import {collection, addDoc } from "firebase/firestore";

export default function Post({navigation}){

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    const addTask = async () => {
        try {
          const user = auth.currentUser; // Obtém o usuário atualmente autenticado
          if (!user) {
            throw new Error('No user is authenticated');
          }
          const tasksCollection = collection(database, "Posts");
          await addDoc(tasksCollection, {
            title: title,
            description: false,
            userId: user.uid, // Inclui o ID do usuário
          });
          navigation.navigate('Home');
        } catch (error) {
          console.error("Error adding task: ", error);
        }
      };
    return(
        <View style={styles.container}>
            <Text style={styles.txtTitle}> Novo Post </Text>
            <TextInput
                style={styles.input}
                placeholder="Título"
                onChangeText={setTitle}
                value={title}
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                onChangeText={setDescription}
                value={description}
            />
            <TouchableOpacity 
            style={styles.btnsave}
            onPress={()=> {addTask()}}>
                <Text style={styles.txtbtnsave}> Salvar </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#EFF1ED',
    },
    txtdescription: {
        width: '90%',
        marginTop: 100,
        marginLeft: 20,
        fontSize: 16,
        color: '#373D20'
    },
    input:{
        width: '90%',
        marginTop: 10,
        padding: 10, 
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#373D20',
        margin: 'auto'
    },
    btnsave:{
        width: '60%',
        backgroundColor: '#373D20',
        justifyContent: 'center',
        alignItems:'center',
        position:'absolute',
        height: 50,
        bottom: '5%',
        left: '20%',
        borderRadius: 20,
    },
    txtbtnsave:{
        color: '#EFF1ED',
        fontSize: 25,
        fontWeight: 'bold',
    }
})