import { useEffect, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import view from "../../assets/view.jpg";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { useSearch } from "../../services/context";
import { Slider } from "../../Components/organism/Slider";
import { getTodayDate } from "../../utils/Date";
export const Home = () => {
  const navigation = useNavigation();

  console.log(getTodayDate());
  const onSubmitSearch = () => {
    navigation.navigate("Search", { searching: search });
  };
  const { search, setSearch } = useSearch();
  const locationTop = [
    {
      id: -2679652,
      title: "Jakarta",
      image: require("../../assets/jakarta.jpg"),
    },
    {
      id: -2671578,
      title: "Bandung",
      image: require("../../assets/bandung.jpg"),
    },
    {
      id: -2687472,
      title: "Medan",
      image: require("../../assets/medan.jpg"),
    },
    {
      id: -2698521,
      title: "Surabaya",
      image: require("../../assets/surabaya.jpg"),
    },
  ];

  const locationPop = [
    {
      id: -2701757,
      title: "Bali",
      image: require("../../assets/bali.jpg"),
    },
    {
      id: -2685677,
      title: "Lombok",
      image: require("../../assets/lombok.jpg"),
    },
    {
      id: 7435,
      title: "Raja Ampat",
      image: require("../../assets/rajampat.jpg"),
    },
    {
      id: 15519,
      title: "Wakatobi",
      image: require("../../assets/wakatobi.jpg"),
    },
  ];
  const onChangeSearch = (query) => setSearch(query);
  return (
    <ScrollView className="flex-1 bg-white gap-y-9">
      <View className="flex-1 w-screen max-h-screen min-h-[96vh] justify-center   ">
        <Searchbar
          className="bg-slate-200  w-[90%] self-center mt-2 mb-4 "
          placeholder="Cari Kota"
          value={search}
          onChangeText={onChangeSearch}
          onSubmitEditing={onSubmitSearch}
        />
        <View className="items-center">
          <Image
            source={require("../../assets/view.jpg")}
            className="w-[95%] h-[200px] rounded-md relative"
          />
          <View className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
            <Text style={styles.textInImageHead}>A Hotel for every</Text>
            <Text style={styles.textInImageChild}>moment rich in emotion.</Text>
            <TouchableOpacity style={styles.buttonInImage}>
              <Text style={styles.textInButton}>Book now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text className="px-3 pt-4 text-lg font-semibold text-primary ">
            TOP DESTINATIONS
          </Text>
          {/* <FlatList
            data={locationTop}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.cardContainer}>
                <Image source={item.photo} style={styles.cardImage} />
                <View style={styles.textInCardContainer}>
                  <Text style={styles.textInCard}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(items) => items}
            horizontal
          /> */}
          <Slider list={locationPop} />
        </View>
        <View>
          <Text className="px-3 pt-4 text-lg  font-semibold text-primary ">
            POPULAR DESTINATIONS
          </Text>
          {/* <FlatList
            data={locationPop}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.cardContainer}>
                <Image source={item.photo} style={styles.cardImage} />
                <View style={styles.textInCardContainer}>
                  <Text style={styles.textInCard}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(items) => items}
            horizontal
          /> */}
          <Slider list={locationTop} />
        </View>
      </View>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    position: "relative",
    display: "inline-block",
  },
  image: {
    width: 350,
    height: 150,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
  },
  imageText: {
    position: "absolute",
    top: 20,
    left: 90,

    padding: 10 /* Atur padding teks */,
    borderRadius: 5 /* Bulatkan sudut teks jika diinginkan */,
  },
  buttonInImage: {
    backgroundColor: "#FFFFFF",
    width: 90,
    height: 30,
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
  },
  textInButton: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    color: "#7C6A46",
    fontWeight: "600",
  },
  textInImageHead: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: "auto",
    marginRight: "auto",
  },
  textInImageChild: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  title: {
    color: "#8C7D5D",
    fontSize: 20,
    fontWeight: "600",
    marginVertical: "5px",
    marginLeft: "15px",
  },
  cardImage: {
    height: "300px",
    width: "140px",
    objectFit: "contain",
    borderRadius: 5,
  },
  textInCardContainer: {
    position: "absolute",
    top: 275,
    left: 10,
  },
  textInCard: {
    color: "#FFFFFF",
  },
  cardContainer: {
    marginLeft: 20,
  },
});
