import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";

interface Day {
  startTime: string;
  values: {
    precipitationType: number;
    temperature: number;
    windSpeed: number;
    weatherCode: number;
  };
}

interface ForecastDayCardProps {
  date: string;
  dayData: Day[];
  expanded: boolean;
}

const weatherIcons: Record<number, { name: string; color: string }> = {
  1000: { name: "sun", color: "#FFD700" }, // ☀️
  1100: { name: "cloud-sun", color: "#FFD700" }, // 🌤
  1101: { name: "cloud-sun", color: "#B0C4DE" }, // ⛅
  1102: { name: "cloud", color: "#B0C4DE" }, // ☁️
  1001: { name: "cloud", color: "#808080" }, // ☁️
  2000: { name: "smog", color: "#696969" }, // 🌫
  2100: { name: "smog", color: "#A9A9A9" }, // 🌫
  4000: { name: "cloud-rain", color: "#1E90FF" }, // 🌧
  4001: { name: "cloud-showers-heavy", color: "#1E90FF" }, // 🌧
  4200: { name: "cloud-rain", color: "#87CEEB" }, // 🌦
  4201: { name: "cloud-showers-heavy", color: "#4682B4" }, // 🌧💧
  5000: { name: "snowflake", color: "#ADD8E6" }, // ❄️
  5001: { name: "snowflake", color: "#87CEEB" }, // ❄️💨
  5100: { name: "snowflake", color: "#B0E0E6" }, // 🌨
  5101: { name: "snowflake", color: "#00CED1" }, // ❄️❄️
  6000: { name: "cloud-meatball", color: "#00FFFF" }, // 🧊🌧
  6001: { name: "cloud-meatball", color: "#5F9EA0" }, // 🧊🌧
  6200: { name: "cloud-meatball", color: "#4682B4" }, // 🧊🌦
  6201: { name: "cloud-meatball", color: "#1E90FF" }, // 🧊🌧
  7000: { name: "icicles", color: "#00CED1" }, // 🧊
  7101: { name: "icicles", color: "#5F9EA0" }, // 🧊❄️
  7102: { name: "icicles", color: "#4682B4" }, // 🧊🌨
  8000: { name: "bolt", color: "#FF4500" }, // ⛈
};

const getWeatherIcon = (code: number) => {
  return weatherIcons[code] || { name: "question-circle", color: "#808080" };
};

const times = [
  { label: "6-12", start: 6, end: 12 },
  { label: "12-18", start: 12, end: 18 },
  { label: "18-00", start: 18, end: 24 },
];

const getTimeSlotData = (dayData: Day[], start: number, end: number) => {
  return dayData.filter((hourData) => {
    const hour = new Date(hourData.startTime).getHours();
    return hour >= start && hour < end;
  });
};

const getMostFrequentWeatherCode = (slotData: Day[]) => {
  const count: Record<number, number> = {};
  slotData.forEach((data) => {
    count[data.values.weatherCode] = (count[data.values.weatherCode] || 0) + 1;
  });

  return Object.keys(count).reduce((a, b) =>
    count[Number(a)] > count[Number(b)] ? Number(a) : Number(b)
  );
};

const ForecastDayCard: React.FC<ForecastDayCardProps> = ({
  date,
  dayData,
  expanded,
}) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <View className="border-slate-500 bg-slate-400 opacity-60 p-2 my-2 rounded-xl gap-3 w-[300px]">
      <Text className="text-2xl font-medium">{formattedDate}</Text>

      {!expanded &&
        times.map((slot) => {
          const slotData = getTimeSlotData(dayData, slot.start, slot.end);

          if (slotData.length === 0) return null;

          const avgTemp = (
            slotData.reduce((sum, d) => sum + d.values.temperature, 0) /
            slotData.length
          ).toFixed(0);
          const avgWind = (
            slotData.reduce((sum, d) => sum + d.values.windSpeed, 0) /
            slotData.length
          ).toFixed(0);
          const mostFrequentCode = getMostFrequentWeatherCode(slotData);
          const { name, color } = getWeatherIcon(mostFrequentCode);

          return (
            <View
              key={slot.label}
              className="flex-row justify-between items-center"
            >
              <Text className="font-semibold px-3">{slot.label}</Text>
              <FontAwesome5 name={name} size={20} color={color} />
              <Text>{avgTemp}°C</Text>
              <Text>{avgWind} m/s</Text>
            </View>
          );
        })}

      {expanded && (
        <View>
          <Text className="font-semibold mt-2">Hourly Breakdown:</Text>
          {dayData.map((hourData, index) => {
            const hour = new Date(hourData.startTime).getHours();
            const { name, color } = getWeatherIcon(hourData.values.weatherCode);

            return (
              <View
                key={index}
                className="flex-row justify-between items-center"
              >
                <Text>{hour}:00</Text>
                <FontAwesome5 name={name} size={20} color={color} />
                <Text>{hourData.values.temperature.toFixed(0)}°C</Text>
                <Text>{hourData.values.windSpeed.toFixed(0)} m/s</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default ForecastDayCard;
