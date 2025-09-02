import { Slot, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { store } from "../features/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import "../styling/unistyles";

import "react-native-url-polyfill/auto";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/services/supabase";
import { AuthContext } from "@/providers/AuthProvider";
import { useInitUserPreferences } from "@/hooks/useUser";
import { FullScreenModal } from "@/components/modals/FullScreenModal";
import { DeckViewer } from "@/components/modals/DeckViewer";
import {
  selectCardViewerOpenWithCards,
  selectDeckViewerOpenWithDeckId,
  setCardViewerOpenWithCards,
  setDeckViewerOpenWithDeckId,
} from "@/features/global/globalSlice";
import { CardViewer } from "@/components/modals/CardViewer";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 300,
  fade: true,
});

const InitialLayout = () => {
  const [session, setSession] = useState<Session | null>(null);
  const segments = useSegments();
  const router = useRouter();
  const [appReady, setAppReady] = useState(false);
  const { initUserPrefs } = useInitUserPreferences();
  const dispatch = useDispatch();
  const isDeckViewerModalVisible = useSelector(selectDeckViewerOpenWithDeckId);
  const isCardViewerModalVisible = useSelector(selectCardViewerOpenWithCards);

  const onCloseDeckViewerModal = () => {
    dispatch(setDeckViewerOpenWithDeckId(""));
  };

  const onCloseCardViewerModal = () => {
    dispatch(setCardViewerOpenWithCards([]));
  };

  useEffect(function initApp() {
    (async () => {
      await initUserPrefs();
      setAppReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!appReady) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange(async (_event, session) => {
      const inTabsGroup = segments[0] === "(tabs)";

      setSession(session);
      if (session && !inTabsGroup) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }

      // if ("PASSWORD_RECOVERY") {
      //redirect to password "reset" screen with path param as flag and:
      // }
    });
  }, [appReady]);

  return (
    <AuthContext.Provider value={session}>
      <Slot />
      <FullScreenModal
        isModalVisible={!!isDeckViewerModalVisible}
        onClosePress={onCloseDeckViewerModal}
      >
        <DeckViewer />
      </FullScreenModal>
      <FullScreenModal
        isModalVisible={isCardViewerModalVisible.length > 0}
        onClosePress={onCloseCardViewerModal}
      >
        <CardViewer />
      </FullScreenModal>
    </AuthContext.Provider>
  );
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
