import {http} from '../../shared/services';

export const LOAD_STANDARD_MOST_ELEMENT = 'LOAD_STANDARD_MOST_ELEMENT';
export const LOAD_STANDARD_MOST_ELEMENT_REJECTED = `${LOAD_STANDARD_MOST_ELEMENT}_REJECTED`;
export const LOAD_STANDARD_MOST_ELEMENT_PENDING = `${LOAD_STANDARD_MOST_ELEMENT}_PENDING`;
export const LOAD_STANDARD_MOST_ELEMENT_FULFILLED = `${LOAD_STANDARD_MOST_ELEMENT}_FULFILLED`;

export function loadStandardMOSTElement(standardId, standardElementId) {
  return {
    type: LOAD_STANDARD_MOST_ELEMENT,
    payload: http.get(`standards/${standardId}/elements/most/${standardElementId}`),
  };
}
