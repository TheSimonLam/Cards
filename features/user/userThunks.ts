import { getClerkAuthToken } from "@/utils/getClerkAuthToken";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserByUsername = createAsyncThunk(
    'user/fetchUserByUsername',
    async (username: string) => {
        const token = await getClerkAuthToken()
        const res = await fetch("https://ktsqgredolnfrexmgfjk.supabase.co/functions/v1/get-user", {
          method: "post",
          headers: new Headers({
            'Authorization': `Bearer ${token}`,
          }), 
          body: JSON.stringify({ username }),
        });
        return await res.json()
    },
  )