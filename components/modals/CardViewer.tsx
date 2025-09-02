import { Text } from "@/elements/Text";
import { selectCardViewerOpenWithCards } from "@/features/global/globalSlice";
import { useSelector } from "react-redux";

export const CardViewer = () => {
  const cards = useSelector(selectCardViewerOpenWithCards);
  return (
    <>
      {cards.map((card: any) => (
        <Text>You are viewing {card}</Text>
      ))}
    </>
  );
};
