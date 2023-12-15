import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Button,
  StatusBar,
  Pressable,
} from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../services/axios";
import { useRoute } from "@react-navigation/native";
import StarRating from "Components/molecules/Rating";
import { getTodayDate, getTomorrowDate } from "utils";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "redux/hotel/hotelSlice";
import { ActivityIndicator, ProgressBar } from "react-native-paper";
const screenWidth = Dimensions.get("window").width;

export const Room = ({ navigation }) => {
  const route = useRoute();
  const { hotel_id, star, hotel_name, price, image } = route.params;
  // console.log(hotel_id, star, hotel_name, price, image);
  const [love, setLove] = useState(false);
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const [photos, setPhotos] = useState();

  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/properties/v2/get-rooms", {
          params: {
            rec_guest_qty: 1,
            rec_room_qty: 1,
            arrival_date: getTodayDate(),
            departure_date: getTomorrowDate(),
            hotel_id: hotel_id,
          },
        });

        // Assuming response.data is an array, update the state
        if (Array.isArray(response?.data)) {
          setDatas(response.data);
        } else {
          console.error("Data is not an array:", response?.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  let matchId = {};
  datas?.some((infoHotel) => {
    matchId =
      infoHotel?.rooms[hotel_id + "01"] ||
      infoHotel?.rooms[hotel_id + "02"] ||
      infoHotel?.rooms[hotel_id + "03"] ||
      infoHotel?.rooms[hotel_id + "04"] ||
      infoHotel?.rooms[hotel_id + "05"];
    return matchId; // Stop iteration if matchId is found
  });
  const handleLove = () => {
    setLove((prevLove) => !prevLove);
  };

  const renderLoveIcon = () => {
    if (love) {
      return (
        <TouchableOpacity style={styles.loveRound} onPress={() => handleLove()}>
          <Image
            source={require("../../assets/heart-fill.png")}
            style={styles.love}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.loveRound} onPress={() => handleLove()}>
          <Image
            source={require("../../assets/heart-empty.png")}
            style={styles.love}
          />
        </TouchableOpacity>
      );
    }
  };

  const renderFacility = (facilty) => {
    switch (facilty) {
      case "Accessibility":
        return (
          <TouchableOpacity style={styles.imageIconBg}>
            <Image
              source={require("../../assets/accessibility.png")}
              style={styles.imageIcon}
            />
            <Text style={styles.textIcon}>Accessibility</Text>
          </TouchableOpacity>
        );
        break;
      case "Bathroom":
        return (
          <TouchableOpacity style={styles.imageIconBg}>
            <Image
              source={require("../../assets/bath.png")}
              style={styles.imageIcon}
            />
            <Text style={styles.textIcon}>Bathroom</Text>
          </TouchableOpacity>
        );
        break;
      case "Media & Technology":
        return (
          <TouchableOpacity style={styles.imageIconBg}>
            <Image
              source={require("../../assets/television.png")}
              style={styles.imageIcon}
            />

            <Text style={styles.textIcon}>Media & Technology</Text>
          </TouchableOpacity>
        );
        break;
      default:
        return (
          <TouchableOpacity style={styles.imageIconBg}>
            <Image
              source={require("../../assets/accessibility.png")}
              style={styles.imageIcon}
            />
            <Text style={styles.textIcon}>{facilty}</Text>
          </TouchableOpacity>
        );
    }
  };

  // console.log(matchId);
  const dispatch = useDispatch();
  const favoritedHotel = useSelector((state) => state.hotel.favorites);

  const isFavorited = (title) => {
    return favoritedHotel.some((hotel) => hotel.title === hotel_name);
  };

  const handleFavorite = () => {
    dispatch(
      addToFavorites({
        image: image,
        title: hotel_name,
        price: price,
        rating: star,
      })
    );
  };
  const handleBooking = () => {
    if (isAuth) {
      navigation.navigate("Checkout", {
        image: image,
        title: hotel_name,
        prices: price,
        rating: star,
      });
    } else {
      alert("You must login first");
      navigation.navigate("Login");
    }
  };

  return (
    <>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator
            animating={true}
            size={"large"}
            color={"#7C6A46"}
          />
        </View>
      ) : (
        <ScrollView>
          <View>
            <FlatList
              data={matchId?.photos}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.url_original }}
                  style={styles.image}
                  className="relative"
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <View className="self-center py-4 absolute flex flex-row justify-between w-full px-4 ">
              <TouchableOpacity
                // style={styles.arrowRound}
                className="p-2 bg-white rounded-full"
                onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>

              <Pressable
                className="p-3 bg-white rounded-full"
                onPress={handleFavorite}>
                {isFavorited(hotel_name) ? (
                  <AntDesign name="heart" size={18} color="red" />
                ) : (
                  <AntDesign name="hearto" size={18} color="black" />
                )}
              </Pressable>
            </View>
            <View className="p-4 absolute top-64 w-full px-4 gap-y-1">
              <View className="flex flex-row justify-between">
                <View>
                  <Text className="text-xl text-white font-bold">
                    {hotel_name}
                  </Text>
                </View>
                <View>
                  <StarRating rating={star} />
                </View>
              </View>

              <View style={styles.facilities}>
                {matchId?.facilities
                  ?.slice(1, 4)
                  ?.map((facilty) =>
                    renderFacility(facilty.alt_facilitytype_name)
                  )}
              </View>
            </View>
            <View style={styles.roomDesc}>
              <Text style={styles.title}>Room Description</Text>
              <Text style={styles.textDesc}>{matchId?.description}</Text>

              <FlatList
                data={matchId?.photos}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.url_original }}
                    style={styles.imageDetail}
                  />
                )}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleBooking}>
              <Text style={styles.textInButton}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 400,
    width: screenWidth,
    position: "relative",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#353840",
    marginTop: 50,
  },
  textDesc: {
    fontSize: 17,
    marginTop: 10,
  },
  star: {
    marginLeft: "auto",
    marginTop: -40,
  },
  imageDetail: {
    width: 130,
    height: 130,
    marginVertical: 20,
    borderRadius: 20,
    marginRight: 20,
  },

  textInCardContainer: {
    position: "absolute",
    top: 290,
    width: "80%",
  },
  roomName: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 15,
  },
  facilities: {
    flex: 1,
    flexDirection: "row",
  },

  roomInfo: {
    flex: 1,
    flexDirection: "column",
  },
  roomDesc: {
    marginLeft: 20,
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
  icon: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    zIndex: 1,
  },
  arrow: {
    width: 30,
    height: 30,
  },
  love: {
    width: 30,
    height: 30,
  },

  arrowRound: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  loveRound: {
    marginLeft: "auto",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    marginLeft: 315,
  },
  imageIcon: {
    height: 40,
    width: 40,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  imageIconBg: {
    marginLeft: 35,
    marginTop: 13,
  },

  textIcon: {
    color: "#FFFFFF",
  },
});
