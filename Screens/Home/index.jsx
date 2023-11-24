import { StatusBar, Text, View } from "react-native";

export const Home = () => {
  return (
    <View className="flex items-center justify-center bg-slate-900">
      <Text className="text-3xl font-bold text-slate-100 ">
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
};
