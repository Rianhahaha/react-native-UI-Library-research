import { register } from "@/api/auth";
import { Colors } from "@/constants/Colors";
import { Link, Stack, useRouter } from "expo-router";
import React, { useState } from "react";

import { ScreenLayoutNoScroll } from "@/app/screens/layout";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Alert } from "react-native";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useRouter();

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      console.log("Register berhasil", username, email, password);
      navigation.replace("/login");
    } catch (error: any) {
      console.log("API ERROR:", error.response?.data);
      Alert.alert("Register Gagal", "Cek apakah email sudah dipakai.");
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Register" }} />

      <ScreenLayoutNoScroll>
        <Text className="text-2xl font-bold text-white uppercase">
          Register
        </Text>
        <Input size="md" className="form-main">
          <InputField onChangeText={setEmail} placeholder="Email..." />
        </Input>
        <Input size="md" className="form-main">
          <InputField onChangeText={setUsername} placeholder="Username..." />
        </Input>
        <Input size="md" className="form-main">
          <InputField
            placeholder="Password..."
            secureTextEntry
            onChangeText={setPassword}
          />
        </Input>
        <Button
          size="md"
          variant="solid"
          action="gradient"
          onPress={handleRegister}
        >
          <ButtonText>Register</ButtonText>
        </Button>
        {/* <Button title="Login" onPress={handleLogin} /> */}
        <Link style={{ color: Colors.dark.text }} href="/login">
          Need an account?
        </Link>
      </ScreenLayoutNoScroll>
    </>
  );
}

