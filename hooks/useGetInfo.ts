export const useGetInfo = () => {
  const requestGetInfo = async () => {
    const res = await fetch("https://ktsqgredolnfrexmgfjk.supabase.co/functions/v1/helloworld", {
      method: "post",
      body: JSON.stringify({ name: "simon lam" }),
    });
    return res.json()
  };
  return { requestGetInfo };
};
