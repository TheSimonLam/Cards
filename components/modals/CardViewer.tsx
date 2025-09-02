import { Text } from "@/elements/Text";
import { selectCardViewerOpenWithCards } from "@/features/global/globalSlice";
import { useSelector } from "react-redux";
import { CardRarityMapper } from "@/constants/Global";
import { View } from "react-native";

export const CardViewer = () => {
  const cards = useSelector(selectCardViewerOpenWithCards);
  return (
    <>
      {cards.map((card, index) => (
        <View key={`${index}-${card.card_metadata_id}`}>
          <Text>{card.name}</Text>
          <Text>{CardRarityMapper[card.rarity]}</Text>
        </View>
      ))}
    </>
  );
};
