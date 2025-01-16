import { useAuth } from "@clerk/clerk-expo";

export const useGetInfo = () => {
  const { getToken } = useAuth();

  const requestGetInfo = async () => {
    const token = await getToken({template: 'supabase'}) || "";

    const res = await fetch("https://ktsqgredolnfrexmgfjk.supabase.co/functions/v1/helloworld", {
      method: "post",
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
      }), 
      body: JSON.stringify({ name: "simon lam" }),
    });
    return res.json()
  };
  return { requestGetInfo };
};
