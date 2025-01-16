import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { increment, selectUserValue } from "../../features/user/userSlice";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { useGetInfo } from "@/hooks/useGetInfo";
import { useEffect } from "react";

export default function HomeScreen() {
  const { requestGetInfo } = useGetInfo();
  // const dispatch = useDispatch();

  // const counter = useSelector(selectUserValue);

  // const handleButtonPress = () => {
  //   dispatch(increment());
  // };

  useEffect(() => {
    (async () => {
      try {
        const res = await requestGetInfo();
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <ThemedScrollView>
      <ThemedView
        lightColor={Colors.light.background}
        darkColor={Colors.dark.background}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">What's New</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
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
