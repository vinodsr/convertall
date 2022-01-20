import { ConverterMeta } from "@src/Interfaces/ConverterMeta";
import Base64Encoder from "./Base64Encoder";

export const Base64EncoderMeta: ConverterMeta = {
  converterKey: "be",
  name: "Base64 encoder",
  ascentColor: "green",
  description: "This is a encoder",
  tags: [],
  component: Base64Encoder,
};
