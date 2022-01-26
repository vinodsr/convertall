import { ConverterMeta } from "@src/Interfaces/ConverterMeta";
import Base64Decoder from "./Base64Decoder";

export const Base64DecoderMeta: ConverterMeta = {
  converterKey: "bd",
  name: "Base64 decoder",
  ascentColor: "red",
  description: "This is a decoder",
  category: "Encoder_Decoder",
  tags: [],
  component: Base64Decoder,
};
