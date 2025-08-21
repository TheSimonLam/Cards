import { Slot, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { store } from "../features/store";
import { Provider } from "react-redux";
import "../styling/unistyles";

import "react-native-url-polyfill/auto";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/services/supabase";
import { AuthContext } from "@/providers/AuthProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [session, setSession] = useState<Session | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange(async (_event, session) => {
      const inTabsGroup = segments[0] === "(tabs)";

      setSession(session);
      if (session && !inTabsGroup) {
        router.replace("/(tabs)/");
      } else {
        router.replace("/login");
      }

      // if ("PASSWORD_RECOVERY") {
      //redirect to password "reset" screen with path param as flag and:
      // }
    });
  }, []);

  return (
    <AuthContext.Provider value={session}>
      <Slot />
    </AuthContext.Provider>
  );
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <InitialLayout />
    </Provider>
  );
}
