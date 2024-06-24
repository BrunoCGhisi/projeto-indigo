import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";
import Home from "./src/screens/Home";
import User from "./src/screens/User";
import UserProfile from "./src/screens/UserProfile";
import NewPost from "./src/screens/NewPost";
import PostDetails from "./src/screens/PostDetails";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPost"
          component={NewPost}
        />
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
        />
        <Stack.Screen
          name="User"
          component={User}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
