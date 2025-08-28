import GradientBackground from "@/components/gradient/GradientBackground";
import { Box } from "@/components/ui/box";
import { ReactNode } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenLayoutProps = {
  children: ReactNode;
};

export default function ScreenLayout({ children }: ScreenLayoutProps) {
  return (
    <GradientBackground>
      <SafeAreaView>
        <ScrollView className="h-full p-5 gap-5 mb-[2rem] overflow-y-auto">
          {children}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}
export function ScreenLayoutNoScroll({ children }: ScreenLayoutProps) {
  return (
    <GradientBackground>
      <SafeAreaView>
        <Box className="h-full p-5 gap-5">{children}</Box>
      </SafeAreaView>
    </GradientBackground>
  );
}
