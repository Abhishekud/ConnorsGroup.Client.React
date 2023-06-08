import {http} from '../../shared/services';

export const CREATE_NON_MOST_ELEMENT = 'CREATE_NON_MOST_ELEMENT';
export const CREATE_NON_MOST_ELEMENT_PENDING = `${CREATE_NON_MOST_ELEMENT}_PENDING`;
export const CREATE_NON_MOST_ELEMENT_FULFILLED = `${CREATE_NON_MOST_ELEMENT}_FULFILLED`;
export const CREATE_NON_MOST_ELEMENT_REJECTED = `${CREATE_NON_MOST_ELEMENT}_REJECTED`;

export function createNonMOSTElement(model) {
  return {
    type: CREATE_NON_MOST_ELEMENT,
    payload: http.post('elements/non-most/create', model),
  };
}
