import {http} from '../../shared/services';

export const CREATE_MOST_ELEMENT = 'CREATE_MOST_ELEMENT';
export const CREATE_MOST_ELEMENT_PENDING = `${CREATE_MOST_ELEMENT}_PENDING`;
export const CREATE_MOST_ELEMENT_FULFILLED = `${CREATE_MOST_ELEMENT}_FULFILLED`;
export const CREATE_MOST_ELEMENT_REJECTED = `${CREATE_MOST_ELEMENT}_REJECTED`;

export function createMOSTElement(model) {
  return {
    type: CREATE_MOST_ELEMENT,
    payload: http.post('elements/most/create', model),
  };
}
