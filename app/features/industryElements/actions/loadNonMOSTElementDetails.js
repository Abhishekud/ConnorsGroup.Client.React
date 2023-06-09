import {http} from '../../shared/services';

export const INDUSTRY_ELEMENTS_LOAD_NON_MOST_ELEMENT_DETAILS = 'INDUSTRY_ELEMENTS/LOAD_NON_MOST_ELEMENT_DETAILS';
export const INDUSTRY_ELEMENTS_LOAD_NON_MOST_ELEMENT_DETAILS_REJECTED = `${INDUSTRY_ELEMENTS_LOAD_NON_MOST_ELEMENT_DETAILS}_REJECTED`;
export const INDUSTRY_ELEMENTS_LOAD_NON_MOST_ELEMENT_DETAILS_PENDING = `${INDUSTRY_ELEMENTS_LOAD_NON_MOST_ELEMENT_DETAILS}_PENDING`;
export const INDUSTRY_ELEMENTS_LOAD_NON_MOST_ELEMENT_DETAILS_FULFILLED = `${INDUSTRY_ELEMENTS_LOAD_NON_MOST_ELEMENT_DETAILS}_FULFILLED`;

export function loadNonMOSTElementDetails(sourceId, id) {
  return {
    type: INDUSTRY_ELEMENTS_LOAD_NON_MOST_ELEMENT_DETAILS,
    payload: http.get(`industry-elements/${sourceId}/non-most/details/${id}`),
  };
}
