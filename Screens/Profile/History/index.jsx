import { HotelCard } from "Components";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";

export const History = ({ navigation }) => {
  const history = useSelector((state) => state.hotel.history);
  console.log(history);
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      {history.length === 0 ? (
        <View>
          <Text className="text-xl font-semibold mb-6">
            You haven't booked a hotel yet.
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
          {history.map((item, idx) => (
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
