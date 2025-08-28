import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Bolt, Home, Newspaper } from "lucide-react-native";
import { Pressable } from "react-native";
import GradientMain from "./gradient/GradientMain";

const tabs = [
  { name: "Home", icon: Home },
  { name: "Explore", icon: Newspaper },
  { name: "Settings", icon: Bolt },
];
let isActive = false;

export default function BottomTabs({ currentTab, onTabChange }: any) {
  return (
    <GradientMain
      className="rounded-lg flex flex-row justify-between items-center p-5"
      style={{
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
      }}
    >
      {tabs.map((tab) => {
        isActive = tab.name === currentTab;

        return (
          <Pressable
            key={tab.name}
            onPress={() => onTabChange(tab.name)}
            className={`items-center flex-1  ${
              isActive ? "opacity-100" : "opacity-50"
            }`}
          >
            <Icon size="xl" as={tab.icon} className="text-white" />
            <Text className="font-bold text-white">{tab.name}</Text>
          </Pressable>
        );
      })}
    </GradientMain>
  );
}
