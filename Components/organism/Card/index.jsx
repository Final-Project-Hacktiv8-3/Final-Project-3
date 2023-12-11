import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { formattedPrice } from "../../../utils/Currency";
import StarRating from "../../molecules/Rating";
export const HotelCard = ({ image, title, price, rating }) => {
  const navigation = useNavigation();
  return (
    <View className="p-3">
      <View className="relative w-[420px] h-[250px] ">
        <Image src={image} className="w-full h-full rounded-md" />
        <View className=" p-2 rounded-full absolute self-end">
          <View className="p-2 bg-white rounded-full">
            <AntDesign name="heart" size={18} color="red" />
          </View>
        </View>
        <View className="bg-semi-transparent  absolute bottom-0 left-0 w-full p-3 rounded-b-md h-[95px] justify-between flex ">
          <View className="flex flex-row justify-between">
            <Text className=" text-slate-50 text-lg">{title}</Text>
            {/* <Text className=" text-slate-50">{title}</Text> */}
          </View>
          <View className="flex flex-row justify-between">
            <Text className=" text-slate-50">Rp. {formattedPrice(price)}</Text>
            {/* <Text className=" text-slate-50">{title}</Text> */}
            <StarRating rating={rating} />
          </View>
        </View>
      </View>
    </View>
  );
};
