import { supabase } from "@/services/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPacks = createAsyncThunk(
    'user/fetchPacks',
    async () => {
        const { data, error } = await supabase.functions.invoke('get-packs')

        if(error){
          return undefined
        }
        else
        {
          return data?.data
        }
    },
)

//TODO: Not written the edge function yet:
export const fetchDeckById = createAsyncThunk(
    'user/fetchPacks',
    async (deckId: string) => {
        const { data, error } = await supabase.functions.invoke('get-packs', {
          body: JSON.stringify({ deckId })
        })

        if(error){
          return undefined
        }
        else
        {
          return data?.data
        }
    },
)