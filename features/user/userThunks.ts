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

export const fetchAddUserMoney = createAsyncThunk(
  'user/fetchAddUserMoney',
  async ({email, amount, userId = ''}: {email: string, amount: number, userId: string | undefined}, thunkAPI) => {
      const { data, error } = await supabase.functions.invoke('add-user-balance', {
        body: JSON.stringify({ data: {email, amount} })
      })

      if(error){
        return undefined
      }
      else
      {
        thunkAPI.dispatch(fetchUserByUserId(userId))
        return data?.data[0]
      }
  },
)

export const fetchBuyPack = createAsyncThunk(
  'user/fetchBuyPack',
  async ({packId, userId = ''}: {packId: string, userId: string | undefined}, thunkAPI) => {
      const { data, error } = await supabase.functions.invoke('buy-pack', {
        body: JSON.stringify({ packId })
      })

      if(error){
        return undefined
      }
      else
      {
        thunkAPI.dispatch(fetchUserByUserId(userId))
        return data
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