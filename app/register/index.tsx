import { register } from "@/api/auth";
import { useTheme } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import MainButton from "@/components/button/MainButton";
import PasswordForm from "@/components/form/PasswordForm";
import TextForm from "@/components/form/TextForm";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();
  const nav = useRouter();

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      console.log("Register berhasil", username, email, password);
      nav.replace("/login");
    } catch (error: any) {
      console.log("API ERROR:", error.response?.data);
      Alert.alert("Register Gagal", "Cek apakah email sudah dipakai.");
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Register" }} />

      <View style={{ padding: 20 }}>
        <TextForm
          label="Username"
          placeholder="Username..."
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={setUsername}
        />
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
        <MainButton title="Register" onPress={handleRegister} />

        <Text className="my-2 text-center" style={{ color: colors.text }}>
          Have an Account?{" "}
        </Text>

        <MainButton title="Login Now" onPress={() => nav.push("/login")} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 10,
    backgroundColor: "white",
  },
});
