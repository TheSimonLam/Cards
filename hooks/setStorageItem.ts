import * as SecureStore from "expo-secure-store";

export const getStorageItem = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

export const setStorageItem = async (key: string, value: string | null) => {
  if (value == null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};
