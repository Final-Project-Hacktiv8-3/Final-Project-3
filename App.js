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
import {
  Account,
  DetailPlace,
  Favorites,
  Home,
  Login,
  Profile,
  Search,
  Checkout,
} from "Screens";
import { store } from "redux/store";
import { SearchProvider } from "services";
import { Room } from "Screens/Room";
import { History } from "Screens/Profile/History";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profiles"
        component={Profile}
        options={{
          title: "Profile",
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#7C6A46",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#7C6A46",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          title: "Edit Account",
          headerStyle: {
            backgroundColor: "#7C6A46",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          title: "Booking History",
          headerStyle: {
            backgroundColor: "#7C6A46",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

function FavoritesStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: "Favorites",
          headerStyle: {
            backgroundColor: "#7C6A46",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          headerTintColor: "#fff",
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
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Searchs"
        component={Search}
        options={({ route }) => ({
          title: `Hotel di ${route.params.searching}`,
          headerStyle: {
            backgroundColor: "#7C6A46",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        })}
      />
    </Stack.Navigator>
  );
}

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
        activeColor="#8C7D5D">
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
          name="Favorite"
          component={FavoritesStackScreen}
          options={({ route, navigation }) => ({
            tabBarLabel: navigation.getState().index === 1 ? route.name : null,
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart" color={color} size={26} />
            ),
          })}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={({ route, navigation }) => ({
            tabBarLabel: navigation.getState().index === 2 ? route.name : null,
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
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={MyTabs}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Details"
              component={DetailPlace}
              options={({ route }) => ({
                title: `Hotel di ${route.params.title}`,
                headerStyle: {
                  backgroundColor: "#7C6A46",
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                },
                headerTintColor: "#fff",
                headerTitleAlign: "center",
              })}
            />
            <Stack.Screen
              name="Room"
              component={Room}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{
                title: "Checkout",
                headerStyle: {
                  backgroundColor: "#7C6A46",
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                },
                headerTintColor: "#fff",
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SearchProvider>
    </Provider>
  );
}
