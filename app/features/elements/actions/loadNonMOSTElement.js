import {http} from '../../shared/services';

export const LOAD_NON_MOST_ELEMENT = 'LOAD_NON_MOST_ELEMENT';
export const LOAD_NON_MOST_ELEMENT_REJECTED = `${LOAD_NON_MOST_ELEMENT}_REJECTED`;
export const LOAD_NON_MOST_ELEMENT_PENDING = `${LOAD_NON_MOST_ELEMENT}_PENDING`;
export const LOAD_NON_MOST_ELEMENT_FULFILLED = `${LOAD_NON_MOST_ELEMENT}_FULFILLED`;

export function loadNonMOSTElement(id) {
  return {
    type: LOAD_NON_MOST_ELEMENT,
    payload: http.get(`elements/non-most/${id}`),
  };
}
