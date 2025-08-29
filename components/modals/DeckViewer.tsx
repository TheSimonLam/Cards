import { Text } from "@/elements/Text";
import { selectDeckViewerOpenWithDeckId } from "@/features/global/globalSlice";
import { useSelector } from "react-redux";

export const DeckViewer = () => {
  const deckId = useSelector(selectDeckViewerOpenWithDeckId)
  return <>
  <Text>You are viewing deckId {deckId}</Text></>;
};
