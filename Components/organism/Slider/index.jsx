import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export const Slider = ({ list }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const scrollTimer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % list.length;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 2000);

    return () => clearInterval(scrollTimer);
  }, [list, currentIndex]);
  const navigation = useNavigation();
  return (
    <FlatList
      ref={flatListRef}
      data={list}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="mr-2"
          onPress={() =>
            navigation.navigate("Search", { searching: item.title })
          }
        >
          <View className="p-3">
            <View className="relative w-[300px] h-[250px] ">
              <Image source={item.image} className="w-full h-full rounded-md" />
              <View className="bg-semi-transparent  absolute bottom-0 left-0 w-full p-2 rounded-b-md">
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
      snapToInterval={400}
      decelerationRate="normal"
      showsHorizontalScrollIndicator={false}
    />
  );
};
