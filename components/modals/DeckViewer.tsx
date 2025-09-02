import { Text } from "@/elements/Text";
import { selectDeckCardList } from "@/features/cards/cardsSlice";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

export const DeckViewer = () => {
  const deckCardList = useSelector(selectDeckCardList);
  return (
    <>
      <FlatList
        data={deckCardList}
        renderItem={({item: deckCard}) => <Text>{deckCard}</Text>}
        keyExtractor={(deckCard, index) => `${deckCard}-${index}`}
      />
    </>
  );
};
