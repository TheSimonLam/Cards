import { StyleSheet, Button } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { increment, selectUserValue } from "../features/user/userSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const counter = useSelector(selectUserValue);

  const handleButtonPress = () => {
    dispatch(increment());
  };

  return (
    <>
      <ThemedView
        lightColor={Colors.light.background}
        darkColor={Colors.dark.background}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome to Cards!</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">{"here: " + counter}</ThemedText>
          <Button onPress={handleButtonPress} title="Press Me" />
        </ThemedView>
      </ThemedView>
    </>
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
