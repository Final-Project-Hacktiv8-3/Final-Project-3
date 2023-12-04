import { SafeAreaView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";

export const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { email, username, fullName, isAuth } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return !isAuth ? (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}>
        <View
          style={{
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={{ fontSize: 28, fontWeight: "700" }}>
            You're not logged in.
          </Text>
        </View>
        <Button
          mode="contained"
          buttonColor="#7C6A46"
          icon="login"
          onPress={() => navigation.navigate("Login")}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}>
        <View
          style={{
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={{ fontSize: 28, fontWeight: "700" }}>
            Welcome {fullName}!
          </Text>
        </View>
        <Button
          mode="contained"
          buttonColor="#7C6A46"
          icon="logout"
          onPress={handleLogout}>
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
};
