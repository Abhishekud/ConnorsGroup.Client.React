export const START = 'Start Day';
export const END = 'End Day';
export const ACTUAL = 'Actual Day';

export const ALL = [
  START, END, ACTUAL,
];

export const KRONOS_LABOR_HOUR_ALLOCATION_ENUM_INDEX = {
  START: 1,
  END: 2,
  ACTUAL: 3,
};

export const KRONOS_LABOR_HOUR_ALLOCATION_SELECT_OPTIONS = [
  {value: '', label: ''},
  {value: KRONOS_LABOR_HOUR_ALLOCATION_ENUM_INDEX.START, label: START},
  {value: KRONOS_LABOR_HOUR_ALLOCATION_ENUM_INDEX.END, label: END},
  {value: KRONOS_LABOR_HOUR_ALLOCATION_ENUM_INDEX.ACTUAL, label: ACTUAL},
];
