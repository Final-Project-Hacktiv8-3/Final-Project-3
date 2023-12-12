import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export const Loading = () => {
  const navigation = useNavigation();
  return (
    <View className="p-3  flex gap-y-4 ">
      <View className="relative w-[400px] h-[250px] bg-slate-300 animate-pulse rounded-md"></View>
      <View className="relative w-[400px] h-[250px] bg-slate-300 animate-pulse rounded-md"></View>
      <View className="relative w-[400px] h-[250px] bg-slate-300 animate-pulse rounded-md"></View>
      <View className="relative w-[400px] h-[250px] bg-slate-300 animate-pulse rounded-md"></View>
    </View>
  );
};
