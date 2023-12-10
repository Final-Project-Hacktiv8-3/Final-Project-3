import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Home } from "./Screens/Home";
import { Search } from "./Screens/Search";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Profile } from "./Screens/Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from "./Screens/Profile/Login";
import { Account } from "./Screens/Profile/Account";
import { DetailPlace } from "./Screens/Details";
import 'react-native-gesture-handler';

const Tab = createMaterialBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();
const Stack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
}

// function DetailsStackScreen() {
//   return (
//     <Stack.Navigator >
//       <Stack.Screen name="Detail Place" component={DetailPlace}   />
//     </Stack.Navigator>
//   );
// }

function MyTabs() {
  return (
    <>
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: "tomato" }}>
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="google-home"
              color={color}
              size={26} />
          ),
        }} />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" color={color} size={26} />
          ),
        }} />
      <Tab.Screen
        name="ProfileStackScreen"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />

          ),      
        }} />



    </Tab.Navigator>
   
    </>
    
  );
}


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={MyTabs}
        options={{headerShown:false}}
        />
       {/* <Stack.Navigator > */}
        <Stack.Screen name="Details" component={DetailPlace}   />
      {/* </Stack.Navigator> */}
      </Stack.Navigator>
      </NavigationContainer>
     

    </Provider>
    
  );
}
