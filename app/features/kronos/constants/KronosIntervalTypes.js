export const FIFTEEN_MINUTES = '15-Minute Interval';
export const DAY = 'Day';
export const WEEK = 'Week';

export const ALL = [
  FIFTEEN_MINUTES,
  DAY,
  WEEK,
];

export const KRONOS_INTERVAL_TYPE_ENUM_INDEX = {
  FIFTEEN_MINUTES: 1,
  DAY: 2,
  WEEK: 3,
};

export const KRONOS_INTERVAL_TYPE_SELECT_OPTIONS = [
  {value: '', label: ''},
  {value: KRONOS_INTERVAL_TYPE_ENUM_INDEX.FIFTEEN_MINUTES, label: FIFTEEN_MINUTES},
  {value: KRONOS_INTERVAL_TYPE_ENUM_INDEX.DAY, label: DAY},
  {value: KRONOS_INTERVAL_TYPE_ENUM_INDEX.WEEK, label: WEEK},
];
