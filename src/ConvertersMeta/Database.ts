import Base64Decoder from "@src/Components/Converters/base64decode/Base64Decoder";
import Base64Encoder from "@src/Components/Converters/base64encode/Base64Encoder";
import { ConverterProps } from "@src/Interfaces/ConverterProps";
import UpperCase from "@src/Components/Converters/uppercase/UpperCase";
import { ConverterMeta } from "@src/Interfaces/ConverterMeta";
import BcryptConverter from "@src/Components/Converters/bcrypt/BcryptConverter";

/**
 * Create the Converter Meta structure
 * @param converterKey Converter key
 * @param name name of the converter
 * @param color Color for title
 * @param description Description
 * @param tags Tags for searching
 * @param component Component reference
 * @returns
 */
const buildInfo = (
  converterKey: string,
  name: string,
  color: string,
  description: string,
  tags: string[],
  component: React.FC<ConverterProps>
): ConverterMeta => {
  return { converterKey, name, color, description, tags, component };
};

/**
 * Converters List
 */
export const ConverterList: ConverterMeta[] = [
  buildInfo(
    "be",
    "Base64 encoder",
    "red",
    "This is a enoder",
    [],
    Base64Encoder
  ),
  buildInfo(
    "bd",
    "Base64 decoder",
    "green",
    "This is a decoder",
    [],
    Base64Decoder
  ),
  buildInfo(
    "uc",
    "Uppercase Converter",
    "black",
    "This is a upper case converter",
    [],
    UpperCase
  ),
  buildInfo(
    "bc",
    "Bcrypt Generator",
    "#2E294E",
    "This is a Bcrypt Generator",
    [],
    BcryptConverter
  ),
];
