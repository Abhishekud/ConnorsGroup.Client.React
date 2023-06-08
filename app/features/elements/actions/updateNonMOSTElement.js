import {http} from '../../shared/services';

export const UPDATE_NON_MOST_ELEMENT = 'UPDATE_NON_MOST_ELEMENT';
export const UPDATE_NON_MOST_ELEMENT_PENDING = `${UPDATE_NON_MOST_ELEMENT}_PENDING`;
export const UPDATE_NON_MOST_ELEMENT_FULFILLED = `${UPDATE_NON_MOST_ELEMENT}_FULFILLED`;
export const UPDATE_NON_MOST_ELEMENT_REJECTED = `${UPDATE_NON_MOST_ELEMENT}_REJECTED`;

export function updateNonMOSTElement(model) {
  return {
    type: UPDATE_NON_MOST_ELEMENT,
    payload: http.put(`elements/non-most/${model.get('id')}`, model),
  };
}
