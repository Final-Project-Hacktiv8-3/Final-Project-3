import { useEffect } from "react";
import { StatusBar, Text, View } from "react-native";
import { useSelector } from "react-redux";

export const Home = () => {
  const getListHotel = useSelector((state) => state.hotel.location);

  

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-bold text-purple-600 ">
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
};
