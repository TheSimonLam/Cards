import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
        headerTransparent: true,
        headerTitle: "",
      }}
    >
      <Stack.Screen name="login"></Stack.Screen>
      <Stack.Screen name="register"></Stack.Screen>
      <Stack.Screen name="reset"></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;
