import { useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/auth/authSlice";

export const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    setError(null);
    if (username === auth.username && password === auth.password) {
      dispatch(login());
      navigation.navigate("Profile");
      return;
    }
    setError("Username or password is incorrect");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <Image
          source={require("../../../assets/logo.png")}
          style={{ width: 140, height: 80, alignSelf: "center" }}
        />
        <TextInput
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          activeUnderlineColor="#7C6A46"
          style={{ backgroundColor: "transparent" }}
        />
        <TextInput
          secureTextEntry={!showPassword}
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          activeUnderlineColor="#7C6A46"
          outlineColor="#7C6A46"
          style={{ backgroundColor: "transparent" }}
          right={
            <TextInput.Icon
              icon={!showPassword ? "eye-off" : "eye"}
              onPress={showPasswordHandler}
            />
          }
        />
        <Text style={{ color: "red" }}>{error}</Text>
        <Button mode="contained" buttonColor="#7C6A46" onPress={handleLogin}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};
