import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

const supUrl = Deno.env.get ("PUBLIC_SUPABASE_URL") as string;
const supKey = Deno.env.get ("PUBLIC_ANON_KEY") as string;
const supabase = createClient(supUrl, supKey);

Deno.serve(async (req) => {
  const clerkData = await req.json()
  const username = clerkData.data.username

  const { error } = await supabase
  .from('users')
  .insert([
    { username, profile_pic: '', background_pic: '', tagline: '', balance: 0 },
  ])
  .select()

  console.log(error)

  return new Response(
    error ? 'error!' : 'success!',
    { headers: { "Content-Type": "application/json" } },
  )
})
