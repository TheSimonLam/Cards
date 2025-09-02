import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

// TODO: Protect this so that if a user is requesting their own info, show it all.
// Otherwise, filter it to show only public things

Deno.serve(async (req) => {
  const { userId: queryUserId } = await req.json()

  const supUrl = Deno.env.get ("PUBLIC_SUPABASE_URL") as string;
  const supKey = Deno.env.get ("PUBLIC_ANON_KEY") as string;
  const supabase = createClient(supUrl, supKey, {
    global: {
      headers: { Authorization: req.headers.get('Authorization')! },
    },
  });

  const authHeader = req.headers.get('Authorization')!;
  const token = authHeader.replace('Bearer ', '');

  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.sub;

  const { data, error } = await supabase
  .from('decks')
  .select('*')
  .eq('owner_user_id', queryUserId)

  // TODO : Stop other users from viewing private decks/storage using below
  const sanitisedPacks = data

  console.log(error);

  if (error) {
    return new Response('get-decks error', { status: 500 })
  }

  return new Response(
    JSON.stringify({data: sanitisedPacks}),
    { headers: { "Content-Type": "application/json" } },
  )
})
