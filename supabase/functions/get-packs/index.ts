import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const supUrl = Deno.env.get ("PUBLIC_SUPABASE_URL") as string;
  const supKey = Deno.env.get ("PUBLIC_ANON_KEY") as string;
  const supabase = createClient(supUrl, supKey, {
    global: {
      headers: { Authorization: req.headers.get('Authorization')! },
    },
  });

  const { data, error } = await supabase
  .from('packs')
  .select('*')

  console.log(error);

  if (error) {
    return new Response('get-packs error', { status: 500 })
  }

  return new Response(
    JSON.stringify({data}),
    { headers: { "Content-Type": "application/json" } },
  )
})
