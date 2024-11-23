# Welcome to Cards 👋

A side-project that allows users to buy packs of cards using earned in-game credits.
You can collect, battle with, and trade cards with other players.

- Perhaps consider PocketBase (Firebase even?)
- Players can only trade cards locally when next to each other (using Bluetooth, GPS, and other forms to verify proximity)
- Players can battle each other to gain credits/and XP?
- Players can buy and open packs of cards that can contain rare cards
- Players will be able to see a global leaderboard
- Players can earn credits by completing daily tasks/watching ads etc that can help with generating revenue
- Opening packs of cards will always have a wow factor, and cards must look amazing/feel special and rare

Tech used:
Auth (Firebase/Clerk/Supabase)
Supabase realtime subscription channels for games
Firestore for Document/Collection database

Card Rarity
Common
Uncommon
Rare
Ultra Rare
Epic
Legendary
One of One

Note:

- Upon opening the app, re-download the entire cards database to use as metadata.
- Maybe need a card opening server to securely randomise the opening of cards, and read/update the cards and decks collection database
