import { ConverterMeta } from "@src/Interfaces/ConverterMeta";
import UpperCase from "./UpperCase";

export const UpperCaseMeta: ConverterMeta = {
  converterKey: "uc",
  name: "Uppercase Converter",
  ascentColor: "black",
  description: "This is a upper case converter",
  category: "Utils",
  tags: [],
  component: UpperCase,
};
