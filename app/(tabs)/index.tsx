import { ScrollView, View } from "react-native";

import { useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchUserByUserId } from "@/features/user/userThunks";
import { AppDispatch } from "@/features/store";
import { Text } from "@/elements/Text";
import { AuthContext } from "@/providers/AuthProvider";

export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);
  const authSession = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      if (authSession?.user.id) {
        dispatch(fetchUserByUserId(authSession?.user.id));
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <View style={styles.titleContainer}>
            <Text>Explore</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
