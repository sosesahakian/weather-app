import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";
import ForecastDayCard from "./ForecastDayCard";

const Forecast = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "4d2A6hwuqX3D9enqjlZlwRjXACTgnDLM";
  const LOCATION = "55.6761,12.5683"; // Frederiksberg, Denmark (Lat, Lon)
  const BASE_URL = "https://api.tomorrow.io/v4/timelines";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            location: LOCATION,
            fields: ["temperature", "precipitationType", "windSpeed"],
            timesteps: "1h",
            units: "metric",
            apikey: API_KEY,
          },
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

  //   if (loading) return <ActivityIndicator size="large" color="blue" />;
  //   if (!weather) return <Text>Error fetching weather data.</Text>;

  const days = weather?.data?.timelines?.[0]?.intervals;

  const dummyDays = [
    {
      startTime: "2025-02-07T05:00:00Z",
      values: {
        precipitationType: 2,
        temperature: 3,
        windSpeed: 7.8,
      },
    },
    {
      startTime: "2025-02-08T05:00:00Z",
      values: {
        precipitationType: 2,
        temperature: 2,
        windSpeed: 8.8,
      },
    },
    {
      startTime: "2025-02-09T05:00:00Z",
      values: {
        precipitationType: 2,
        temperature: 0,
        windSpeed: 11.2,
      },
    },
    {
      startTime: "2025-02-10T05:00:00Z",
      values: {
        precipitationType: 2,
        temperature: 3,
        windSpeed: 7.8,
      },
    },
    {
      startTime: "2025-02-11T05:00:00Z",
      values: {
        precipitationType: 2,
        temperature: 1,
        windSpeed: 7.8,
      },
    },
    {
      startTime: "2025-02-12T05:00:00Z",
      values: {
        precipitationType: 2,
        temperature: 0,
        windSpeed: 7.8,
      },
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text className="text-2xl font-bold pt-14 text-center">
        Tomorrow.io Weather
      </Text>
      {days?.map((day, index) => {
        return (
          <View key={index}>
            <ForecastDayCard day={day} />;
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Forecast;
