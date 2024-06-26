import { useRoute } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { formattedPrice } from "utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { addHistory } from "redux/hotel/hotelSlice";

export const Checkout = ({ navigation }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const route = useRoute();
  const { prices, image, title, rating, hotel_id } = route.params;
  const dispatch = useDispatch();

  const { fullName, email } = useSelector((state) => state.auth);

  const handlePay = () => {
    if (isAuth) {
      dispatch(
        addHistory({
          image: image,
          hotel_id: hotel_id,
          title: title,
          price: prices,
          rating: rating,
        })
      );
      navigation.navigate("Home");
    } else {
      alert("You must login first");
      navigation.navigate("Login");
    }
  };

  return (
    <View>
      <View>
        <Text style={styles.title}>CONTACT INFORMATION</Text>
        <TextInput style={styles.input} value={fullName}></TextInput>
        <TextInput style={styles.input} value={email}></TextInput>
      </View>
      <Text style={styles.title}>PRICE SUMMARY</Text>
      <View style={styles.priceSect}>
        <View style={styles.inTab}>
          <Text>Total:</Text>
          <Text style={styles.price}>Rp.{formattedPrice(prices)}</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "black",
            width: "100%",
            alignSelf: "center",
          }}
        />
        <View style={styles.inTab}>
          <Text>Payable Now:</Text>
          <Text style={styles.price}>Rp.{formattedPrice(prices)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handlePay()}>
        <Text style={styles.textInButton}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,

    width: 350,
    margin: 12,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  title: {
    color: "#7C6A46",
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
  },
  priceSect: {
    backgroundColor: "#FFFFFF",
    width: 350,
    height: 120,
    margin: 12,
    borderRadius: 10,
  },
  price: {
    marginLeft: "auto",
    fontWeight: "600",
  },
  inTab: {
    flexDirection: "row",
    marginTop: 20,
    margin: 15,
  },
  button: {
    width: 358,
    height: 55,
    backgroundColor: "#7C6A46",
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 25,
  },

  textInButton: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    color: "#FFFFFF",
  },
});
