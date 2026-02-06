import { dictionaryIndex } from "@/data/dictionary";

export function lookupSymbol(symbol: string) {
  const key = symbol.trim();
  return dictionaryIndex[key];
}
