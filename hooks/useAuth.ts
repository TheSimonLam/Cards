import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  setAuthIsLoading,
  setAuthSession,
} from "@/app/features/global/globalSlice";
import { getStorageItem, setStorageItem } from "./setStorageItem";

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Get a previously stored auth session
    (async () => {
      const localStorageAuthSession = await getStorageItem("auth-session");
      dispatch(setAuthSession(localStorageAuthSession));
    })();
  }, []);

  const signIn = async () => {
    dispatch(setAuthIsLoading(true));
    const authSession = "yolo"; // TODO: This is where we'd fetch a new token
    await setStorageItem("auth-session", authSession);
    dispatch(setAuthSession(authSession));
    dispatch(setAuthIsLoading(false));
  };

  const signOut = async () => {
    dispatch(setAuthIsLoading(true));
    await setStorageItem("auth-session", null);
    dispatch(setAuthSession(null));
    dispatch(setAuthIsLoading(false));
  };

  return { signIn, signOut };
};
