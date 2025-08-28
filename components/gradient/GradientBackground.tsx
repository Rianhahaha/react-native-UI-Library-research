import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useColorScheme } from "react-native";

export default function GradientBackground({ children }: { children: React.ReactNode }) {
  const theme = useColorScheme(); // "light" | "dark"

  if (theme === "dark") {
    return (
      <LinearGradient
        colors={["#1D131A", "#562261"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        {children}
      </LinearGradient>
    );
  }

  // Light mode fallback (misalnya plain white / gradient lain)
  return (
    <LinearGradient
      colors={["#FEE7FF", "#FFBCFB"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
}
