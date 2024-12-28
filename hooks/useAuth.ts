import { useDispatch } from "react-redux";

import {
  setIsAuthLoading,
  setAuthSession,
} from "@/app/features/global/globalSlice";
import { getStorageItem, setStorageItem } from "./setStorageItem";

export const useAuth = () => {
  const dispatch = useDispatch();

  const retrieveAuthSessionFromStorage = async () => {
    const localStorageAuthSession = await getStorageItem("auth-session");
    dispatch(setAuthSession(localStorageAuthSession));
    return localStorageAuthSession;
  };

  const signIn = async () => {
    dispatch(setIsAuthLoading(true));
    const authSession = "yolo"; // TODO: This is where we'd fetch a new token
    await setStorageItem("auth-session", authSession);
    dispatch(setAuthSession(authSession));
    dispatch(setIsAuthLoading(false));
  };

  const signOut = async () => {
    dispatch(setIsAuthLoading(true));
    await setStorageItem("auth-session", null);
    dispatch(setAuthSession(null));
    dispatch(setIsAuthLoading(false));
  };

  return { retrieveAuthSessionFromStorage, signIn, signOut };
};
