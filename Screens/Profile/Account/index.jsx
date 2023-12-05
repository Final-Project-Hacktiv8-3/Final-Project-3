import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Avatar, Button, Snackbar, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../../redux/auth/authSlice";

export const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const { fullName, email, username, password } = useSelector(
    (state) => state.auth
  );

  // Input
  const [newFullName, setNewFullName] = useState(fullName);
  const [newEmail, setNewEmail] = useState(email);
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState(password);

  // Error input
  const [errorFullName, setErrorFullName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  // Snackbar
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible((prev) => !prev);
  const onDismissSnackBar = () => setVisible(false);

  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const emailValidator = (input) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(input);
  };

  const handleSave = () => {
    setErrorFullName(false);
    setErrorEmail(false);
    setErrorUsername(false);
    setErrorPassword(false);

    if (newFullName === "") {
      setErrorFullName(true);
      return;
    }
    if (newEmail === "" || !emailValidator(newEmail)) {
      setErrorEmail(true);
      return;
    }
    if (newUsername === "") {
      setErrorUsername(true);
      return;
    }
    if (newPassword === "") {
      setErrorPassword(true);
      return;
    }

    dispatch(
      editProfile({
        fullName: newFullName,
        email: newEmail,
        username: newUsername,
        password: newPassword,
      })
    );
    onToggleSnackBar();
    setTimeout(() => {
      navigation.pop();
    }, 1000);
  };

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
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginBottom: 40,
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
        <TextInput
          label="Full Name"
          value={newFullName}
          onChangeText={(text) => {
            setNewFullName(text);
          }}
          activeUnderlineColor="#7C6A46"
          style={{ backgroundColor: "transparent" }}
        />
        {errorFullName && (
          <Text style={{ color: "red" }}>Full name cannot be empty</Text>
        )}
        <View style={{ gap: 5 }}>
          <TextInput
            label="Username"
            value={newUsername}
            onChangeText={(text) => {
              setNewUsername(text);
            }}
            activeUnderlineColor="#7C6A46"
            style={{ backgroundColor: "transparent" }}
          />
          {errorUsername && (
            <Text style={{ color: "red" }}>Username cannot be empty</Text>
          )}
          <TextInput
            label="Email"
            value={newEmail}
            onChangeText={(text) => {
              setNewEmail(text);
            }}
            activeUnderlineColor="#7C6A46"
            style={{ backgroundColor: "transparent" }}
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          {errorEmail && (
            <Text style={{ color: "red" }}>
              Email cannot be empty & use valid email
            </Text>
          )}
          <TextInput
            secureTextEntry={!showPassword}
            label="Password"
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
            }}
            activeUnderlineColor="#7C6A46"
            style={{ backgroundColor: "transparent" }}
            right={
              <TextInput.Icon
                icon={!showPassword ? "eye-off" : "eye"}
                onPress={showPasswordHandler}
              />
            }
          />
          {errorPassword && (
            <Text style={{ color: "red" }}>Password cannot be empty</Text>
          )}
        </View>
        <Button
          mode="contained"
          buttonColor="#7C6A46"
          style={{ marginTop: 30 }}
          onPress={handleSave}>
          Update
        </Button>

        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={2000}
          elevation={1}
          style={{ backgroundColor: "#008000" }}>
          Account updated successfully!
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};
