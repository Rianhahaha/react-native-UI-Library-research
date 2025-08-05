import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, LightTheme } from "@/theme/Colors";
import {
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // useEffect(() => {
  //   const checkProfile = async () => {
  //     const token = await getToken();
  //     if (!token) {
  //       navigation.replace("/login");
  //       return;
  //     }
  //   };

  //   checkProfile();
  // }, []);
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  const navigation = useRouter();

  return (
    <ThemeProvider  value={colorScheme === "dark" ? DarkTheme : LightTheme}>
      <Stack
        screenOptions={{
          headerBackground: () => (
            <LinearGradient
              colors={["#883be9", "#db52df"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          ),
          
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
            color: "#fff", 
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
