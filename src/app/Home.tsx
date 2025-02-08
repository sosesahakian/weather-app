import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [city, setCity] = useState("");

  const API_KEY = "db6986133fe9ee7bd30da999ecd09b49";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeather(response.data);
      setModalVisible(false);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          setLocation(location.coords);
          fetchWeatherByCoords(
            location.coords.latitude,
            location.coords.longitude
          );
        } else {
          console.log("Permission to access location was denied");
        }
      } catch (error) {
        console.error("Error getting location:", error);
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  const iconCode = weather?.weather?.[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  return (
    <View className="justify-end p-4">
      <View className="flex-row items-center gap-2">
        <View className="flex-row p-2 align-middle justify-center items-center">
          <Text className="text-4xl">{weather?.name}</Text>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <Text className="text-6xl">{weather?.main?.temp.toFixed(1)}°C</Text>
        <Text className="font-bold text-lg">
          Feels Like: {weather?.main?.feels_like.toFixed(1)}°C
        </Text>
      </View>

      <View>
        {iconCode && (
          <Image
            source={{ uri: iconUrl }}
            style={{ width: 100, height: 100 }}
          />
        )}
        <Text>Wind Speed: {weather?.wind.speed} m/s</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center opacity-90">
          <View className="bg-white p-3 rounded-lg w-3/4 flex-row items-center justify-center gap-2">
            <TextInput
              className="border-2 border-gray-300 p-3 w-60 rounded "
              placeholder="City Name"
              value={city}
              onChangeText={setCity}
            />
            <TouchableOpacity className="rounded" onPress={fetchWeatherByCity}>
              <FontAwesome name="check" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              className=""
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome name="close" size={28} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
