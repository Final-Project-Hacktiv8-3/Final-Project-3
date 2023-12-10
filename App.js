import * as React from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Home } from "./Screens/Home";
import { Search } from "./Screens/Search";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { Profile } from "./Screens/Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./Screens/Profile/Login";
import { Account } from "./Screens/Profile/Account";
// import { WishList } from "./Screens/WishList";
import { SearchProvider } from "./services/context";

const Tab = createMaterialBottomTabNavigator();
const ProfileStack = createNativeStackNavigator();

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
      <ProfileStack.Screen name="Login" component={Login} />
      <ProfileStack.Screen name="Account" component={Account} />
    </ProfileStack.Navigator>
  );
}

function MyTabs() {
  const { isAuth } = useSelector((state) => state.auth);
  return (
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
        component={Home}
        options={({ route, navigation }) => ({
          tabBarLabel: navigation.getState().index === 0 ? route.name : null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        })}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={({ route, navigation }) => ({
          tabBarLabel: navigation.getState().index === 1 ? route.name : null,
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" color={color} size={26} />
          ),
        })}
      />
      {/* {isAuth && (
        <Tab.Screen
          name="Wish List"
          component={WishList}
          options={({ route, navigation }) => ({
            tabBarLabel: navigation.getState().index === 2 ? route.name : null,
            tabBarIcon: ({ color }) => (
              <AntDesign name="heart" color={color} size={26} />
            ),
          })}
        />
      )} */}
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
