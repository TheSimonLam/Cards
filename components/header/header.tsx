import { Colors } from "@/constants/Colors";
import { StyleSheet, useColorScheme, View } from "react-native";

export const Header = () => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        {
          backgroundColor: Colors[colorScheme ?? "light"].footerBackgroundColor,
        },
        styles.container,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
});
