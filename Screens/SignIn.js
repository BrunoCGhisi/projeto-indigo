import { View, Text } from "react-native"

// logar
export default function SignIn(){

    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const LoginUser = async () => { //logando de fato, mandando os paranaue pro banco
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, user, password);
          console.log('Usuário logado em:', userCredential.user);
          navigation.navigate('Home', { idUser: userCredential.user.uid }); 
    
        } catch (error) {
          console.error('Erro ao logar:', error);
          //Alert.alert('Error', error.message);
          setError(true)
        }
      };

      useEffect(() => {
        const statusAuth = onAuthStateChanged(auth, (user) => { // se eu muda de usuario muda a task
          if (user) {
            navigation.navigate("UserProfile", { idUser: user.uid });
          }
        });
    
        return () => statusAuth();
    
      },[])

    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding": "height"}
            style={styles.container}>
                
        <Text style={styles.title}>Login</Text>

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
          placeholder="User"
          value={user}
          onChangeText={setUser}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        </KeyboardAvoidingView>
    )

}

export default function Login ({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const LoginUser = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
        navigation.navigate('Task', { idUser: userCredential.user.uid }); 
  
      } catch (error) {
        console.error('Error logging in:', error);
        //Alert.alert('Error', error.message);
        setError(true)
      }
    };

    useEffect(() => {
      const statusAuth = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.navigate("Task", { idUser: user.uid });
        }
      });
  
      return () => statusAuth();
  
    },[])
  
    return (
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding": "height"}
      style={styles.container}>
        <Text style={styles.title}>Login</Text>
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
  
      {error === true
          ?
      <View style={styles.alert}>
          <Ionicons name="alert-circle" size={24} color="red" />
          <Text style={styles.txtalert}>email ou senha inválidos</Text>
      </View>
          :
      <View/>
      }
      {email === '' || password == ''
      ?
      <TouchableOpacity style={styles.btnLogin} disabled={true}>
          <Text style={styles.txtbtnLogin}>Login</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity style={styles.btnLogin} onPress={LoginUser}>
          <Text style={styles.txtbtnLogin}>Login</Text>
      </TouchableOpacity> 
      }
  
        <Text 
        style={styles.txtNewuser}
        onPress={() => navigation.navigate('NewUser')}>
          Não possui uma conta? criar
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
    alert:{
      flexDirection: 'row',
      marginTop: 10,
      
      
    },
    txtalert:{
      fontSize: 16,
      color: 'red'
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
    txtNewuser:{
      color: '#373D20',
      fontSize: 20,
      padding:10,
      marginTop: 10,
  
    }
  
  });