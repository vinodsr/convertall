import { ConverterMeta } from "@src/Interfaces/ConverterMeta";
import BcryptConverter from "./BcryptConverter";

export const BcryptConverterMeta: ConverterMeta = {
  converterKey: "bc",
  name: "Bcrypt Generator",
  ascentColor: "#2E294E",
  description: "This is a Bcrypt Generator",
  category: "Encyrption",
  tags: [],
  component: BcryptConverter,
};
