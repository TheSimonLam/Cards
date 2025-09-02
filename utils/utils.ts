import { Card } from "@/typing/interfaces";

export const reorderCardsByIndex = (arr: Card[], index: number) =>{
  if (index < 0 || index >= arr.length) {
    throw new Error("Invalid index");
  }
  return [...arr.slice(index), ...arr.slice(0, index)];
}