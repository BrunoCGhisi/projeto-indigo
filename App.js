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
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { UserProvider } from "./src/contexts/UserContext";

function HomeTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeComp"
        component={Home}
        options={{
          headerTitle: "Home",
          tabBarLabel: "Home",
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerTitle: "Perfil",
          tabBarLabel: "Perfil",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="face-woman" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();
  return (
    <UserProvider>
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
          <Stack.Screen
            name="Postagem"
            component={NewPost}
            options={{
              headerStyle: {
                backgroundColor: "#22123C",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="PostDetails"
            component={PostDetails}
            options={{
              headerStyle: {
                backgroundColor: "#22123C",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="User"
            component={User}
            options={{
              headerStyle: {
                backgroundColor: "#22123C",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="Header"
            component={Header}
            options={{
              headerStyle: {
                backgroundColor: "#22123C",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              headerStyle: {
                backgroundColor: "#22123C",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="LoginEdit"
            component={LoginEdit}
            options={{
              headerStyle: {
                backgroundColor: "#22123C",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitle: "Editar Perfil"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
