import { ConverterProps } from "./ConverterProps";

export interface ConverterMeta {
  converterKey: string;
  name: string;
  ascentColor: string;
  description: string;
  tags: string[];
  component: React.FC<ConverterProps>;
  category: string;
}
