import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

// TODO: Protect this so that if a user is requesting their own info, show it all.
// Otherwise, filter it to show only public things

Deno.serve(async (req) => {
  const supUrl = Deno.env.get ("PUBLIC_SUPABASE_URL") as string;
  const supKey = Deno.env.get ("PUBLIC_ANON_KEY") as string;
  const supabase = createClient(supUrl, supKey, {
    global: {
      headers: { Authorization: req.headers.get('Authorization')! },
    },
  });

  const stripeData = await req.json()
  const stripeEmail = stripeData.data.email // TODO: Not sure what we get back from Stripe yet but try to get their email
  const amountToAdd = stripeData.data.amount

  const { data: userData, error: balanceError } = await supabase
  .from('profiles')
  .select('*')
  .eq('email_address', stripeEmail)

  const { data, error } = await supabase
  .from('profiles')
  .update({ balance: userData[0].balance += amountToAdd })
  .eq('email_address', stripeEmail)
  .select()

  if(!error && !balanceError){
    const { error } = await supabase
    .from('transactions')
    .insert([
      { user_id: userData[0].user_id, action: 'Adding to balance from Stripe purchase', amount: amountToAdd },
    ])
    .select()
  }

  console.log(error);

  if (error) {
    return new Response('add-user-balance error', { status: 500 })
  }

    return new Response(
      error || balanceError ? 'error!' : 'success!',
      { headers: { "Content-Type": "application/json" } },
    )
})
