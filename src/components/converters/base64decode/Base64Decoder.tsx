import ConverterCard from "@src/Components/ConverterBase/ConverterCard";
import { ConverterProps } from "@src/Interfaces/ConverterProps";
export default function Base64Decoder(props: ConverterProps) {
  const text = Buffer.from(props.text, "base64").toString();
  return (
    <ConverterCard
      text={text}
      title="Base64 decoded"
      color={props.color}
      converterId={props.converterId}
      converterKey={props.converterKey}
      onClose={props.onClose}
      helpText={props.helpText}
    />
  );
}
