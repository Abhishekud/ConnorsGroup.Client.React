import {http} from '../../shared/services';

export const LOAD_MOST_ELEMENT_DETAILS = 'LOAD_MOST_ELEMENT_DETAILS';
export const LOAD_MOST_ELEMENT_DETAILS_PENDING = `${LOAD_MOST_ELEMENT_DETAILS}_PENDING`;
export const LOAD_MOST_ELEMENT_DETAILS_FULFILLED = `${LOAD_MOST_ELEMENT_DETAILS}_FULFILLED`;
export const LOAD_MOST_ELEMENT_DETAILS_REJECTED = `${LOAD_MOST_ELEMENT_DETAILS}_REJECTED`;

export function loadMOSTElementDetails(id) {
  return {
    type: LOAD_MOST_ELEMENT_DETAILS,
    payload: http.get(`elements/most/details/${id}`),
  };
}
