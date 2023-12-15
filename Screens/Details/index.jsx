import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../services/axios";
import { StyleSheet } from "react-native";
import StarRating from "Components/molecules/Rating";
import { HotelCard } from "Components";
import { ActivityIndicator } from "react-native-paper";

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

const twoDaysLater = new Date(today);
twoDaysLater.setDate(today.getDate() + 2);

const year2D = twoDaysLater.getFullYear();
const month2D = String(twoDaysLater.getMonth() + 1).padStart(2, "0");
const day2D = String(twoDaysLater.getDate()).padStart(2, "0");

export const DetailPlace = ({ navigation }) => {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const { kota, kotaId } = route.params;
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/properties/list", {
        params: {
          offset: 0,
          arrival_date: `${year}-${month}-${day}`,
          departure_date: `${year2D}-${month2D}-${day2D}`,
          dest_ids: kotaId,
        },
      });
      setLoading(false);
      setDatas(response?.data?.result);
    };
    fetchData();
  }, []);

  // console.log(datas);

  return (
    <View className="flex-1 py-3">
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
          <View className="self-center   ">
            {datas.map((location) => (
              <HotelCard
                key={location.id}
                hotel_id={location.hotel_id}
                image={location.main_photo_url}
                title={location.hotel_name}
                star={location.review_score}
                hotel_name={location.hotel_name}
                price={location.price_breakdown.all_inclusive_price}
                rating={location.review_score}
                address={location.address}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#FFFF",
    marginBottom: 10,
    width: 360,
  },
  flexCol: {
    flex: 1,
    flexDirection: "row",
  },
  star: {
    marginLeft: 10,
  },

  hotelName: {
    fontSize: 20,
    flexWrap: "wrap",
    margin: 10,
    width: "70%",
  },

  word: {
    fontSize: 15,
    marginHorizontal: 10,
    width: "60%",
    paddingBottom: 5,
  },
  image: {
    width: 100,
    height: 150,
  },
});
