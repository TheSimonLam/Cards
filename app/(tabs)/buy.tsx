import { ScrollView, View } from "react-native";

import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/elements/Text";

export default function BuyScreen() {
  const { styles } = useStyles(stylesheet);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.titleContainer}>
            <Text fontSize={24} weight="bold">Buy</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingLeft: theme.margins.md,
    paddingRight: theme.margins.md,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
}));
