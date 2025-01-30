import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserByUsername = createAsyncThunk(
    'user/fetchUserByUsername',
    async ({username, authToken}: any) => {
        const res = await fetch("https://ktsqgredolnfrexmgfjk.supabase.co/functions/v1/get-user", {
          method: "post",
          headers: new Headers({
            'Authorization': `Bearer ${authToken}`,
          }), 
          body: JSON.stringify({ username }),
        });
        return await res.json()
    },
  )