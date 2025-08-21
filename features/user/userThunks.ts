import { supabase } from "@/services/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserByUserId = createAsyncThunk(
    'user/fetchUserByUserId',
    async (userId: string) => {
        const { data, error } = await supabase.functions.invoke('get-user', {
          body: JSON.stringify({ userId })
        })

        if(error){
          return undefined
        }
        else
        {
          return data?.data[0]
        }
    },
  )