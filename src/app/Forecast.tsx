import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import ForecastDayCard from "./ForecastDayCard";

const Forecast = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const API_KEY = "4d2A6hwuqX3D9enqjlZlwRjXACTgnDLM";
  const LOCATION = "55.6761,12.5683";
  const BASE_URL = "https://api.tomorrow.io/v4/timelines";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            location: LOCATION,
            fields: [
              "temperature",
              "precipitationType",
              "precipitationIntensity",
              "windSpeed",
              "weatherCode",
            ],
            timesteps: "1h",
            units: "metric",
            apikey: API_KEY,
          },
        });
        console.log(response);

        const rawData = response.data?.data?.timelines?.[0]?.intervals || [];
        const groupedData: Record<string, any[]> = {};

        rawData.forEach((entry: any) => {
          const dateKey = entry.startTime.split("T")[0];
          if (!groupedData[dateKey]) groupedData[dateKey] = [];
          groupedData[dateKey].push(entry);
        });

        setWeather(groupedData);
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

  console.log(weather);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text className="text-2xl font-bold pt-14 text-center">
        5 Day Forecast
      </Text>
      {Object.entries(weather).map(([date, dayData]) => (
        <TouchableOpacity
          key={date}
          onPress={() => setExpandedDay(expandedDay === date ? null : date)}
        >
          <ForecastDayCard
            date={date}
            dayData={dayData}
            expanded={expandedDay === date}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Forecast;
