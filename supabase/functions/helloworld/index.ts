import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

const supUrl = Deno.env.get ("PUBLIC_SUPABASE_URL") as string;
const supKey = Deno.env.get ("PUBLIC_ANON_KEY") as string;
const supabase = createClient(supUrl, supKey);

Deno.serve(async (req) => {
  let { data: users, error } = await supabase
  .from('users')
  .select('*')
  
  const { name } = await req.json()
  const data = {
    message: `Hello ${name}!`,
  }

  return new Response(
    JSON.stringify({data, users}),
    { headers: { "Content-Type": "application/json" } },
  )
})
