import { Button } from "@/elements/Button";
import { Text } from "@/elements/Text";
import { selectDeckCardList } from "@/features/cards/cardsSlice";
import { setCardViewerOpenWithCards } from "@/features/global/globalSlice";
import { AppDispatch } from "@/features/store";
import { FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const DeckViewer = () => {
  const deckCardList = useSelector(selectDeckCardList);
  const dispatch = useDispatch<AppDispatch>();

  const onCardPress = (pressedCardMetaDataId) => {
    //TODO: Use deckCardList to fetch ALL card meta data, sort by pressedCardMetaDataId, put into the below dispatch
    dispatch(setCardViewerOpenWithCards([]));
  };

  return (
    <>
      <FlatList
        data={deckCardList}
        renderItem={({ item: deckCardMetaDataId }) => (
          <Button
            onPress={() => {
              onCardPress(deckCardMetaDataId);
            }}
            text={deckCardMetaDataId}
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
