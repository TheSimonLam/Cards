import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";

import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { DeckButton } from "@/components/DeckButton";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { user } = useUser() || { user: {} };
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      router.replace("/login");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      <View style={styles.profileBackgroundContainer}>
        <View style={styles.profileBodyContainer}>
          <View style={styles.profilePictureContainer}>
            <TouchableHighlight style={[styles.profileImgContainer]}>
              <Image
                source={{
                  uri: "https://i.ebayimg.com/images/g/XZ4AAOSwQJ1eiTfV/s-l1200.jpg",
                }}
                style={styles.profileImg}
              />
            </TouchableHighlight>
          </View>

          <View style={styles.usernameContainer}>
            <Text>GamerGuy01</Text>
            <Text>"Ha, you can't defeat me!"</Text>
          </View>

          <Text style={styles.decksSubtitle}>
            My Decks
          </Text>

          <View style={styles.decksContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <DeckButton title="Unorganized"></DeckButton>
              <DeckButton title="Fire"></DeckButton>
              <DeckButton title="Electric"></DeckButton>
              <DeckButton title="Bad deck"></DeckButton>
              <DeckButton title="Unbeatable"></DeckButton>
              <DeckButton title="New Deck"></DeckButton>
            </ScrollView>
          </View>

          <Button
            onPress={handleSignOut}
            text="Sign Out"
            variant="solid"
          ></Button>

          <Text>
            Welcome, {user?.emailAddresses[0].emailAddress} 🎉
          </Text>
        </View>
      </View>
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
  decksContainer: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    marginBottom: Spacing.sm,
    marginLeft: -Spacing.lg,
    marginRight: -Spacing.lg,
    backgroundColor: Colors.lightGrey,
  },
});
