import { ConverterProps } from "@src/Interfaces/ConverterProps";
import ConverterCard from "@src/components/ConverterBase/ConverterCard";
import { Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";

function BcryptSettings(props: { errors: any; control: any }) {
  const { errors, control } = props;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Controller
          name="rounds"
          control={control}
          rules={{
            required: true,
            min: 1,
            max: 20,
          }}
          defaultValue={1}
          render={({ field: { onChange, ...rest } }) => (
            <TextField
              onChange={(event) => {
                onChange(parseInt(event.currentTarget.value, 10));
              }}
              type="number"
              label="Rounds for encryption"
              {...rest}
            />
          )}
        />
      </Grid>
      {errors.rounds && (
        <Grid item>
          {errors.rounds?.type === "required" && "Rounds is required"}
          {errors.rounds?.type === "min" && "Rounds should be >= 1"}
          {errors.rounds?.type === "max" && "Rounds should be <=20"}
        </Grid>
      )}
    </Grid>
  );
}

interface SettingsInterface extends Record<string, any> {
  rounds: number;
}

export default function BcryptConverter(props: ConverterProps) {
  // default settings
  const [setting, setSetting] = useState<SettingsInterface>({ rounds: 1 });
  const DEFAULT_SETTINGS = setting;
  const [bcryptedText, setBcryptedText] = useState<string>("");
  const [previousProcessId, setPreviousProcessId] = useState<number>(0);
  const [cancelList, setCancelList] = useState<number[]>([]);

  useEffect(() => {
    const encrypt = function () {
      try {
        const inputText = props.text;
        const processId = new Date().getTime();

        setCancelList((cancelList) => {
          cancelList.push(previousProcessId);
          return cancelList;
        });
        setPreviousProcessId(processId);
        setBcryptedText("Calculating ...");
        bcrypt.hash(
          inputText,
          setting.rounds,
          (err, bcrypted) => {
            setBcryptedText(bcrypted);
            console.log("enc", bcrypted);
          },
          function (progress) {
            setBcryptedText(
              "Calculating ... " + (progress * 100).toFixed(0) + " %"
            );

            if (cancelList.includes(processId)) {
              // eslint-disable-next-line no-throw-literal
              throw {};
            }
          }
        );
      } catch (e) {}
    };

    if (props && props.settingArr && props.settingArr?.length > 0) {
      DEFAULT_SETTINGS.rounds = parseInt(props.settingArr[0]);
    }
    setSetting({ ...DEFAULT_SETTINGS });
    try {
      if (props.text.trim().length > 0) {
        encrypt();
      }
    } catch (e) {}

    //TODO: find a better approach
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  /**
   * Settings update handler
   *
   * @param {Record<string, any>} setting
   */
  const onSettingsUpdate = (setting: Record<string, any>) => {
    setSetting(setting as SettingsInterface);
    const settingsArr: string[] = [];
    settingsArr.push(setting.rounds.toString());
    props?.onSettingsUpdate && props?.onSettingsUpdate(settingsArr);
  };

  return (
    <ConverterCard
      text={bcryptedText}
      title={`Bcrypt generator ${
        setting.rounds > 0 ? `(${setting.rounds} rounds)` : ""
      }`}
      converterId={props.converterId}
      converterKey={props.converterKey}
      color={props.color}
      onClose={props.onClose}
      settings={setting}
      onSettingsUpdate={onSettingsUpdate}
      settingsComponent={BcryptSettings}
      helpText={props.helpText}
    />
  );
}
