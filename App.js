import * as React from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { Provider, useSelector } from "react-redux";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import "react-native-gesture-handler";
import { Account, Favorites, Home, Login, Profile, Search } from "Screens";
import { store } from "redux/store";
import { SearchProvider } from "services";

const Tab = createMaterialBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();
const Stack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profiles"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Account" component={Account} />
    </ProfileStack.Navigator>
  );
}

function FavoritesStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Homes"
        component={Home}
        options={{
          title: "Paradise View",
          headerStyle: {
            backgroundColor: "#7C6A46",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          headerTintColor: "#fff",
          headerBackAccessibilityLabel: "Back",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
function SearchStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Searchs"
        component={Search}
        options={{
          title: "Search",
          headerStyle: {
            backgroundColor: "#7C6A46",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          headerTintColor: "#fff",
          headerBackAccessibilityLabel: "Back",
          headerTitleAlign: "center",
        }}
      />
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
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <>
      <Tab.Navigator
        initialRouteName="Feed"
        barStyle={{
          backgroundColor: "#fff",
          borderTopColor: "#8C7D5D",
          borderTopWidth: 1,
        }}
        activeColor="#8C7D5D"
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={({ route, navigation }) => ({
            tabBarLabel: navigation.getState().index === 0 ? route.name : null,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          })}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackScreen}
          options={({ route, navigation }) => ({
            tabBarLabel: navigation.getState().index === 1 ? route.name : null,
            tabBarIcon: ({ color }) => (
              <Ionicons name="search" color={color} size={26} />
            ),
          })}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesStackScreen}
          options={({ route, navigation }) => ({
            tabBarLabel: navigation.getState().index === 2 ? route.name : null,
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart" color={color} size={26} />
            ),
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={({ route, navigation }) => ({
            tabBarLabel: navigation.getState().index === 3 ? route.name : null,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          })}
        />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SearchProvider>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </SearchProvider>
    </Provider>
  );
}
