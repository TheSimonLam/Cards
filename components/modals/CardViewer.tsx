import { Text } from "@/elements/Text";
import { selectCardViewerOpenWithCardIds } from "@/features/global/globalSlice";
import { useSelector } from "react-redux";

export const CardViewer = () => {
  const cardIds = useSelector(selectCardViewerOpenWithCardIds);
  return (
    <>
      <Text>You are viewing cardIds {cardIds}</Text>
    </>
  );
};
