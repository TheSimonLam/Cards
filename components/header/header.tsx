import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

export const Header = () => {
  return (
    <View
      style={[
        {
          backgroundColor: Colors["light"].footerBackgroundColor,
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
