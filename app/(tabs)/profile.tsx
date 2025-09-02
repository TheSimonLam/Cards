import { Image, ScrollView, TouchableHighlight, View } from "react-native";

import { DeckButton } from "@/elements/DeckButton";
import { Button } from "@/elements/Button";
import { useFocusEffect } from "expo-router";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
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
import { useCallback, useContext } from "react";
import { setDeckViewerOpenWithDeckId } from "@/features/global/globalSlice";

export default function ProfileScreen() {
  const userDetails = useSelector(selectUserDetails) || {};
  const { styles } = useStyles(stylesheet);
  const dispatch = useDispatch<AppDispatch>();
  const authSession = useContext(AuthContext);
  const { top: topSafeAreaInset } = useSafeAreaInsets();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      // Redirect to your desired page
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const addMoney = () => {
    dispatch(
      fetchAddUserMoney({ amount: 20, email: userDetails.email_address, userId: authSession?.user.id })
    );
  };

  const onDeckButtonPress = () => {
    dispatch(setDeckViewerOpenWithDeckId(new Date().toTimeString()));
  };

  useFocusEffect(
    useCallback(() => {
      if (authSession?.user.id) {
        dispatch(fetchUserByUserId(authSession?.user.id));
      }
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.profileBackgroundContainer({ topSafeAreaInset })}>
        <View style={styles.profileBodyContainer}>
          <View style={styles.profilePictureContainer}>
            <TouchableHighlight style={[styles.profileImgContainer]}>
              <Image
                source={{
                  uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e0ea4e74-8e44-4e0e-9c55-eb7b22916821/d6f4or1-45193032-1b07-4bdb-b533-065e334250f4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UwZWE0ZTc0LThlNDQtNGUwZS05YzU1LWViN2IyMjkxNjgyMVwvZDZmNG9yMS00NTE5MzAzMi0xYjA3LTRiZGItYjUzMy0wNjVlMzM0MjUwZjQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hLohtHQPmPQn43i9gwHYpVVGh7GJAXQdShQS7qCcOHs",
                }}
                style={styles.profileImg}
              />
            </TouchableHighlight>
          </View>

          <View style={styles.userIdContainer}>
            <Text weight="bold" fontSize={24}>
              GamerGuy01
            </Text>
            <Text>"Ha, you can't defeat me!"</Text>
            <Text>£{userDetails.balance || 0}</Text>
          </View>

          <Button onPress={addMoney} text="Add £20" variant="solid" />

          <Text>My Decks</Text>

          <View style={styles.decksContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <DeckButton
                onDeckButtonPress={onDeckButtonPress}
                title="Unorganized"
              ></DeckButton>
              <DeckButton
                onDeckButtonPress={onDeckButtonPress}
                title="Fire"
              ></DeckButton>
              <DeckButton
                onDeckButtonPress={onDeckButtonPress}
                title="Electric"
              ></DeckButton>
              <DeckButton
                onDeckButtonPress={onDeckButtonPress}
                title="Bad deck"
              ></DeckButton>
              <DeckButton
                onDeckButtonPress={onDeckButtonPress}
                title="Unbeatable"
              ></DeckButton>
              <DeckButton
                onDeckButtonPress={onDeckButtonPress}
                title="New Deck"
              ></DeckButton>
            </ScrollView>
          </View>

          <Button
            onPress={handleSignOut}
            text="Sign Out"
            variant="solid"
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  profileBackgroundContainer: ({ topSafeAreaInset }) => ({
    flex: 1,
    backgroundColor: theme.colors.yellow,
    position: "relative",
    paddingTop: topSafeAreaInset,
  }),
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
