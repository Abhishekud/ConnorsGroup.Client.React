import {http} from '../../shared/services';

export const LOAD_STANDARD = 'LOAD_STANDARD';
export const LOAD_STANDARD_PENDING = `${LOAD_STANDARD}_PENDING`;
export const LOAD_STANDARD_FULFILLED = `${LOAD_STANDARD}_FULFILLED`;
export const LOAD_STANDARD_REJECTED = `${LOAD_STANDARD}_REJECTED`;

export function loadStandard(id) {
  return {
    type: LOAD_STANDARD,
    payload: http.get(`standards/${id}`),
  };
}
