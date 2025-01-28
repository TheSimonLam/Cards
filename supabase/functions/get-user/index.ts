import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

const supUrl = Deno.env.get ("PUBLIC_SUPABASE_URL") as string;
const supKey = Deno.env.get ("PUBLIC_ANON_KEY") as string;
const supabase = createClient(supUrl, supKey);

// TODO: Protect this so that if a user is requesting their own info, show it all.
// Otherwise, filter it to show only public things

Deno.serve(async (req) => {
  const { username } = await req.json()

  const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('username', username)

  console.log(error);

  return new Response(
    JSON.stringify({data}),
    { headers: { "Content-Type": "application/json" } },
  )
})
