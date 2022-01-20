import { ConverterProps } from "@src/Interfaces/ConverterProps";
import ConverterCard from "@src/Components/ConverterBase/ConverterCard";
import { Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

function Base64EncoderSettings(props: { errors: any; control: any }) {
  const { errors, control } = props;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Controller
          name="steps"
          control={control}
          rules={{
            required: true,
            min: 1,
            max: 3,
          }}
          defaultValue={1}
          render={({ field: { onChange, ...rest } }) => (
            <TextField
              onChange={(event) => {
                onChange(parseInt(event.currentTarget.value, 10));
              }}
              type="number"
              label="Steps for encoding"
              {...rest}
            />
          )}
        />
      </Grid>
      {errors.steps && (
        <Grid item>
          {errors.steps?.type === "required" && "Steps is required"}
          {errors.steps?.type === "min" && "Steps should be >= 1"}
          {errors.steps?.type === "max" && "Steps should be <=3"}
        </Grid>
      )}
    </Grid>
  );
}

interface SettingsInterface extends Record<string, any> {
  steps: Number;
}

export default function Base64Encoder(props: ConverterProps) {
  // default settings
  const [setting, setSetting] = useState<SettingsInterface>({ steps: 1 });
  const DEFAULT_SETTINGS = setting;

  useEffect(() => {
    if (props && props.settingArr && props.settingArr?.length > 0) {
      DEFAULT_SETTINGS.steps = parseInt(props.settingArr[0]);
    }
    setSetting({ ...DEFAULT_SETTINGS });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  let base64Encoded = props.text;
  for (let i = 0; i < setting.steps; i++) {
    base64Encoded = Buffer.from(base64Encoded).toString("base64");
  }

  /**
   * Settings update handler
   *
   * @param {Record<string, any>} setting
   */
  const onSettingsUpdate = (setting: Record<string, any>) => {
    setSetting(setting as SettingsInterface);
    const settingsArr: string[] = [];
    settingsArr.push(setting.steps.toString());
    props?.onSettingsUpdate && props?.onSettingsUpdate(settingsArr);
  };

  return (
    <ConverterCard
      text={base64Encoded}
      title={`Base64 encoder ${
        setting.steps > 1 ? `(${setting.steps} steps)` : ""
      }`}
      converterId={props.converterId}
      converterKey={props.converterKey}
      color={props.color}
      onClose={props.onClose}
      settings={setting}
      onSettingsUpdate={onSettingsUpdate}
      settingsComponent={Base64EncoderSettings}
      helpText={props.helpText}
    />
  );
}
