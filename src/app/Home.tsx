import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Image } from "react-native";
import axios from "axios";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "db6986133fe9ee7bd30da999ecd09b49";
  const CITY = "London";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: { q: CITY, appid: API_KEY, units: "metric" },
        });
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  const iconCode = weather?.weather?.[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  console.log("dkfjf", weather);
  return (
    <View>
      <Text className="text-7xl">{weather?.name}</Text>
      <Text>Temperature: {weather?.main?.temp}°C</Text>
      <Text>Feels Like: {weather?.main?.feels_like}°C</Text>
      {iconCode && (
        <Image source={{ uri: iconUrl }} style={{ width: 100, height: 100 }} />
      )}
    </View>
  );
};

export default Home;
