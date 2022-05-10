import { ConverterProps } from '@src/Interfaces/ConverterProps';
import ConverterCard from '@src/Components/ConverterBase/ConverterCard';
import {
  Alert,
  Chip,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { toNumber } from 'lodash';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ConvertUnit } from './ConvertUnit';
import { Units } from './Units';
import { NotificationContext } from '@src/Contexts/Notification.Context';

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
      <Grid item xs={12} style={{ paddingTop: 10 }}>
        <Controller
          name='round'
          control={control}
          rules={{
            required: true,
            min: 0,
            max: 10,
          }}
          defaultValue={1}
          render={({ field: { onChange, ...rest } }) => (
            <TextField
              onChange={(event) => {
                onChange(parseInt(event.currentTarget.value, 10));
              }}
              type='number'
              label='Round to decimals'
              {...rest}
            />
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
      {errors.round && (
        <Grid item>
          {errors.round?.type === 'required' && 'Rounding units is required'}
          {errors.round?.type === 'min' && 'Rounding units  should be >= 0'}
          {errors.round?.type === 'max' && 'Rounding units  should be <=10'}
        </Grid>
      )}
    </Grid>
  );
}

interface SettingsInterface extends Record<string, any> {
  source: string;
  target: string;
  round: number;
}

export default function LengthConverter(props: ConverterProps) {
  // Notification context
  const { setNotification } = useContext(NotificationContext);
  // default settings
  const [setting, setSetting] = useState<SettingsInterface>({
    source: 'cm',
    target: 'm',
    round: 4,
  });
  const DEFAULT_SETTINGS = setting;

  useEffect(() => {
    if (props && props.settingArr && props.settingArr?.length > 0) {
      DEFAULT_SETTINGS.source = props.settingArr[0];
      DEFAULT_SETTINGS.target = props.settingArr[1];
      DEFAULT_SETTINGS.round = parseInt(props.settingArr[2] || '4');
    }
    setSetting({ ...DEFAULT_SETTINGS });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const numberValue = toNumber(props.text);
  const targetValue = ConvertUnit(
    numberValue,
    DEFAULT_SETTINGS.source,
    DEFAULT_SETTINGS.target,
    DEFAULT_SETTINGS.round
  ).toString();
  const convertedValue = isNaN(numberValue) ? (
    <Alert severity='warning'>Not a valid number</Alert>
  ) : (
    <>
      <Chip label={numberValue} color='primary' />{' '}
      <Typography variant='subtitle2' gutterBottom component='span'>
        {Units[DEFAULT_SETTINGS.source].name}
      </Typography>
      <ArrowForwardIcon
        style={{
          paddingTop: '0.4em',
          width: '1.5em',
        }}
      />
      <Chip label={targetValue} color='success' />{' '}
      <Typography variant='subtitle2' gutterBottom component='span'>
        {Units[DEFAULT_SETTINGS.target].name}
      </Typography>
    </>
  );

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
    settingsArr.push(setting.round.toString());
    props?.onSettingsUpdate && props?.onSettingsUpdate(settingsArr);
  };

  return (
    <ConverterCard
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
      onCopy={async () => {
        await navigator.clipboard.writeText(targetValue);
        setNotification({
          message: 'Copied !',
          variant: 'success',
        });
      }}
    />
  );
}
