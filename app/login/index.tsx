import { useState } from "react";

import { login } from "@/api/auth";
import MainButton from "@/components/button/MainButton";
import PasswordForm from "@/components/form/PasswordForm";
import TextForm from "@/components/form/TextForm";
import { useTheme } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useRouter();

  const { colors } = useTheme();

  const handleLogin = async () => {
    try {
      await login(email, password);
      nav.replace("/");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />
      <View style={{ padding: 20 }}>
        <TextForm
          label="Email"
          placeholder="Email Address..."
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <PasswordForm
          label="Password"
          placeholder="Password"
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <MainButton title="Login" onPress={handleLogin} />

          <Text className="my-2 text-center" style={{ color: colors.text }}>
            Need an Account?{" "}
          </Text>

        <MainButton title="Register Now" onPress={() => nav.push("/register")} />

      </View>
    </>
  );
}
