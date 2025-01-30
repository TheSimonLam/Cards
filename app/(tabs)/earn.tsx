import { Text } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function EarnScreen() {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <Text>Earn</Text>
    </>
  );
}

const stylesheet = createStyleSheet({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
