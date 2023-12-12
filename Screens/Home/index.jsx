import {
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useSearch } from "services";
import { Slider } from "Components";

export const Home = ({ navigation }) => {
  const { search, setSearch } = useSearch();
  const onSubmitSearch = () => {
    navigation.navigate("Searchs", { searching: search });
  };
  const locationTop = [
    {
      id: -2679652,
      title: "Jakarta",
      image: require("../../assets/jakarta.jpg"),
    },
    {
      id: -2671578,
      title: "Bandung",
      image: require("../../assets/bandung.jpg"),
    },
    {
      id: -2687472,
      title: "Medan",
      image: require("../../assets/medan.jpg"),
    },
    {
      id: -2698521,
      title: "Surabaya",
      image: require("../../assets/surabaya.jpg"),
    },
  ];

  const locationPop = [
    {
      id: -2701757,
      title: "Bali",
      image: require("../../assets/bali.jpg"),
    },
    {
      id: -2685677,
      title: "Lombok",
      image: require("../../assets/lombok.jpg"),
    },
    {
      id: 7435,
      title: "Raja Ampat",
      image: require("../../assets/rajampat.jpg"),
    },
    {
      id: 15519,
      title: "Wakatobi",
      image: require("../../assets/wakatobi.jpg"),
    },
  ];
  const onChangeSearch = (query) => setSearch(query);
  return (
    <SafeAreaView className="flex-1 py-3  bg-whiten">
      <ScrollView>


        <View className={` max-h-screen  gap-y-5`}>
          <Searchbar
            className="bg-slate-200   w-[90%] self-center  "
            placeholder="Cari Kota"
            value={search}
            onChangeText={onChangeSearch}
            onSubmitEditing={onSubmitSearch}
          />
          <View className="items-center">
            <Image
              source={require("../../assets/view.jpg")}
              className="w-[95%] h-[200px] rounded-md relative"
            />
            <View className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center gap-y-3 items-center">
              <Text className="text-xl font-bold text-white ">
                A Hotel for every
              </Text>
              <Text className="text-xl font-bold text-white ">
                moment rich in emotion.
              </Text>
              <TouchableOpacity className="bg-white p-2 rounded-full">
                <Text className="text-primary font-bold text-md">Book now</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              className="px-3 text-lg font-semibold text-primary "
              onPress={() => navigation.navigate("Details")}
            >
              TOP DESTINATIONS
            </Text>
            <Slider list={locationPop} navigation={navigation} />
          </View>
          <View>
            <Text className="px-3 text-lg  font-semibold text-primary ">
              POPULAR DESTINATIONS
            </Text>
            <Slider list={locationTop} navigation={navigation} />
          </View>
        </View>
        <StatusBar style="auto" backgroundColor={"#7C6A46"} />
      </ScrollView>
    
    </SafeAreaView>
  );
};