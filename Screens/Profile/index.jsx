import { SafeAreaView, Text, View } from "react-native";
import { Button } from "react-native-paper";

export const Profile = () => {
  return (
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
        <Button mode="contained" buttonColor="#7C6A46" icon="login">
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};
