import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export const Header = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View
      style={[
        {
          backgroundColor: Colors.red,
        },
        styles.container,
      ]}
    />
  );
};

const stylesheet = createStyleSheet({
  container: {
    height: 60,
  },
});
