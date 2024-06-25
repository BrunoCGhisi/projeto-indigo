import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";
import Home from "./src/screens/Home";
import User from "./src/screens/User";
import UserProfile from "./src/screens/UserProfile";
import NewPost from "./src/screens/NewPost";
import PostDetails from "./src/screens/PostDetails";
import LoginEdit from "./src/screens/LoginEdit";
import Header from "./src/components/Header";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function HomeTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeComp"
        component={Home}
        options={{ headerTitle: "Home", tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerTitle: "Profile",
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}

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
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Postagem" component={NewPost} />
        <Stack.Screen name="PostDetails" component={PostDetails} />
        <Stack.Screen name="User" component={User} />

        <Stack.Screen name="Header" component={Header} />

        <Stack.Screen name="UserProfile" component={UserProfile} />

        <Stack.Screen name="LoginEdit" component={LoginEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
