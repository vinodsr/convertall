import { ConverterProps } from '@src/Interfaces/ConverterProps';
import ConverterCard from '@src/Components/ConverterBase/ConverterCard';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toNumber } from 'lodash';
import { ConvertUnit } from './ConvertUnit';
import { Units } from './Units';

function LengthConverterSettings(props: { errors: any; control: any }) {
  const { errors, control } = props;
  return (
    <Grid container>
      <Grid item xs={6} style={{ paddingRight: 10 }}>
        <Controller
          name='source'
          control={control}
          rules={{
            required: true,
          }}
          defaultValue=''
          render={({ field: { ...rest } }) => (
            <TextField
              fullWidth
              variant='outlined'
              id='source'
              label='Source unit'
              select
              {...rest}
            >
              {Object.values(Units).map((unit) => {
                return (
                  <MenuItem key={unit.code} value={unit.code}>
                    {unit.name}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={6} style={{ paddingLeft: 10 }}>
        <Controller
          name='target'
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={''}
          render={({ field: { ...rest } }) => (
            <TextField
              fullWidth
              variant='outlined'
              id='target'
              label='Target unit'
              select
              {...rest}
            >
              {Object.values(Units).map((unit) => {
                return (
                  <MenuItem key={unit.code} value={unit.code}>
                    {unit.name}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        />
      </Grid>
      {errors.source && (
        <Grid item>
          {errors.source?.type === 'required' && 'Source unit is required'}
        </Grid>
      )}
      {errors.target && (
        <Grid item>
          {errors.target?.type === 'required' && 'Target unit is required'}
        </Grid>
      )}
    </Grid>
  );
}

interface SettingsInterface extends Record<string, any> {
  source: string;
  target: string;
}

export default function LengthConverter(props: ConverterProps) {
  // default settings
  const [setting, setSetting] = useState<SettingsInterface>({
    source: 'cm',
    target: 'm',
  });
  const DEFAULT_SETTINGS = setting;

  useEffect(() => {
    if (props && props.settingArr && props.settingArr?.length > 0) {
      DEFAULT_SETTINGS.source = props.settingArr[0];
      DEFAULT_SETTINGS.target = props.settingArr[1];
    }
    setSetting({ ...DEFAULT_SETTINGS });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  let convertedValue: string = '';

  //convertedValue = props.text;
  const numberValue = toNumber(props.text);
  convertedValue = isNaN(numberValue)
    ? 'Not a valid number'
    : `${numberValue} ${Units[DEFAULT_SETTINGS.source].name} = ${ConvertUnit(
        numberValue,
        DEFAULT_SETTINGS.source,
        DEFAULT_SETTINGS.target
      ).toString()}  ${Units[DEFAULT_SETTINGS.target].name}`;

  const content = (
    <Typography variant='h5' component='div' style={{ wordBreak: 'break-all' }}>
      {convertedValue}
    </Typography>
  );

  /**
   * Settings update handler
   *
   * @param {Record<string, any>} setting
   */
  const onSettingsUpdate = (setting: Record<string, any>) => {
    setSetting(setting as SettingsInterface);
    const settingsArr: string[] = [];
    settingsArr.push(setting.source.toString());
    settingsArr.push(setting.target.toString());
    props?.onSettingsUpdate && props?.onSettingsUpdate(settingsArr);
  };

  return (
    <ConverterCard
      text={convertedValue}
      content={content}
      title={`Length Converter`}
      description={`${setting.source} to ${setting.target}`}
      converterId={props.converterId}
      converterKey={props.converterKey}
      color={props.color}
      onClose={props.onClose}
      settings={setting}
      onSettingsUpdate={onSettingsUpdate}
      settingsComponent={LengthConverterSettings}
      helpText={props.helpText}
    />
  );
}
