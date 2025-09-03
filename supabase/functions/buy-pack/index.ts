import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

// TODO: Protect this so that if a user is requesting their own info, show it all.
// Otherwise, filter it to show only public things

function pickCard(cards) {
  const totalWeight = cards.reduce((sum, card) => sum + card.drop_chance_percentage, 0);
  const rand = Math.random() * totalWeight;
  let cumulative = 0;

  for (const card of cards) {
    cumulative += card.drop_chance_percentage;
    if (rand < cumulative) {
      return card;
    }
  }
}

function getThreeRandomCards(cards) {
  const selected = [];
  let availableCards = [...cards];

  for (let i = 0; i < 3; i++) {
    const picked = pickCard(availableCards);
    selected.push(picked);
    availableCards = availableCards.filter(card => card.name !== picked.name);
  }

  return selected;
}

Deno.serve(async (req) => {
  const { packId } = await req.json()

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

  const { data: packData, error: packsDataError } = await supabase
  .from('packs')
  .select('*')
  .eq('pack_id', packId)

  const { data: userData, error: userDataError } = await supabase
  .from('profiles')
  .select('*')
  .eq('user_id', userId)

  const pack = packData[0]
  const profile = userData[0]

  // TODO: add the max_allowed_open_packs vs num_packs_opened check

  if(profile.balance && (profile.balance - pack.cost >= 0)){
    const { data: cardsData, error: cardsDataError } = await supabase
    .from('card_metadata')
    .select('*')
    .in('card_metadata_id', [
      pack.card_metadata_id_within_1,
      pack.card_metadata_id_within_2,
      pack.card_metadata_id_within_3,
      pack.card_metadata_id_within_4,
      pack.card_metadata_id_within_5,
      pack.card_metadata_id_within_6,
      pack.card_metadata_id_within_7,
    ])

    const firstCard = cardsData[0]
    const secondCard = cardsData[1]
    const thirdCard = cardsData[2]
    const fourthCard = cardsData[3]
    const fifthCard = cardsData[4]
    const sixthCard = cardsData[5]
    const seventhCard = cardsData[6]

    //TODO: Check the card's max_allowed_in_circulation vs amount_in_circulation

    const newCards = getThreeRandomCards([firstCard, secondCard, thirdCard, fourthCard, fifthCard, sixthCard, seventhCard]);

    const { data: userDeckData, error: userDeckDataError } = await supabase
    .from('decks')
    .select('deck_id')
    .eq('owner_user_id', userId)

    const { insertCardDeckOwnershipError } = await supabase
    .from('card_deck_ownership')
    .insert([
      { deck_id: userDeckData[0].deck_id, user_id: userId, card_metadata_id: newCards[0].card_metadata_id },
      { deck_id: userDeckData[0].deck_id, user_id: userId, card_metadata_id: newCards[1].card_metadata_id },
      { deck_id: userDeckData[0].deck_id, user_id: userId, card_metadata_id: newCards[2].card_metadata_id },
    ])
    .select()

    // TODO: Add +1 to amount_in_circulation for all the new cards that have been added

    const { data: deductBalanceData, deductBalanceDataError } = await supabase
    .from('profiles')
    .update({ balance: profile.balance -= pack.cost })
    .eq('user_id', userId)
    .select()

    const { insertTransactionError } = await supabase
    .from('transactions')
    .insert([
      { user_id: userData[0].user_id, action: `Purchasing packId ${packId}. User balance should be ${profile.balance}`, amount: -pack.cost },
    ])
    .select()

    if(packsDataError || userDataError){
        return new Response('buy-pack packsDataError or UserDataError error', { status: 500 })
    }

    return new Response(
      JSON.stringify({newCards}),
      { headers: { "Content-Type": "application/json" } },
    )

  }
  else {
    return new Response('buy-pack not enough balance error', { status: 500 })
  }

})
