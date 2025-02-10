import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";

const Forecast = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "4d2A6hwuqX3D9enqjlZlwRjXACTgnDLM";
  const LOCATION = "55.6761,12.5683";
  const BASE_URL = "https://api.tomorrow.io/v4/weather/realtime";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            location: LOCATION,
            fields: [
              "cloudCover",
              "humidity",
              "dewPoint",
              "visibility",
              "surfaceTemperature",
              "windSpeed",
              "uvIndex",
            ],
            units: "metric",
            apikey: API_KEY,
          },
        });
        console.log(response.data.data.values);

        setWeather(response.data?.data?.values || {});
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (!weather) return <Text>Error fetching weather data.</Text>;

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex">
      <Text className="text-2xl font-bold pt-14 text-center">
        Current Weather
      </Text>
      <View className="p-4 flex justify-evenly gap-3">
        <View className="flex-row gap-2  ">
          <Text className="font-semibold p-5 h-40 opacity-50 rounded-lg bg-slate-300">
            Temperature: {weather?.surfaceTemperature}°C
          </Text>
          <Text className="p-5 opacity-50 rounded-lg bg-slate-300">
            Humidity: {weather?.humidity}%
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Text className="p-5 bg-slate-300 opacity-50 rounded-lg ">
            Wind Speed: {weather?.windSpeed} km/h
          </Text>
          <Text className="p-5 bg-slate-300 opacity-50 rounded-lg">
            UV Index: {weather?.uvIndex}
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Text className="p-5 bg-slate-300 opacity-50 h-40 rounded-lg">
            Cloud Cover: {weather?.cloudCover}%
          </Text>
          <Text className="p-5 bg-slate-300 opacity-50 rounded-lg">
            Dew Point: {weather?.dewPoint}°C
          </Text>
        </View>

        <Text className="p-5 bg-slate-300 opacity-50 h-36 rounded-lg">
          Visibility: {weather?.visibility} km
        </Text>
      </View>
    </ScrollView>
  );
};

export default Forecast;
