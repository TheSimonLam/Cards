import { ScrollView, View } from "react-native";

import { useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchUserByUserId } from "@/features/user/userThunks";
import { fetchDecksByUserId } from "@/features/cards/cardsThunks";

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
        dispatch(fetchDecksByUserId(authSession?.user.id));
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.titleContainer}>
            <Text fontSize={24} weight="bold">
              Explore
            </Text>
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
