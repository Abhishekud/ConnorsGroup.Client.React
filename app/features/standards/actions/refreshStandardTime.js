import {http} from '../../shared/services';

export const REFRESH_STANDARD_TIME = 'REFRESH_STANDARD_TIME';
export const REFRESH_STANDARD_TIME_FULFILLED = 'REFRESH_STANDARD_TIME_FULFILLED';

export function refreshStandardTime(standardId) {
  return {
    type: REFRESH_STANDARD_TIME,
    payload: http.get(`standards/${standardId}/time`),
  };
}
