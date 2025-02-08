import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/lightning.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-2xl">Hello World!</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default App;
