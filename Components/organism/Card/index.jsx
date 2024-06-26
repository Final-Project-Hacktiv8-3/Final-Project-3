import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { formattedPrice } from "../../../utils/Currency";
import StarRating from "../../molecules/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../../redux/hotel/hotelSlice";
export const HotelCard = ({
  image,
  title,
  price,
  rating,
  address,
  hotel_id,
  star,
  hotel_name,
}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const favoritedHotel = useSelector((state) => state.hotel.favorites);

  const isFavorited = (title) => {
    return favoritedHotel.some((hotel) => hotel.title === title);
  };

  const handleFavorite = () => {
    dispatch(
      addToFavorites({ image, title, price, rating, address, hotel_id })
    );
  };
  const handleNavigate = (hotel_id, star, hotel_name, price, image, title) => {
    // console.log(hotel_id);
    navigation.navigate("Room", {
      hotel_id: hotel_id,
      star: star,
      hotel_name: hotel_name,
      title: title,
      price: price,
      image: image,
    });
  };
  return (
    <View className="p-3">
      <Pressable
        className="relative w-[420px] h-[250px] "
        onPress={() =>
          handleNavigate(hotel_id, star, hotel_name, price, image, title)
        }
      >
        <Image src={image} className="w-full h-full rounded-md" />
        <View className=" p-2 rounded-full absolute self-end">
          <Pressable
            className="p-2 bg-white rounded-full"
            onPress={handleFavorite}
          >
            {isFavorited(title) ? (
              <AntDesign name="heart" size={18} color="red" />
            ) : (
              <AntDesign name="hearto" size={18} color="black" />
            )}
          </Pressable>
        </View>
        <View className="bg-semi-transparent  absolute bottom-0 left-0 w-full p-4 rounded-b-md h-[120px] justify-between flex ">
          <View className="flex flex-row justify-between">
            <Text className=" text-slate-50 text-lg" numberOfLines={1}>
              {title}
            </Text>
          </View>
          <Text className=" text-slate-50 text-lg w-[90%]" numberOfLines={1}>
            {address}
          </Text>
          <View className="flex flex-row justify-between">
            <Text className=" text-slate-50">Rp. {formattedPrice(price)}</Text>
            <StarRating rating={rating} />
          </View>
        </View>
      </Pressable>
    </View>
  );
};
