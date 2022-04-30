import { LengthConverterMeta } from "../Converters/lengthconverter/metadata";
import { ConverterMeta } from "@src/Interfaces/ConverterMeta";
import { Base64DecoderMeta } from "@src/Converters/base64decode/metadata";
import { Base64EncoderMeta } from "@src/Converters/base64encode/metadata";
import { BcryptConverterMeta } from "@src/Converters/bcrypt/metadata";
import { UpperCaseMeta } from "@src/Converters/uppercase/metadata";

/**
 * Converters List
 */
export const ConverterList: ConverterMeta[] = [];

const buildMetadata = () => {
  // read the meta data folder
  ConverterList.push(Base64DecoderMeta);
  ConverterList.push(Base64EncoderMeta);
  ConverterList.push(BcryptConverterMeta);
  ConverterList.push(UpperCaseMeta);
  ConverterList.push(LengthConverterMeta);
};
buildMetadata();
