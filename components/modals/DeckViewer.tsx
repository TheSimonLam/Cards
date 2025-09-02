import { Button } from "@/elements/Button";
import { selectDeckCards, setDeckViewerOpenWithDeckId } from "@/features/global/globalSlice";
import { setCardViewerOpenWithCards } from "@/features/global/globalSlice";
import { AppDispatch } from "@/features/store";
import { reorderCardsByIndex } from "@/utils/utils";
import { FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const DeckViewer = () => {
  const cards = useSelector(selectDeckCards);
  const dispatch = useDispatch<AppDispatch>();

  const onCardPress = (pressedCardIndex: number) => {
    const reorderedCards = reorderCardsByIndex(cards, pressedCardIndex);
    dispatch(setCardViewerOpenWithCards(reorderedCards));
  };

  return (
    <>
      <FlatList
        data={cards}
        renderItem={({ item: card, index }) => (
          <Button
            onPress={() => {
              onCardPress(index);
            }}
            text={card.name}
            variant="solid"
          />
        )}
        keyExtractor={(deckCardMetaDataId, index) =>
          `${deckCardMetaDataId}-${index}`
        }
      />
    </>
  );
};
