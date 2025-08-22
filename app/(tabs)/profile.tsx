import { Image, ScrollView, TouchableHighlight, View } from "react-native";

import { DeckButton } from "@/elements/DeckButton";
import { Button } from "@/elements/Button";
import { useFocusEffect, useRouter } from "expo-router";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectUserDetails } from "@/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "@/elements/Text";
import { supabase } from "@/services/supabase";
import {
  fetchAddUserMoney,
  fetchUserByUserId,
} from "@/features/user/userThunks";
import { AuthContext } from "@/providers/AuthProvider";
import { AppDispatch } from "@/features/store";
import { useContext, useEffect } from "react";

export default function ProfileScreen() {
  const userDetails = useSelector(selectUserDetails) || {};
  const router = useRouter();
  const { styles } = useStyles(stylesheet);
  const dispatch = useDispatch<AppDispatch>();
  const authSession = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      // Redirect to your desired page
      router.replace("/login");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const addMoney = () => {
    dispatch(
      fetchAddUserMoney({ amount: 20, email: userDetails.email_address })
    );
    if (authSession?.user.id) {
      dispatch(fetchUserByUserId(authSession?.user.id));
    }
  };

  useFocusEffect(() => {
    (async () => {
      if (authSession?.user.id) {
        dispatch(fetchUserByUserId(authSession?.user.id));
      }
    })();
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

          <Text>Your balance is: £{userDetails.balance}</Text>

          <Button onPress={addMoney} text="Add £20" variant="solid" />

          <View style={styles.userIdContainer}>
            <Text>GamerGuy01</Text>
            <Text>"Ha, you can't defeat me!"</Text>
          </View>

          <Text>My Decks</Text>

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

          <Text>Welcome, {userDetails.email_address} 🎉</Text>
        </View>
      </View>
    </SafeAreaView>
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
  userIdContainer: {
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    marginBottom: theme.margins.md,
  },
  decksContainer: {
    paddingTop: theme.margins.md,
    paddingBottom: theme.margins.md,
    marginBottom: theme.margins.sm,
    marginLeft: -theme.margins.lg,
    marginRight: -theme.margins.lg,
    backgroundColor: theme.colors.lightGrey,
  },
}));
