import {
  View,
  StyleSheet,
  Image,
} from "react-native";




export default function Header() {
  
  return (
    <View style={styles.container}>
        <Image source={require('./logos/indigo1.png')} style={styles.logo}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22123C',
    width: '100%',
    height: '20%',
  },
  logo: {
    margin: 10,
    padding: 10,
    width: 60,
    height:60,
  }
});
