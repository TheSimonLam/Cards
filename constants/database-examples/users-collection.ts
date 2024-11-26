export const users = {
  Ninjaroni: {
    profilePic: "123-abc-def", // This is a pre-defined image users can select. A bit like in LoL. They can unlock profile pics as they go
    backgroundPic: "123-abc-def", // This is a pre-defined image users can select. A bit like in LoL. They can unlock background pics as they go
    tagLine: "You cant defeat me",
    balance: "261", // Money
    decks: [
      {
        deckName: "Unorganized", // Users will always have a main "Unorganized" deck where opened cards will go
        limit: 0,
        isPlayerMadeDeck: false,
        cards: [
          { cardId: "41d-c61-c36-6gie10", dateObtained: "1732372533" },
          { cardId: "41d-c61-c36-6gie10", dateObtained: "1732372589" },
        ],
      },
    ],
    friends: ["Uteki"],
  },
  Uteki: {
    profilePic: "123-abc-def",
    balance: "531",
    decks: [
      {
        deckName: "Unorganized",
        limit: 0,
        isPlayerMadeDeck: false,
        cards: [
          { cardId: "41d-c61-c36-6gie10", dateObtained: "1732372522" },
          { cardId: "41d-c61-c36-6gie12", dateObtained: "1732372526" },
        ],
      },
      {
        deckName: "My fire deck",
        limit: 30,
        isPlayerMadeDeck: true,
        cards: [
          { cardId: "41d-c61-c36-6gie10", dateObtained: "1732372511" },
          { cardId: "41d-c61-c36-6gie12", dateObtained: "1732372545" },
        ],
      },
    ],
    friends: ["Ninjaroni"],
  },
};
