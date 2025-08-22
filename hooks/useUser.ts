import { AppDispatch } from "@/features/store";
import { useDispatch } from "react-redux";

export const useInitUserPreferences = () => {
  const dispatch = useDispatch<AppDispatch>();

  const initUserPrefs = async () => {
    // Use local storage to set user preferences here
  };

  return { initUserPrefs };
};