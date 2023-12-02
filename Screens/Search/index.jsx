import { useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { axiosInstance } from "../../services/axios";
import { useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import { getLocation } from "../../redux/hotel/hotelAction";

export const Search = () => {
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(getLocation({ cityName: "Bandung" }));
  };

  return (
    <View className="flex-1 items-center justify-center bg-purple-900">
      <Text className="text-3xl font-bold text-slate-100 ">Search</Text>
      <Button onPress={handlePress}>Press</Button>
      <StatusBar style="auto" />
    </View>
  );
};
