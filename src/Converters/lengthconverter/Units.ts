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
    factor: 10, // how much of the 1 unit in mm
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
  foot: {
    name: 'Foot',
    code: 'foot',
    factor: 304.8,
  },
  mile: {
    name: 'Mile',
    code: 'mile',
    factor: 1609000,
  },
  yard: {
    name: 'Yard',
    code: 'yard',
    factor: 914.4,
  },

  inch: {
    name: 'Inch',
    code: 'inch',
    factor: 25.4,
  },
  nmile: {
    name: 'Nautical Mile',
    code: 'nmile',
    factor: 1852000,
  },
};
