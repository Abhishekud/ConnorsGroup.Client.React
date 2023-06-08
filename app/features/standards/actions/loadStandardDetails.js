import {http} from '../../shared/services';

export const LOAD_STANDARD_DETAILS = 'LOAD_STANDARD_DETAILS';
export const LOAD_STANDARD_DETAILS_PENDING = `${LOAD_STANDARD_DETAILS}_PENDING`;
export const LOAD_STANDARD_DETAILS_FULFILLED = `${LOAD_STANDARD_DETAILS}_FULFILLED`;
export const LOAD_STANDARD_DETAILS_REJECTED = `${LOAD_STANDARD_DETAILS}_REJECTED`;

export function loadStandardDetails(id) {
  return {
    type: LOAD_STANDARD_DETAILS,
    payload: http.get(`standards/details/${id}`),
  };
}
