import BottomTabs from "@/components/BottomTab";
import { Box } from "@/components/ui/box";
import { useThemeContext } from "@/context/themeContext";
import "@/global.css";
import { useState } from "react";

import Explore from "./screens/explore";
import HomeScreen from "./screens/home";
import Settings from "./screens/setting";

export default function Home() {
  const [tab, setTab] = useState("Home");
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Box className="h-full">
      {tab === "Home" && <HomeScreen />}
      {tab === "Explore" && <Explore />}
      {tab === "Settings" && <Settings />}
      <Box className="bottom-0 w-full absolute">
        <BottomTabs currentTab={tab} onTabChange={setTab} />
      </Box>
    </Box>
  );
}
