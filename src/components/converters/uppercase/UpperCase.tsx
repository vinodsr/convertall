import { ConverterProps } from "@src/Interfaces/ConverterProps";
import ConverterCard from "@src/Components/ConverterBase/ConverterCard";

export default function UpperCase(props: ConverterProps) {
  const uppercase = props.text.toUpperCase();

  return (
    <ConverterCard
      text={uppercase}
      title="Uppercase"
      converterId={props.converterId}
      converterKey={props.converterKey}
      color={props.color}
      onClose={props.onClose}
      helpText={props.helpText}
    />
  );
}
