import React, { useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch } from "react-redux";
import { Searchbar, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getHotelByLocation, getLocation } from "redux/hotel/hotelAction";
import { useSearch } from "services";
import { HotelCard } from "Components";

export const Search = ({ route }) => {
  const dispatch = useDispatch();
  const { searching } = route.params || {};
  const { search, setSearch } = useSearch(searching || "");
  const [hotels, setHotels] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [endReached, setEndReached] = useState(false);
  const [offset, setOffset] = useState(0);

  const handlerGetHotel = async (test) => {
    try {
      setLoading(true);
      const { payload } = await dispatch(
        getLocation({
          cityName: search || test,
        })
      );
      const response = await dispatch(
        getHotelByLocation({ dest_id: payload[0].dest_id, offset })
      );

      setEndReached(response.payload.result.length === 0);

      setHotels((prevHotels) =>
        offset === 0
          ? response.payload.result
          : [...prevHotels, ...response.payload.result]
      );

      setSearch("");
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeSearch = (query) => {
    setSearch(query);
  };

  const onSubmitSearch = () => {
    setOffset(0);
    handlerGetHotel();
  };

  useEffect(() => {
    if (searching) {
      handlerGetHotel(searching);
      setSearch(searching);
    }
  }, [searching]);

  return (
    <SafeAreaView className="flex-1 py-3 bg-white ">
      <Searchbar
        className="bg-slate-200 w-[90%] self-center  mb-4"
        placeholder="Cari Kota"
        value={search}
        onChangeText={onChangeSearch}
        onSubmitEditing={onSubmitSearch}
      />
      <ScrollView>
        <View className="self-center   ">
          {hotels.map((location) => (
            <HotelCard
              key={location.id}
              image={location.main_photo_url}
              title={location.hotel_name}
              price={location.price_breakdown.all_inclusive_price}
              rating={location.review_score}
            />
          ))}
        </View>
        {endReached && (
          <View className="self-center">
            <Text>Tidak ada hotel lagi </Text>
          </View>
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
