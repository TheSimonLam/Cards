import { useAuth } from "@clerk/clerk-expo";

export const useGetUser = () => {
  const { getToken } = useAuth();

  const requestGetUser = async (username: string) => {
    const token = await getToken({template: 'supabase'}) || "";

    const res = await fetch("https://ktsqgredolnfrexmgfjk.supabase.co/functions/v1/get-user", {
      method: "post",
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
      }), 
      body: JSON.stringify({ username: username }),
    });
    return res.json()
  };
  return { requestGetUser };
};
