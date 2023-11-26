import { useEffect, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import { axiosInstance } from "../../services/axios";

export const Search = () => {
  const [data, setData] = useState(null);
  const getData = async () => {
    try {
      const response = await axiosInstance.get("/locations/auto-complete", {
        params: {
          text: "london",
          languagecode: "en-us",
        },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <View className="flex-1 items-center justify-center bg-purple-900">
      <Text className="text-3xl font-bold text-slate-100 ">Search</Text>
      <StatusBar style="auto" />
    </View>
  );
};
