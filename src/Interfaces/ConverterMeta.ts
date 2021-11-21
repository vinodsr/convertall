import { ConverterProps } from "./ConverterProps";

export interface ConverterMeta {
  converterKey: string;
  name: string;
  color: string;
  description: string;
  tags: string[];
  component: React.FC<ConverterProps>;
}
