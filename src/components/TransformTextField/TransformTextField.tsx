import { TextField } from "@mui/material";
/**
 * Props for transform text field
 *
 * @interface TransformTextFieldProps
 */
interface TransformTextFieldProps {
  onChange: (text: string) => void;
  text: string;
}

/**
 * Component to accept the transform text
 */
export default function TransformTextField(props: TransformTextFieldProps) {
  return (
    <TextField
      id="text"
      label="Text to transform"
      variant="outlined"
      sx={{ width: 3 / 4 }}
      value={props.text}
      autoFocus
      multiline={true}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.currentTarget.value);
      }}
    />
  );
}
