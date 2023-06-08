export const CHANGE_TIME_FORMAT = 'CHANGE_TIME_FORMAT';

export function changeTimeFormat(timeFormat) {
  return {
    type: CHANGE_TIME_FORMAT,
    payload: timeFormat,
  };
}
