import { selectDeckCards } from "@/features/global/globalSlice";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { CardListItem } from "../CardListItem";

export const DeckViewer = () => {
    const cards = useSelector(selectDeckCards);

  return (
    <>
      <FlatList
        data={cards}
        renderItem={({ item: card, index }) => <CardListItem card={card} index={index}/>}
        keyExtractor={(deckCardMetaDataId, index) =>
          `${deckCardMetaDataId}-${index}`
        }
      />
    </>
  );
};
