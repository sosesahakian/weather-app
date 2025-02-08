import { View, Text } from "react-native";
import React from "react";

interface Day {
  startTime: string;
  values: {
    precipitationType: number;
    temperature: number;
    windSpeed: number;
  };
}

interface ForecastDayCardProps {
  day: Day;
}

const ForecastDayCard: React.FC<ForecastDayCardProps> = ({ day }) => {
  const dateStr = day.startTime;
  const date = new Date(dateStr);

  const formattedDate = `${date.toLocaleString("en-US", {
    weekday: "long",
  })}, ${date.toLocaleString("en-US", { month: "long" })} ${date.getDate()}`;

  return (
    <View className="border-slate-500 bg-slate-400 opacity-60 p-6 m-6 rounded-3xl gap-3 w-11/12">
      <Text className="text-2xl font-medium">{formattedDate}</Text>
      <Text>Precipitation Type: {day.values.precipitationType}</Text>
      <Text>Temperature: {day.values.temperature}°C</Text>
      <Text>Wind Speed: {day.values.windSpeed} m/s</Text>
    </View>
  );
};

export default ForecastDayCard;
