import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";

import {
  selectAuthSession,
  selectIsAuthLoading,
} from "../features/global/globalSlice";
import { useSelector } from "react-redux";

export default function AppLayout() {
  const authSession = useSelector(selectAuthSession);
  const isAuthLoading = useSelector(selectIsAuthLoading);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isAuthLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!authSession) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href={{ pathname: "/sign-in" }} />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
