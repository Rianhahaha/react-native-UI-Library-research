import GradientMain from "@/components/gradient/GradientMain";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useThemeContext } from "@/context/themeContext";
import { useProfileContext } from "@/context/userContext";
import { removeToken } from "@/utils/storage";
import { useRouter } from "expo-router";
import { EditIcon } from "lucide-react-native";
import { ScreenLayoutNoScroll } from "./layout";

export default function Settings() {
  const navigation = useRouter();
  const { profile, clearProfile } = useProfileContext();
  const { theme, toggleTheme } = useThemeContext();
  console.log("theme", theme);

  const Logout = () => {
    removeToken();
    clearProfile();
    console.log("logout, token removed");
    navigation.replace("/");
  };

  return (
    <ScreenLayoutNoScroll>
      {profile && (
        <>
          <VStack>
            <Box className="h-[200px] gap-1 rounded-xl justify-end items-center p-5 shadow-black/20 shadow-2xl bg-gradient-to-bl from-white/5 to-transparent backdrop-blur-sm border-primary-100/20 border">
              <Avatar size="xl" className="mb-3 bg-gradient-main">
                <AvatarFallbackText>{profile?.username}</AvatarFallbackText>
                {/* <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            /> */}
              </Avatar>
              <Text className="text-md font-semibold text-left text-text">
                Welcome, {profile?.username}
              </Text>
              <Text className="text-xs font-normal text-left text-text">
                {profile?.email}
              </Text>
            </Box>
          </VStack>
        </>
      )}
      <VStack className="gap-5 rounded-xl p-5 shadow-black/20 shadow-2xl bg-gradient-to-bl from-white/5 to-transparent backdrop-blur-sm border-primary-100/20 border">
        <GradientMain className="rounded-lg ">
          <Button onPress={toggleTheme}>
            <ButtonText className="text-white">Change Theme</ButtonText>
            <ButtonIcon className="text-white" as={EditIcon} />
          </Button>
        </GradientMain>
      </VStack>
      {profile && (
        <VStack className="gap-5 rounded-xl p-5 shadow-black/20 shadow-2xl bg-gradient-to-bl from-white/5 to-transparent backdrop-blur-sm border-primary-100/20 border">
          <Button action="negative" variant="solid" onPress={Logout}>
            <ButtonText className="text-white">Logout</ButtonText>
            <ButtonIcon as={EditIcon} />
          </Button>
        </VStack>
      )}
      <Button
        className="bg-emerald-500"
        onPress={() => navigation.push("/login")}
      >
        <ButtonText className="text-white">Login</ButtonText>
        <ButtonIcon className="text-white" as={EditIcon} />
      </Button>
    </ScreenLayoutNoScroll>
  );
}
