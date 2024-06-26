import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { HotelCard } from "../../Components/organism/Card";
import { Button } from "react-native-paper";

export const Favorites = () => {
  const favorites = useSelector((state) => state.hotel.favorites);

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      {favorites.length === 0 ? (
        <View>
          <Text className="text-xl font-semibold mb-6">
            You haven't added a favorite hotel yet
          </Text>
          <Button
            mode="contained"
            buttonColor="#7C6A46"
            onPress={() => navigation.navigate("Home")}
          >
            Explore Now
          </Button>
        </View>
      ) : (
        <ScrollView>
          {favorites.map((item, idx) => (
            <HotelCard
              key={idx}
              hotel_id={item.hotel_id}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
