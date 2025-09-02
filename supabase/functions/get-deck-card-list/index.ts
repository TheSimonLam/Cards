import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

// TODO: Protect this so that if a user is requesting their own info, show it all.
// Otherwise, filter it to show only public things

Deno.serve(async (req) => {
  const { deckId } = await req.json()

  const supUrl = Deno.env.get ("PUBLIC_SUPABASE_URL") as string;
  const supKey = Deno.env.get ("PUBLIC_ANON_KEY") as string;
  const supabase = createClient(supUrl, supKey, {
    global: {
      headers: { Authorization: req.headers.get('Authorization')! },
    },
  });

  const { data, error } = await supabase
  .from('card_deck_ownership')
  .select('*')
  .eq('deck_id', deckId)

  console.log(error);

  const sanitisedRes = data.map(card => card.card_metadata_id);

  if (error) {
    return new Response('get-deck-card-list error', { status: 500 })
  }

  return new Response(
    JSON.stringify({data: sanitisedRes}),
    { headers: { "Content-Type": "application/json" } },
  )
})
