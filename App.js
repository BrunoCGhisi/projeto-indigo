import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './src/Screens/SignUp';
import SignIn from './src/Screens/SignIn';
import Home from './src/Screens/Home';
import User from './src/Screens/User';
import UserProfile from './src/Screens/UserProfile';
import Post from './src/Screens/Post';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn' >
        <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: false}} />
        <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: false}} />
        <Stack.Screen name="Post" component={Post} options={{headerShown: false}} />
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
        
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
        <Stack.Screen name="User" component={User} options={{headerShown: false}} />
        <Stack.Screen name="UserProfile" component={UserProfile} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
