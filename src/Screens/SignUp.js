import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform,TouchableOpacity } from 'react-native';
import { auth } from '../config/firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp ({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const SingUpUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
      Alert.alert('conta criada');
      navigation.navigate('SignIn'); 
    } catch (error) {
      //console.error('Error signing up:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding": "height"}
    style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    <TouchableOpacity style={styles.btnLogin} onPress={SingUpUser}>
        <Text style={styles.txtbtnLogin}>Criar</Text>
    </TouchableOpacity> 

    <Text 
      style={styles.txtNewuser}
      onPress={() => navigation.navigate('SignIn')}>
        Já possui uma conta? Logar
        </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      title: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
        color: '#373D20'
      },
      input: {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 10,
        borderRadius:10,
        paddingHorizontal: 10,
        borderColor: '#373D20'
      },
      btnLogin:{
        backgroundColor:  '#373D20',
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        width: '50%',
    
      },
      txtbtnLogin:{
        color: '#EFF1ED',
        fontSize: 16,
        fontWeight: 'bold',
      },
      txtLogin:{
        color: '#373D20',
        fontSize: 20,
        padding:10,
        marginTop: 10,
    
      }
});

