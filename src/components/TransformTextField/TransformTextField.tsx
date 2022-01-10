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
  let onChangeTimeout: any = null;
  /**
   * Trigger text change
   *
   * Will do a timeout for 150 to prevent processing brust
   *
   * @param {string} text
   */
  const triggerOnchange = (text: string) => {
    if (onChangeTimeout !== null) {
      clearTimeout(onChangeTimeout);
    }
    onChangeTimeout = setTimeout(() => {
      props.onChange(text);
    }, 150);
  };

  return (
    <TextField
      id="text"
      label="Text to transform"
      variant="outlined"
      sx={{ width: 3 / 4 }}
      autoFocus
      multiline={true}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        triggerOnchange(event.currentTarget.value);
      }}
    />
  );
}
