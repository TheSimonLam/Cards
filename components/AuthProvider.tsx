import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export const AuthProvider = ({ children }: any) => {
  const { retrieveAuthSessionFromStorage } = useAuth();

  useEffect(() => {
    (async () => {
      retrieveAuthSessionFromStorage();
    })();
  }, []);

  return <>{children}</>;
};
