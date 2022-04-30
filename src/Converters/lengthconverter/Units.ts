export interface Unit {
  name: string;
  code: string;
  factor: number;
}

export const Units: Record<string, Unit> = {
  mm: {
    name: 'Millimetre',
    code: 'mm',
    factor: 1,
  },
  cm: {
    name: 'Centimetre',
    code: 'cm',
    factor: 10,
  },
  m: {
    name: 'Metre',
    code: 'm',
    factor: 1000,
  },
  km: {
    name: 'Kilometre',
    code: 'km',
    factor: 1000000,
  },
  microm: {
    name: 'Micrometre',
    code: 'microm',
    factor: 0.001,
  },
  nanom: {
    name: 'Nanometre',
    code: 'nanom',
    factor: 0.000001,
  },
  // TODO: Find better approaches for other unit transformation
  /*mile: {
    name: 'Mile',
    code: 'mile',
    factor: 0.0000006213711922,
  },
  yard: {
    name: 'Yard',
    code: 'yard',
    factor: 0.00109361,
  },
  foot: {
    name: 'Foot',
    code: 'foot',
    factor: 0.00328084,
  },
  inch: {
    name: 'Inch',
    code: 'inch',
    factor: 0.03937008,
  },
  nmile: {
    name: 'Nautical Mile',
    code: 'nmile',
    factor: 0.00000053996,
  },*/
};
