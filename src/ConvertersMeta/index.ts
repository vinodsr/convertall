import { ConverterMeta } from "@src/Interfaces/ConverterMeta";
import { ConverterList } from "./Database";

/**
 * Map for storing converters
 */
export const ConverterMap = ConverterList.reduce(
  (obj, component: ConverterMeta) => {
    obj[component.converterKey] = component;
    return obj;
  },
  {} as Record<string, ConverterMeta>
);

/**
 * Returns the converter using a key
 * @param converterKey Key of the converter
 * @returns
 */
export function FindConverter(converterKey: string): ConverterMeta {
  console.info("FindComponent() : getting converter with key ", converterKey);
  return ConverterMap[converterKey];
}
