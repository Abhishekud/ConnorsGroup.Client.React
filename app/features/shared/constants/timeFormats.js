export const TMUs = 'TMUs';
export const SECONDS = 'Seconds';
export const MINUTES = 'Minutes';
export const HOURS = 'Hours';

export const TIME_FORMATS = [
  TMUs,
  SECONDS,
  MINUTES,
  HOURS,
];

export function displayName(timeFormat) {
  switch (timeFormat) {
    case TMUs:
      return 'TMUs';
    case SECONDS:
      return 'Sec';
    case MINUTES:
      return 'Min';
    case HOURS:
      return 'Hrs';
    default:
      throw new Error(`Unknown time format ${timeFormat}`);
  }
}
