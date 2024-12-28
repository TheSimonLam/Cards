import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function SignIn() {
  const { signIn } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          signIn();
          router.replace("/(tabs)/");
        }}
      >
        Sign In
      </Text>
    </View>
  );
}
