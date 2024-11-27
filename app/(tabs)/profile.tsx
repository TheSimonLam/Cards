import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  useColorScheme,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { DeckButton } from "@/components/DeckButton";
import { Button } from "@/components/Button";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemedView style={styles.profileBackgroundContainer}>
        <ThemedView style={styles.profileBodyContainer}>
          <ThemedView style={styles.profilePictureContainer}>
            <TouchableHighlight style={[styles.profileImgContainer]}>
              <Image
                source={{
                  uri: "https://i.ebayimg.com/images/g/XZ4AAOSwQJ1eiTfV/s-l1200.jpg",
                }}
                style={styles.profileImg}
              />
            </TouchableHighlight>
          </ThemedView>

          <ThemedView style={styles.usernameContainer}>
            <ThemedText type="title">GamerGuy01</ThemedText>
            <ThemedText>"Ha, you can't defeat me!"</ThemedText>
          </ThemedView>

          <ThemedView style={styles.decksContainer}>
            <ThemedText style={styles.decksSubtitle} type="subtitle">
              My Decks
            </ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <DeckButton title="Unorganized"></DeckButton>
              <DeckButton title="Fire"></DeckButton>
              <DeckButton title="Electric"></DeckButton>
              <DeckButton title="Bad deck"></DeckButton>
              <DeckButton title="Unbeatable"></DeckButton>
              <DeckButton title="New Deck"></DeckButton>
            </ScrollView>
          </ThemedView>

          <Button onPress={() => {}} text="" variant="solid"></Button>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  profileBackgroundContainer: {
    flex: 1,
    backgroundColor: Colors.yellow,
    position: "relative",
  },
  profileBodyContainer: {
    flex: 1,
    marginTop: 80,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: Colors.white,
    position: "relative",
    padding: Spacing.lg,
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  profileImgContainer: {
    marginTop: -80,
    marginLeft: 8,
    height: 100,
    width: 100,
    borderRadius: 60,
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 60,
  },
  usernameContainer: {
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  decksSubtitle: { marginBottom: Spacing.sm },
  decksContainer: { marginBottom: Spacing.sm },
});
