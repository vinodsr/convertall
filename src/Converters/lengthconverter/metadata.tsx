import { ConverterMeta } from "@src/Interfaces/ConverterMeta";
import LengthConverter from "./LengthConverter";

export const LengthConverterMeta: ConverterMeta = {
  converterKey: "lc",
  name: "Length Converter",
  ascentColor: "#1B4965",
  description: "Universal Length Converter",
  category: "Unit_Converter",
  tags: [],
  component: LengthConverter,
};
