import { DarkTheme as DefaultDark, DefaultTheme as DefaultLight } from "@react-navigation/native";

export const LightTheme = {
  ...DefaultLight,
  colors: {
    ...DefaultLight.colors,
    primary: "#7c3aed",     
    background: "#ffffff",  
    card: "#f3f4f6",         
    text: "#1f2937",         
    border: "#e5e7eb",       
    notification: "#f87171", 
  },
};

export const DarkTheme = {
  ...DefaultDark,
  colors: {
    ...DefaultDark.colors,
    primary: "#c084fc",
    background: "#230F38",
    card: "#00000030",
    text: "#f8fafc",
    border: "#334155",
    notification: "#fb7185",
  },
};
