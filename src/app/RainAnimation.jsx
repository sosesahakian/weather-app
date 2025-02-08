import React from "react";
import { View } from "react-native";
import Svg, { Line } from "react-native-svg";
import { MotiView } from "moti";

export const RainAnimation = () => {
  const drops = new Array(10).fill(0);

  return (
    <View style={{ position: "absolute", width: "100%", height: "100%" }}>
      {drops.map((_, index) => (
        <MotiView
          key={index}
          from={{ translateY: -50, opacity: 1 }}
          animate={{ translateY: 400, opacity: 0 }}
          transition={{
            type: "timing",
            duration: 2000,
            loop: true,
            delay: index * 200, // Stagger effect
          }}
          style={{ position: "absolute", left: Math.random() * 400 }}
        >
          <Svg height="50" width="5">
            <Line x1="0" y1="0" x2="0" y2="50" stroke="blue" strokeWidth="3" />
          </Svg>
        </MotiView>
      ))}
    </View>
  );
};
