import { login } from "@/api/auth";
import { ScreenLayoutNoScroll } from "@/app/screens/layout";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Colors } from "@/constants/Colors";
import { useProfileContext } from "@/context/userContext";
import { Link, Stack, useRouter } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";

import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useRouter();
  const { refetch } = useProfileContext();

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      console.log(token);
      if (token) {
        await refetch();
      }
      nav.replace("/");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Register" }} />
      <ScreenLayoutNoScroll>
        <Box className="flex flex-row gap-2 items-center ">
          <Link href="/">
            <Icon as={ChevronLeftIcon} size="xl"  className="text-white" />
          </Link>
        <Text className="text-2xl font-bold text-white uppercase">
          Login
        </Text>
        </Box>
        <Input size="md" className="form-main">
          <InputField onChangeText={setEmail} placeholder="Email..." />
        </Input>
        <Input size="md" className="form-main">
          <InputField
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />
        </Input>
        <Button
          size="md"
          variant="solid"
          action="gradient"
          onPress={handleLogin}
        >
          <ButtonText>Login</ButtonText>
        </Button>
        {/* <Button title="Login" onPress={handleLogin} /> */}
        <Link style={{ color: Colors.dark.text }} href="/register">
          Need an account?
        </Link>
      </ScreenLayoutNoScroll>
    </>
  );
}
