import React, { useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "./Home";
import Forecast from "./Forecast";
import Other from "./Other";
const Tab = createBottomTabNavigator();
import FontAwesome from "@expo/vector-icons/FontAwesome";

function BackgroundWrapper({ children }) {
  return (
    <ImageBackground
      source={require("../assets/images/clouds.jpg")}
      style={{ flex: 1, width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

function HomeScreen() {
  return (
    <BackgroundWrapper>
      <View className="flex-1 justify-center items-center">
        <Home />
      </View>
    </BackgroundWrapper>
  );
}

function ForecastScreen() {
  return (
    <BackgroundWrapper>
      <View className="flex-1 justify-center items-center">
        <Forecast />
      </View>
    </BackgroundWrapper>
  );
}
function OtherScreen() {
  return (
    <BackgroundWrapper>
      <View className="flex-1 justify-center items-center">
        <Other />
      </View>
    </BackgroundWrapper>
  );
}

export default function Page() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          opacity: 0.5,
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Forecast"
        component={ForecastScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="line-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Other"
        component={OtherScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="weather-partly-snowy-rainy"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
