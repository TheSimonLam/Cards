import { ScrollView, Text, View } from "react-native";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchUserByUsername } from "@/features/user/userThunks";
import { AppDispatch } from "@/features/store";

export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);
  const { getToken } = useAuth();

  const { user } = useUser() || { user: {} };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      const authToken = (await getToken({ template: "supabase" })) || "";

      if (user?.username) {
        dispatch(fetchUserByUsername({ username: user.username, authToken }));
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
