import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";

export const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { fullName, isAuth } = useSelector((state) => state.auth);

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
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginTop: 80,
            marginBottom: 60,
          }}>
          <Avatar.Image
            source={{
              uri: "https://api.dicebear.com/7.x/adventurer-neutral/png?eyebrows=variant09",
            }}
            size={140}
            style={{
              marginBottom: 20,
            }}
          />
          <Text style={{ fontSize: 28, fontWeight: "700" }}>{fullName}</Text>
        </View>
        <View style={{ flex: 1, gap: 10 }}>
          <TouchableOpacity>
            {/* TODO: Navigate to edit profile */}
            <Card.Title
              title="Account"
              titleVariant="headlineSmall"
              titleStyle={{ fontWeight: "700", color: "#7C6A46" }}
              subtitle="Manage your account"
              subtitleVariant="bodySmall"
              left={(props) => (
                <IconButton
                  {...props}
                  icon="account"
                  style={{ width: "100%" }}
                  iconColor="#7C6A46"
                  size={45}
                />
              )}
              right={(props) => <IconButton {...props} icon="chevron-right" />}
              style={{
                backgroundColor: "#F5F5F5",
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
        </View>
        <Button
          style={{ marginBottom: 40 }}
          mode="contained"
          buttonColor="#FF0000"
          icon="logout"
          onPress={handleLogout}>
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
};
