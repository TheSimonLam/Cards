# Welcome to Cards 👋

A side-project that allows users to buy packs of cards using earned in-game credits.
You can collect, battle with, and trade cards with other players.

- Players can only trade cards locally when next to each other (using Bluetooth, GPS, and other forms to verify proximity)
- Players can battle each other to gain credits/and XP?
- Players can buy and open packs of cards that can contain rare cards
- Players will be able to see a global leaderboard
- Players can earn credits by completing daily tasks/watching ads etc that can help with generating revenue
- Opening packs of cards will always have a wow factor, and cards must look amazing/feel special and rare
- Use Supabase broadcast for gameplay (perhaps we need to host game logic on a server to stop cheating)

Tech used:
Auth (Firebase/Clerk/Supabase)
Supabase realtime subscription channels for games
Firestore for Document/Collection database

Card Rarity
1 Common
2 Uncommon
3 Rare
4 Ultra Rare
5 Epic
6 Legendary
7 One of One

Note:

- Maybe need a card opening server to securely randomize the opening of cards, and read/update the cards and decks collection database
- On init of the app, check to see if the downloaded cards (in local storage) version is out of date. If it is, make a call to download all of the cards and store them, along with the new version number, in local storage.

Database notes:

- Users will have an "Unorganized" deck where all packs will go. There is no card limit in this one, and the player cannot use it to play games. Players must make a custom deck in order to play a game with it.

How to create new Supabase Edge Function:
`npx supabase functions new my-function`
(Dont forget to deploy it after)

How to update Edge function with changes:
`npx supabase functions deploy my-function`

How to set secrets/.env file:
`npx supabase secrets set --env-file ./supabase/.env`

Clerk takes a (secret) JWT Signing Key from Supabase that's used to generate a JWT to plug into request Authorization header. Edge Functions have JWT protection enabled and will automatically authenticate the call.

Clerk webhooks need an Authorization header using the public Supabase JWT

RLS is needed so users can only edit their own information

Data design:
https://dbdiagram.io/d/Cards-678e73846b7fa355c3762f2d

Remember to test all inputs for error handling.

Don't let users change username

TODO:

- If a user is requesting a user other than themselves, filter out private properties
- Secure tables with RLS incase somebody gets their hands on the SUPABASE_ANON_KEY
- On the Buy page allow the user to purchase packs
- Let the user swipe to open an pack and show them the cards they got
