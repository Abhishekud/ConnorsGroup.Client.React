export const EVERYDAY = 'Every Day';
export const MONDAY = 'Monday';
export const TUESDAY = 'Tuesday';
export const WEDNESDAY = 'Wednesday';
export const THURSDAY = 'Thursday';
export const FRIDAY = 'Friday';
export const SATURDAY = 'Saturday';
export const SUNDAY = 'Sunday';

export const ALL = [
  EVERYDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY,
];

export const KRONOS_DAY_ENUM_INDEX = {
  EVERYDAY: 0,
  SUNDAY: 1,
  MONDAY: 2,
  TUESDAY: 3,
  WEDNESDAY: 4,
  THURSDAY: 5,
  FRIDAY: 6,
  SATURDAY: 7,
};

export const KRONOS_DAY_SELECT_OPTIONS = [
  {value: '', label: ''},
  {value: KRONOS_DAY_ENUM_INDEX.EVERYDAY, label: EVERYDAY},
  {value: KRONOS_DAY_ENUM_INDEX.SUNDAY, label: SUNDAY},
  {value: KRONOS_DAY_ENUM_INDEX.MONDAY, label: MONDAY},
  {value: KRONOS_DAY_ENUM_INDEX.TUESDAY, label: TUESDAY},
  {value: KRONOS_DAY_ENUM_INDEX.WEDNESDAY, label: WEDNESDAY},
  {value: KRONOS_DAY_ENUM_INDEX.THURSDAY, label: THURSDAY},
  {value: KRONOS_DAY_ENUM_INDEX.FRIDAY, label: FRIDAY},
  {value: KRONOS_DAY_ENUM_INDEX.SATURDAY, label: SATURDAY},
];
