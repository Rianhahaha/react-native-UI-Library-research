import { LinearGradient } from "expo-linear-gradient";
import React from "react";
interface GradientMainProps {
  children: React.ReactNode;
  className?: string;
  style?: any
}
export default function GradientMain({ children, className, style }:  GradientMainProps) {
    return (
      <LinearGradient
        className={`overflow-hidden ${className}`}
        colors={["#D951DF", "#8A3BE8"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={style}
      >
        {children}
      </LinearGradient>
    );
  }


