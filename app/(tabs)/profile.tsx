import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";

import { DeckButton } from "@/elements/DeckButton";
import { Button } from "@/elements/Button";
import { useRouter } from "expo-router";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function ProfileScreen() {
  const { user } = useUser() || { user: {} };
  const { signOut } = useClerk();
  const router = useRouter();
  const {styles} = useStyles(stylesheet)

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

          <Text style={styles.decksSubtitle}>My Decks</Text>

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

          <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text>
        </View>
      </View>
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  profileBackgroundContainer: {
    flex: 1,
    backgroundColor: theme.colors.yellow,
    position: "relative",
  },
  profileBodyContainer: {
    flex: 1,
    marginTop: 80,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: theme.colors.white,
    position: "relative",
    padding: theme.margins.lg,
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: theme.margins.md,
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
    marginBottom: theme.margins.md,
  },
  decksSubtitle: { marginBottom: theme.margins.sm },
  decksContainer: {
    paddingTop: theme.margins.md,
    paddingBottom: theme.margins.md,
    marginBottom: theme.margins.sm,
    marginLeft: -theme.margins.lg,
    marginRight: -theme.margins.lg,
    backgroundColor: theme.colors.lightGrey,
  },
}));
