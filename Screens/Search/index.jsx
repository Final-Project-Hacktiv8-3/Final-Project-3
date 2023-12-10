import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Searchbar, Text } from "react-native-paper";
import { getHotelByLocation, getLocation } from "../../redux/hotel/hotelAction";
import { useSearch } from "../../services/context";
import { useNavigation } from "@react-navigation/native";
import { HotelCard } from "../../Components/organism/Card";

export const Search = ({ route }) => {
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
  const dispatch = useDispatch();
  // const { searching } = route.params;
  // const { search, setSearch } = useSearch(searching || "");
  const [hotels, setHotels] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [endReached, setEndReached] = useState(false);
  const [offset, setOffset] = useState(0);

  // const handlerGetHotel = async (test) => {
  //   try {
  //     setLoading(true);
  //     const { payload } = await dispatch(
  //       getLocation({
  //         cityName: search || test,
  //       })
  //     );
  //     const response = await dispatch(
  //       getHotelByLocation({ dest_id: payload[0].dest_id, offset })
  //     );

  //     setEndReached(response.payload.result.length === 0);

  //     // If offset is 0, set the new hotels, otherwise append to existing hotels
  //     setHotels((prevHotels) =>
  //       offset === 0
  //         ? response.payload.result
  //         : [...prevHotels, ...response.payload.result]
  //     );

  //     // Clear the search value after handling the search
  //     setSearch("");
  //   } catch (error) {
  //     console.error("Error fetching hotels:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onChangeSearch = (query) => {
    // Set nilai search setiap kali pengguna mengetik
    setSearch(query);
  };

  const onSubmitSearch = () => {
    // Reset offset when a new search is initiated
    setOffset(0);
    // Call the search function
    handlerGetHotel();
  };

  // useEffect(() => {
  //   if (searching) {
  //     handlerGetHotel(searching);
  //   }
  // }, [searching]);

  const handlePress = () => {
    dispatch(getLocation({ cityName: search }));
  };

  return (
    <View className="flex-1 max-h-screen bg-white ">
      {/* <Text>Hotel for {search}</Text> */}
      <Searchbar
        className="bg-slate-200 w-[90%] self-center mt-12 mb-4"
        placeholder="Cari Kota"
        // Set nilai Searchbar ke nilai search
        // value={search}
        onChangeText={onChangeSearch}
        onSubmitEditing={onSubmitSearch} // This function will be called on "Enter"
      />
      <ScrollView>
        <View className="self-center   ">
          {locationTop.map((location) => (
            <HotelCard
              key={location.id}
              image={location.image}
              title={location.title}
            />
          ))}
        </View>
      </ScrollView>
      {/* {loading ? (
        <Text className="text-white">Loading...</Text>
      ) : (
        hotels.slice(0, 3).map((hotel) => (
          <Text key={hotel.id} className="text-slate-800">
            {hotel.hotel_name}
          </Text>
        ))
      )} */}

      <StatusBar style="auto" />
    </View>
  );
};
