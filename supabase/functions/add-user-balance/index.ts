import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

const supUrl = Deno.env.get ("PUBLIC_SUPABASE_URL") as string;
const supKey = Deno.env.get ("PUBLIC_ANON_KEY") as string;
const supabase = createClient(supUrl, supKey);

// TODO: This all needs to be finished and tested

Deno.serve(async (req) => {
  const stripeData = await req.json()
  const stripeUsername = stripeData.data.username // TODO: Not sure what we get back from Stripe yet
  const amountToAdd = 500

  const { userData, balanceError } = await supabase
  .from('users')
  .select('balance', 'user_id')
  .eq('username', stripeUsername)

  const { _data, error } = await supabase
  .from('users')
  .update({ balance: userData.data.balance += amountToAdd })
  .eq('username', stripeUsername)
  .select()

  if(!error && !balanceError){
    const { error } = await supabase
    .from('transactions')
    .insert([
      { user_id: userData.data.user_id, action: 'Adding to balance from Stripe purchase', amount: amountToAdd },
    ])
    .select()
  }

  console.log(error)
  console.log(balanceError)

  return new Response(
    error || balanceError ? 'error!' : 'success!',
    { headers: { "Content-Type": "application/json" } },
  )
})
