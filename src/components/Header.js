import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { auth } from "../config/firebaseconfig";



export default function Header({navigation}) {  
  const user = auth.currentUser
  
  return (
    <View style={styles.container}>        
      <Image source={require('../../logos/indigo1.png')} style={styles.logo}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#22123C',
    width: '100%',
    height: '12%',
    flexDirection: 'row',
  },
  logo: {
    margin: 10,
    padding: 10,
    width: 60,
    height:60,
  }
});
