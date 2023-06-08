import {http} from '../../shared/services';

export const LOAD_MOST_ELEMENT = 'LOAD_MOST_ELEMENT';
export const LOAD_MOST_ELEMENT_REJECTED = `${LOAD_MOST_ELEMENT}_REJECTED`;
export const LOAD_MOST_ELEMENT_PENDING = `${LOAD_MOST_ELEMENT}_PENDING`;
export const LOAD_MOST_ELEMENT_FULFILLED = `${LOAD_MOST_ELEMENT}_FULFILLED`;

export function loadMOSTElement(id) {
  return {
    type: LOAD_MOST_ELEMENT,
    payload: http.get(`elements/most/${id}`),
  };
}
