import { ArticleProvider } from "@/context/articleContext";
import { BlogsProvider } from "@/context/blogsContext";
import { ThemeProvider } from "@/context/themeContext";
import { ProfileProvider } from "@/context/userContext";
import "@/global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider>
      <ProfileProvider>
        <ArticleProvider>
          <BlogsProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
              </Stack>
          </BlogsProvider>
        </ArticleProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}
