import {http} from '../../shared/services';

export const LOAD_NON_MOST_ELEMENT_DETAILS = 'LOAD_NON_MOST_ELEMENT_DETAILS';
export const LOAD_NON_MOST_ELEMENT_DETAILS_FULFILLED = `${LOAD_NON_MOST_ELEMENT_DETAILS}_FULFILLED`;

export function loadNonMOSTElementDetails(id) {
  return {
    type: LOAD_NON_MOST_ELEMENT_DETAILS,
    payload: http.get(`elements/non-most/details/${id}`),
  };
}
