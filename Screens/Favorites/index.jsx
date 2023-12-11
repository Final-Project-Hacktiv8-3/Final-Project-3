import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { HotelCard } from "../../Components/organism/Card";

export const Favorites = () => {
  const favorites = useSelector((state) => state.hotel.favorites);
  console.log("favorites", favorites);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="self-center   ">
          {favorites.map((item, idx) => (
            <HotelCard
              key={idx}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </View>
        {/* {endReached && (
          <View className="self-center">
            <Text>Tidak ada hotel lagi </Text>
          </View>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};
