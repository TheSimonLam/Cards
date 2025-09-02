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

export const fetchDecksByUserId = createAsyncThunk(
    'user/fetchDecksByUserId',
    async (userId: string) => {
        const { data, error } = await supabase.functions.invoke('get-decks', {
          body: JSON.stringify({ userId })
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

export const fetchDeckById = createAsyncThunk(
    'user/fetchDeckById',
    async (deckId: string) => {
        const { data, error } = await supabase.functions.invoke('get-deck-card-list', {
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